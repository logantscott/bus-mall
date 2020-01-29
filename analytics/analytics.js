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

renderAnalyticsTable();

function renderAnalyticsTable(sortResults = Object.keys(surveyResults)) {
    //RENDER__________________________________
    const container = document.getElementById('analyticsContainer');

    const table = document.createElement('table');
    table.id = 'analyticsTable';

    const tableHeader = document.createElement('thead');
    const tableHeaderRow = document.createElement('tr');
    const headers = ['Products', 'Impressions', 'Clicks', 'Percentage'];

    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        th.addEventListener('click', () => {
            sortAnalytics(header.toLowerCase());
        });
        tableHeaderRow.appendChild(th);
    });

    tableHeader.appendChild(tableHeaderRow);
    table.appendChild(tableHeader);

    const tableBody = document.createElement('tbody');

    sortResults.forEach(key => {
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

    const tableFooter = document.createElement('tfoot');
    const tableFooterRow = document.createElement('tr');
    const footers = ['Total', sumImpressions(), sumClicks(), getPercentage()];

    footers.forEach(footer => {
        const td = document.createElement('td');
        td.textContent = footer;
        tableFooterRow.appendChild(td);
    });

    tableFooter.appendChild(tableFooterRow);
    table.appendChild(tableFooter);

    container.appendChild(table);
}

let headerSorts = {};

function sortAnalytics(header) {
    let sortResults;

    if (!headerSorts[header]) headerSorts[header] = {};
    headerSorts[header].sort = headerSorts[header].sort ? headerSorts[header].sort * -1 : 1;

    document.getElementById('analyticsTable').remove();
    if (header === 'impressions' || header === 'clicks') {
        sortResults = headerSorts[header].sort < 0
            ? Object.keys(surveyResults).sort(function(a, b){return surveyResults[a][header] - surveyResults[b][header];})
            : Object.keys(surveyResults).sort(function(a, b){return surveyResults[b][header] - surveyResults[a][header];});
    } else if (header === 'percentage') {
        sortResults = headerSorts[header].sort < 0
            ? Object.keys(surveyResults).sort(function(a, b){return (surveyResults[a]['clicks'] / surveyResults[a]['impressions']) - (surveyResults[b]['clicks'] / surveyResults[b]['impressions']);})
            : Object.keys(surveyResults).sort(function(a, b){return (surveyResults[b]['clicks'] / surveyResults[b]['impressions']) - (surveyResults[a]['clicks'] / surveyResults[a]['impressions']);}); 
    } else {
        sortResults = headerSorts[header].sort > 0
            ? Object.keys(surveyResults).sort()
            : Object.keys(surveyResults).sort().reverse();
    }

    renderAnalyticsTable(sortResults);
    // }
}

function sumImpressions() {
    let total = 0;
    Object.keys(surveyResults).forEach(key => {
        total = total + surveyResults[key].impressions;
    });
    return total;
}

function sumClicks() {
    let total = 0;
    Object.keys(surveyResults).forEach(key => {
        total = total + surveyResults[key].clicks;
    });
    return total;
}

function getPercentage() {
    let percentage;
    percentage = (sumClicks() * 100 / sumImpressions()).toFixed(0) + '%';
    return percentage;
}