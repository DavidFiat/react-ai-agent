function parseTaskDetails(text) {
  const match = text.match(/field\s*[:=]\s*(\w+).*value\s*[:=]\s*([^\s,]+)/i);
  if (!match) return null;
  return { field: match[1], value: match[2] };
}
module.exports = { parseTaskDetails };