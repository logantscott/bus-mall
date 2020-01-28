import products from '../data/products.js';

export default function renderSurvey(counter) {

    let lastSession = [];

    //temp checker _________________________________________________________
    counter = 1;
    //temp checker ____________________________________
    if (counter > 0) { 
        lastSession = sessionStorage.getItem('lastSession');
        lastSession = lastSession ? JSON.parse(lastSession) : lastSession = [];
    } else {
        lastSession = [];
    }

    // make empty array called lastProducts, loop through lastSession array (array of 3 ids) and get their index in the product seed, store to lastProducts
    let lastProducts = [];
    lastSession.forEach((displayedProduct) => {
        products.forEach((product, i) => { 
            if (product.id === displayedProduct) { lastProducts.push(i); }
        });
    });

    // generate a random int per length of products array, if number exists in lastProducts[] or already in new uniqueRandomArray[], keep looping until the new uniqueRandomArray[] has 3 numbers (stored as index of products)
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

    // console.log('arraytest');
    // console.log(uniqueRandomArray);

    let productsToDisplay = [];
    // productsToDisplay.push('test');
    // console.log(productsToDisplay);

    uniqueRandomArray.forEach(productIndex => {
        const container = document.getElementById('surveyContainer');

        const label = document.createElement('label');
        const input = document.createElement('input');
        const image = document.createElement('img');
        const span = document.createElement('span');

        input.type = 'radio';
        input.name = 'surveyOptions';
        image.src = products[productIndex].image;
        span.textContent = products[productIndex].name;

        label.appendChild(input);
        label.appendChild(image);
        label.appendChild(span);
        container.appendChild(label);

        productsToDisplay.push(products[productIndex].id);
    });

    sessionStorage.setItem('lastSession', JSON.stringify(productsToDisplay));

}