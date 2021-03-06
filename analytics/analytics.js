import { viewAnalytics } from '../common/utils.js';

const surveyResults = viewAnalytics();
const currentDataset = localStorage.getItem('currentDataset') ? JSON.parse(localStorage.getItem('currentDataset')) : 'allSessions';
const currentView = localStorage.getItem('currentView') ? JSON.parse(localStorage.getItem('currentView')) : 'chart1';

document.getElementById(currentDataset).classList.add('selected');

renderAnalyticsTable();

function renderAnalyticsTable(sortResults = Object.keys(surveyResults)) {
    //RENDER__________________________________
    const container = document.getElementById('analyticsContainer');

    const table = document.createElement('table');
    table.id = 'analyticsTable';

    const tableHeader = document.createElement('thead');
    const tableHeaderRow = document.createElement('tr');
    const headers = ['Products', 'Impressions', 'Clicks', 'Click Rate'];

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

    // console.log(surveyResults);

    document.getElementById('analyticsTable').remove();
    if (header === 'impressions' || header === 'clicks') {
        sortResults = headerSorts[header].sort < 0
            ? Object.keys(surveyResults).sort(function(a, b){return surveyResults[a][header] - surveyResults[b][header];})
            : Object.keys(surveyResults).sort(function(a, b){return surveyResults[a][header] - surveyResults[b][header];}).reverse();
    } else if (header === 'click rate') {
        sortResults = headerSorts[header].sort < 0
            ? Object.keys(surveyResults).sort(function(a, b){return (surveyResults[a]['clicks'] / surveyResults[a]['impressions']) - (surveyResults[b]['clicks'] / surveyResults[b]['impressions']);})
            : Object.keys(surveyResults).sort(function(a, b){return (surveyResults[a]['clicks'] / surveyResults[a]['impressions']) - (surveyResults[b]['clicks'] / surveyResults[b]['impressions']);}).reverse(); 
    } else {
        sortResults = headerSorts[header].sort > 0
            ? Object.keys(surveyResults).sort()
            : Object.keys(surveyResults).sort().reverse();
    }

    renderAnalyticsTable(sortResults);
    prepareChartData(sortResults);
    myChart1.data.datasets[0].data = dataClicks;
    myChart1.data.datasets[1].data = dataImpressions;
    myChart1.data.labels = labels;
    myChart2.data.datasets[0].data = dataPercentage;
    myChart2.data.labels = labels;
    myChart1.update();
    myChart2.update();
    // }
}

function sumImpressions() {
    let total = 0;
    Object.keys(surveyResults).forEach(key => {
        total = surveyResults[key].impressions ? total + surveyResults[key].impressions : total;
    });
    return total;
}

function sumClicks() {
    let total = 0;
    Object.keys(surveyResults).forEach(key => {
        total = surveyResults[key].clicks ? total + surveyResults[key].clicks : total;
    });
    return total;
}

function getPercentage() {
    let percentage;
    percentage = (sumClicks() * 100 / sumImpressions()).toFixed(0) + '%';
    return percentage;
}


//CHART
const ctx1 = document.getElementById('chart1').getContext('2d');
const ctx2 = document.getElementById('chart2').getContext('2d');

let dataImpressions;
let dataClicks;
let dataPercentage;
let labels;

function prepareChartData(sortResults = Object.keys(surveyResults)) {
    dataImpressions = [];
    dataClicks = [];
    dataPercentage = [];
    labels = [];

    sortResults.forEach(key => {
        let impression = surveyResults[key].impressions ? surveyResults[key].impressions : 0;
        let click = surveyResults[key].clicks ? surveyResults[key].clicks : 0;
        let percentage = (click * 100 / impression).toFixed(0);
        dataImpressions.push(impression);
        dataClicks.push(click);
        dataPercentage.push(percentage);

        labels.push(key);
        
    });
    // console.log(labels);
}

prepareChartData();

const setColors = function(red, green, blue, sort) {
    let colorArray = [];
    for (let i = 0; i < Object.keys(surveyResults).length; i++) {
        let divInt = Math.floor((755 - 455) / Object.keys(surveyResults).length);

        const arrColor = ((i * divInt) + divInt);

        const b = blue > 0 ? 255 : Math.floor(arrColor / 2);
        const r = red > 0 ? 255 : Math.floor(arrColor / 2);
        const g = green > 0 ? 255 : Math.floor(arrColor / 2);

        sort > 0 ? colorArray.push('rgb(' + r + ',' + g + ',' + b + ')') : colorArray.unshift('rgb(' + r + ',' + g + ',' + b + ')');
        // colorArray.push(dynamicColors());
    }
    
    return colorArray;
};

// function dynamicColors() {
//     var r = Math.floor(Math.random() * 255);
//     var g = Math.floor(Math.random() * 255);
//     var b = Math.floor(Math.random() * 255);
//     return 'rgb(' + r + ',' + g + ',' + b + ')';
// }

// const colorArray2 = [...colorArray].sort().reverse();

// eslint-disable-next-line no-unused-vars
const myChart1 = new Chart(ctx1, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: '# of Clicks',
            data: dataClicks,
            backgroundColor: setColors(0, 1, 0, 1)
        }, {
            label: '# of Impressions',
            data: dataImpressions,
            backgroundColor: setColors(0, 0, 1)
        }]
    },
    options: {
        scales: {
            xAxes: [{
                stacked: true,
                ticks: {
                    beginAtZero:true
                }
            }],
            yAxes: [{
                stacked: false,
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});

// eslint-disable-next-line no-unused-vars
const myChart2 = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: 'Click-Through Rate %',
            data: dataPercentage,
            backgroundColor: setColors(1, 0, 0)
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true,
                    max: 100
                }
            }]
        }
    }
});

document.getElementById('analyticsTable').classList.add('hide');
document.getElementById('chart1').classList.add('hide');
document.getElementById('chart2').classList.add('hide');
document.getElementById(currentView).classList.remove('hide');

const analyticsButtons = document.querySelectorAll('span.button');

for (let i = 0; i < analyticsButtons.length; i++) {
    analyticsButtons[i].addEventListener('click', () => {
        document.getElementById('analyticsTable').classList.add('hide');
        document.getElementById('chart1').classList.add('hide');
        document.getElementById('chart2').classList.add('hide');
        document.getElementById('analyticsTableButton').classList.remove('selected');
        document.getElementById('chart1Button').classList.remove('selected');
        document.getElementById('chart2Button').classList.remove('selected');
        document.getElementById(analyticsButtons[i].id.replace('Button', '')).classList.remove('hide');
        document.getElementById(analyticsButtons[i].id).classList.add('selected');

        localStorage.setItem('currentView', JSON.stringify(analyticsButtons[i].id.replace('Button', '')));
    });
}

const dataButtons = document.querySelectorAll('span.databutton');

for (let i = 0; i < dataButtons.length; i++) {
    dataButtons[i].addEventListener('click', () => {
        document.getElementById('userSession').classList.remove('selected');
        document.getElementById('allSessions').classList.remove('selected');
        document.getElementById(dataButtons[i].id).classList.add('selected');
        localStorage.setItem('currentDataset', JSON.stringify(dataButtons[i].id));
        window.location.href = './';
    });
}