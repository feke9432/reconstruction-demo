let invoices = require('./invoices.json')
let plays = require('./plays.json')
let createStatementData = require('./createStatementData')

function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays))
}

function renderPlainText(data) {
  let result = `Statement for ${data.customer}\n`
  for (let perf of data.performances) {
    result += ` ${perf.play.name}: ${USD(perf.amount)} (${perf.audience} seats)\n`
    
  }
  result += `Amount owed is ${USD(data.totalAmount)}\n`
  result += `You earned ${data.totalVolumeCredits} credits\n`

  return result
}

function htmlStatement(invoice, plays) {
  return renderHtml(createStatementData(invoice, plays))
}

function renderHtml(data) {
  let result = `<h1>Statement for ${data.customer}</h1>\n`;
  result += "<table>\n";
  result += "<tr><th>play</th><th>seats</th><th>cost</th></tr>";

  for (let perf of data.performances) {
    result += ` <tr><td>${perf.play.name}</td><td>${perf.audience}</td>`;
    result += `<td>${USD(perf.amount)}</td></tr>\n`;
  }
    
  result += "</table>\n";
  result += `<p>Amount owed is <em>${USD(data.totalAmount)}</em></p>\n`;
  result += `<p>You earned <em>${data.totalVolumeCredits}</em> credits</p>\n`;
  return result;
}

function USD (aNumber) {
  return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: 2}).format(aNumber / 100)
}

let result = htmlStatement(invoices[0], plays)

console.log(result)
