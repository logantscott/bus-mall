import products from '../data/products.js';

export function getLastSessionIds() {
    return (sessionStorage.getItem('lastSessionIds')) ? JSON.parse(sessionStorage.getItem('lastSessionIds')) : [] ;
}

export function getCounter() {
    return Number(sessionStorage.getItem('sessionCounter')) >= 0 ? Number(sessionStorage.getItem('sessionCounter')) : 0;
}

export function clearSurvey() {
    const container = document.getElementById('surveyContainer');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

export function generateUniqueArray(lastSessionIndexes) {
    // generate a random int per length of products array, if number exists in lastSessionIndexes or already in new uniqueRandomArray, keep looping until the new uniqueRandomArray has 3 numbers (stored as index of products)
    let uniqueRandom;
    let uniqueRandomArray = [];
    do {
        uniqueRandom = Math.floor(Math.random() * products.length);
        if (!uniqueRandomArray.includes(uniqueRandom) && !lastSessionIndexes.includes(uniqueRandom)) {
            uniqueRandomArray.push(uniqueRandom);
        }
    } while (uniqueRandomArray.length < 3);
    return uniqueRandomArray;
}

export function getLastSession() {
    // make empty array called lastProducts, loop through lastSessionIds array (array of 3 ids) and get their index in the product seed, store to lastSessionIndexes
    let lastSessionIds = getLastSessionIds();
    
    // convert last session product ids to indexes of product array for easier comparison
    let lastSessionIndexes = [];
    lastSessionIds.forEach((displayedProduct) => {
        products.forEach((product, i) => { 
            if (product.id === displayedProduct) { lastSessionIndexes.push(i); }
        });
    });
    return lastSessionIndexes;
}