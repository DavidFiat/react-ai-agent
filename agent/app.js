require('dotenv').config();
const express = require('express');
console.log('GH_USER:', process.env.GH_USER);
console.log('GH_REPO:', process.env.GH_REPO);
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const { Octokit } = require('@octokit/rest');
const { postLinearComment, transitionLinearIssue } = require('./helpers/linear');

const app = express();
app.use(bodyParser.json());

// Required user fields (all lowercase)
const USER_FIELDS = ['name','email','age','occupation','location','joindate','status','department','manager'];

// Simple parser that splits on comma and colon
async function parseDetails(desc) {
  const clean = desc.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
  const data = {};
  clean.split(',').map(p => p.trim()).filter(Boolean).forEach(pair => {
    const [k, ...rest] = pair.split(':');
    if (!rest.length) return;
    const key = k.trim().replace(/\s+/g, '').toLowerCase();
    let val = rest.join(':').trim();
    val = val.replace(/\s{2,}/g, ' ');
    if (/^\d+$/.test(val)) val = parseInt(val,10);
    data[key] = val;
  });
  return Object.keys(data).length ? data : null;
}

const recentIssues = new Set();

app.post('/webhook', async (req, res) => {

  const { action, type, data: issue } = req.body;
  if (type !== 'Issue' || !issue) return res.status(200).end();
  const id = issue.id;
  if (recentIssues.has(id)) {
    console.log(`Skipping duplicate issue id ${id}`);
    return res.status(200).end();
  }

  recentIssues.add(id);
  setTimeout(() => recentIssues.delete(id), 10000);
  const num = issue.identifier;
  const title = (issue.title||'').toLowerCase();
  const desc  = issue.description || '';

  const isAdd    = title.startsWith('add user');
  const isUpdate = title.startsWith('update user');

  if (!isAdd && !isUpdate) {
    await postLinearComment(id, 'I only handle Add User or Update User tasks.');
    return res.status(200).end();
  }

  const details = await parseDetails(desc);
  if (!details) {
    await postLinearComment(id, 'Could not parse user details. Use format key: value, ...');
    return res.status(200).end();
  }

  const required = isAdd ? USER_FIELDS : ['id', ...USER_FIELDS];
  const missing  = required.filter(f => details[f] == null);
  if (missing.length) {
    await postLinearComment(id, `Missing fields: ${missing.join(', ')}. Please update.`);
    return res.status(200).end();
  }

  const filePath = 'src/data/users.json';
  const absoluteFilePath = path.join(__dirname, filePath);

  console.log('Current working directory:', process.cwd());
  console.log('Looking for users.json at:', absoluteFilePath);

  let records;
  try {
    records = JSON.parse(fs.readFileSync(absoluteFilePath, 'utf8'));
  } catch (err) {
    await postLinearComment(id, `Error reading data: ${err.message}`);
    return res.status(500).end();
  }

  let user;
  if (isUpdate) {
    user = records.find(u => u.id === details.id);
    if (!user) {
      await postLinearComment(id, `No user found with id ${details.id}.`);
      return res.status(200).end();
    }
    Object.assign(user, details);
  } else {
    const nextId = records.reduce((max,u) => Math.max(max, u.id), 0) + 1;
    user = { id: nextId, ...details };
    records.push(user);
  }

  try { fs.writeFileSync(filePath, JSON.stringify(records, null, 2)); }
  catch(err) {
    await postLinearComment(id, `Error writing data: ${err.message}`);
    return res.status(500).end();
  }

  const owner = process.env.GH_USER;
  const repo  = process.env.GH_REPO;
  const base  = 'main';
  const branch= `user/${isAdd?'add':'upd'}-${num}`;
  const octokit = new Octokit({ auth: process.env.GH_TOKEN });

  try {
    const { data: baseRef } = await octokit.git.getRef({ owner, repo, ref: `heads/${base}` });

    try { await octokit.git.createRef({ owner, repo, ref: `refs/heads/${branch}`, sha: baseRef.object.sha }); }
    catch (err) { if (err.status !== 422) throw err; }

    let sha;
    try {
      const { data: fileData } = await octokit.repos.getContent({ owner, repo, path: filePath, ref: branch });
      sha = fileData.sha;
    } catch (_) {}

    await octokit.repos.createOrUpdateFileContents({
      owner, repo, path: filePath,
      message: `${isAdd?'Add':'Update'} user ${user.id}`,
      content: Buffer.from(JSON.stringify(records, null, 2)).toString('base64'),
      branch, sha
    });

    let pr;
    try {
      const createResp = await octokit.pulls.create({ owner, repo, title: `${isAdd?'Add':'Update'} User ${user.id}`, head: branch, base, body: `From Linear issue ${num}` });
      pr = createResp.data;
    } catch(err) {
      if (err.status === 422 && /already exists/.test(err.message)) {
        const { data: prs } = await octokit.pulls.list({ owner, repo, head: `${owner}:${branch}` });
        pr = prs[0];
      } else throw err;
    }

    await postLinearComment(id, `PR: ${pr.html_url}`);
    await transitionLinearIssue(id, 'Done');
    return res.status(200).end();
  } catch(err) {
    console.error('GitHub error', err);
    await postLinearComment(id, `PR failed: ${err.message}`);
    return res.status(500).end();
  }
});

if (require.main === module) {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}





app.get('/health', (req, res) => {
  res.status(200).json({ status: 'up' });
});


module.exports = app;
