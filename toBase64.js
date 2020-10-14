const fs = require('fs');
const input = fs.readFileSync(process.stdin.fd, 'utf-8');

console.log(
  Buffer.from(JSON.stringify(JSON.parse(input), '')).toString('base64'),
);
