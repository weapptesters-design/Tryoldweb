const fs = require('fs');

const csv = fs.readFileSync('orders.csv', 'utf8');

const rows = csv
  .replace(/\r/g, '')
  .split('\n')
  .filter(row => row.trim() !== '');

let output = 'const ORDERS = {\n';

for (let i = 1; i < rows.length; i++) {

  const cols = rows[i].split(',');

  const id = (cols[0] || '').trim();
  const app = (cols[1] || '').trim();
  const start = (cols[2] || '').trim();
  const total = (cols[3] || '14').trim();
  const status = (cols[4] || 'active').trim();

  if (!id) continue;

  output += `
'${id}': {
  appName: '${app}',
  startDate: '${start}',
  totalDays: ${parseInt(total) || 14},
  status: '${status}'
},
`;
}

output += '\n};';

fs.writeFileSync('orders.js', output);

console.log('orders.js generated successfully');
