import products from '../data/products.js';

export default function renderSurvey(counter) {
    
    const container = document.getElementById('surveyContainer');
    let lastSession = [];

    if (counter > 0) { 
        lastSession = sessionStorage.getItem('lastSession');
        lastSession = lastSession ? JSON.parse(lastSession) : lastSession = [];
    } else {
        lastSession = [];
    }

    // make empty array called lastProducts, loop through lastSession array (array of 3 ids) and get their index in the product seed, store to lastProducts
    let lastProducts = [];
    lastSession.forEach(displayedProduct => {
        lastProducts.push(products.indexOf(product => product.id === displayedProduct[i]));
    })

    let productsToDisplay = [];

    let uniqueRandom;
    let uniqueRandomArray = [];
    let j = 0;
    do {
        uniqueRandom = Math.floor(Math.random() * products.length);
        if (!uniqueRandomArray.includes(uniqueRandom) && !lastProducts.includes(uniqueRandom)) {
            uniqueRandomArray.push(uniqueRandom);
        }
        j++;
    } while (uniqueRandomArray.length < 3 && j < 1000);

    console.log('arraytest');
    console.log(uniqueRandomArray);

}