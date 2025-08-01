const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const API_URL = 'https://api.linear.app/graphql';

async function graphql(query) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': process.env.LINEAR_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  });
  const json = await res.json();
  console.log('Linear API raw response:', json);
  return json;
}

async function postLinearComment(issueId, body) {
  const sanitized = body.replace(/"/g, '\\"');
  const query = `
    mutation {
      commentCreate(input: {
        issueId: "${issueId}",
        body: "${sanitized}"
      }) {
        success
      }
    }`;
  const result = await graphql(query);
  if (result.errors) {
    console.error('Error creating Linear comment:', result.errors);
  }
}

async function transitionLinearIssue(issueId, stateId) {
  const query = `
    mutation {
      issueUpdate(input: {
        id: "${issueId}",
        stateId: "${stateId}"
      }) {
        success
      }
    }`;
  const result = await graphql(query);
  if (result.errors) {
    console.error('Error transitioning Linear issue:', result.errors);
  }
}

module.exports = { postLinearComment, transitionLinearIssue };