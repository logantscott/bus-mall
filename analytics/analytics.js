const allSessions = JSON.parse(localStorage.getItem('allSessions'));

// example object:
// wine-glass: {
    // impressions: 16,
    // clicks: 3
// },

let surveyResults = {};

allSessions.forEach(session => {
    session.productIds.forEach(productId => {
        if (!surveyResults[productId]) surveyResults[productId] = {};
        surveyResults[productId].impressions = surveyResults[productId].impressions ? surveyResults[productId].impressions + 1 : 1;
    });
    if (!surveyResults[session.selectedId]) surveyResults[session.selectedId] = {};
    surveyResults[session.selectedId].clicks = surveyResults[session.selectedId].clicks ? surveyResults[session.selectedId].clicks + 1 : 1;
});

// console.log(surveyResults);

//RENDER__________________________________
const container = document.getElementById('analyticsContainer');

const table = document.createElement('table');
const tableHeader = document.createElement('thead')
const tableHeaderRow = document.createElement('tr');
const productTH = document.createElement('th');
const impressionsTH = document.createElement('th');
const clicksTH = document.createElement('th');
const percentageTH = document.createElement('th');

productTH.textContent = 'Products';
impressionsTH.textContent = 'Impressions';
clicksTH.textContent = 'Clicks';
percentageTH.textContent = 'Percentage';

tableHeaderRow.append(productTH, impressionsTH, clicksTH, percentageTH);
tableHeader.appendChild(tableHeaderRow);
table.appendChild(tableHeader);

const tableBody = document.createElement('tbody');

Object.keys(surveyResults).forEach(key => {
    const tr = document.createElement('tr');
    const product = document.createElement('td');
    const impressions = document.createElement('td');
    const clicks = document.createElement('td');
    const percentage = document.createElement('td');

    // console.log(key);

    product.textContent = key;
    impressions.textContent = surveyResults[key].impressions ? surveyResults[key].impressions : 0;
    clicks.textContent = surveyResults[key].clicks ? surveyResults[key].clicks : 0;
    percentage.textContent = (clicks.textContent * 100 / impressions.textContent).toFixed(0) + '%';

    tr.append(product, impressions, clicks, percentage);
    tableBody.appendChild(tr);
});

table.appendChild(tableBody);
container.appendChild(table);