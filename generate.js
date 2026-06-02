const fs = require('fs');

const csv = fs.readFileSync('orders.csv', 'utf8');
const rows = csv.trim().split('\n');

let output = 'const ORDERS = {\n';

for (let i = 1; i < rows.length; i++) {
  const [id, app, start, total, status] = rows[i].split(',');

  output += `'${id}': {
    appName: '${app}',
    startDate: '${start}',
    totalDays: ${total},
    status: '${status}'
  },\n`;
}

output += '};';

fs.writeFileSync('orders.js', output);

console.log('orders.js generated');
