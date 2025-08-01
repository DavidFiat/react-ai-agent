const { Octokit } = require('@octokit/rest');
const octokit = new Octokit({ auth: process.env.GH_TOKEN });

async function createPullRequest({ branchName, commitMessage, filePath, fileContent, prTitle, prBody }) {
  const { data: mainBranch } = await octokit.repos.getBranch({
    owner: process.env.GH_USER, repo: 'react-ai-agent', branch: 'main'
  });
  await octokit.git.createRef({
    owner: process.env.GH_USER, repo: process.env.GH_REPO,
    ref: `refs/heads/${branchName}`, sha: mainBranch.commit.sha
  });

  await octokit.repos.createOrUpdateFileContents({
    owner: process.env.GH_USER, repo: process.env.GH_REPO,
    path: filePath, message: commitMessage,
    content: Buffer.from(fileContent).toString('base64'),
    branch: branchName
  });

  const { data: pr } = await octokit.pulls.create({
    owner: 'FuseFinance', repo: 'react-ai-agent',
    title: prTitle, head: `TU_USUARIO:${branchName}`, base: 'main', body: prBody
  });
  return pr.html_url;
}

module.exports = { createPullRequest };
