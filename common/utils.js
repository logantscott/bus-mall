import products from '../data/products.js';

export function newSession() {
    const newSessionId = Date.now();
    sessionStorage.setItem('sessionId', newSessionId);
    sessionStorage.setItem('sessionCounter', 0);
    localStorage.removeItem('userSession');
    return newSessionId;
}

export function getLastSessionIds() {
    return (sessionStorage.getItem('lastSessionIds')) ? JSON.parse(sessionStorage.getItem('lastSessionIds')) : [] ;
}

export function getCounter() {
    return Number(sessionStorage.getItem('sessionCounter')) >= 0 ? Number(sessionStorage.getItem('sessionCounter')) : 0;
}

export function reloadSurvey() {
    window.location.href = '../survey/';
}

export function generateUniqueArray(lastSessionIndexes) {
    // generate a random int per length of products array, if number exists in lastSessionIndexes or already in new uniqueRandomArray, keep looping until the new uniqueRandomArray has 3 numbers (stored as index of products)
    let uniqueRandom;
    let uniqueRandomArray = [];
    do {
        uniqueRandom = Math.floor(Math.random() * products.length);
        if (!uniqueRandomArray.includes(uniqueRandom) && !lastSessionIndexes.includes(uniqueRandom)) {
            uniqueRandomArray.push(uniqueRandom);
        } else if (lastSessionIndexes.includes(uniqueRandom)) {
            // console.log(products[uniqueRandom].name); // for checking that something happens on match lastSessionIndexes
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

export function setLastSessionIds(displayedProductIds) {
    // store last 3 items displayed *after* click from productsToDisplay[] (array of 3 product ids)
    sessionStorage.setItem('lastSessionIds', JSON.stringify(displayedProductIds));
}

export function setSessionCounter(counter) {
    // update counter - up to 25
    sessionStorage.setItem('sessionCounter', JSON.stringify(counter));
}