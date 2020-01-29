import products from '../data/products.js';
import { getCounter, clearSurvey, generateUniqueArray, getLastSession } from '../common/utils.js';

export default function renderSurvey() {
    const container = document.getElementById('surveyContainer');

    // let counter = getCounter();
    let lastSessionIndexes = getLastSession();
    let uniqueRandomArray = generateUniqueArray(lastSessionIndexes);
    let productsToDisplay = []; // initialize before uniqueRandomArray.forEach

    // uniqueRandomArray contains 3 unique indexes of product, loop through and display them
    uniqueRandomArray.forEach(uniqueIndex => {
        const label = document.createElement('label'); //child container
        const input = document.createElement('input'); //radio input
        const image = document.createElement('img'); //product image
        const span = document.createElement('span'); //textcontent below

        input.type = 'radio';
        input.name = 'surveyOptions';
        image.src = products[uniqueIndex].image;
        span.textContent = products[uniqueIndex].name;

        label.appendChild(input);
        label.appendChild(image);
        label.appendChild(span);
        container.appendChild(label);

        // EVENT LISTENER
        label.addEventListener('click', (e) => {
            e.preventDefault(); //prevent dupes mainly

            let counter = getCounter(); //do i need this?
            
            //if25
            //store user session up to 25
            //store total sessions
            //get current usersessions
            //get current totalsessions

            // store last 3 items displayed *after* click from productsToDisplay[] (array of 3 product ids)
            sessionStorage.setItem('lastSessionIds', JSON.stringify(productsToDisplay));

            // update counter - up to 25
            counter++;

            clearSurvey();

            // PLACEHOLDER for doing stuff when you're done
            if (counter >= 25) {
                if (confirm('start over?')) { 
                    sessionStorage.setItem('sessionCounter', JSON.stringify(0));
                    renderSurvey();
                }
            } else {
                sessionStorage.setItem('sessionCounter', JSON.stringify(counter));
                renderSurvey();
            }

        }); // end EVENT LISTENER

        // convert index to id for storing, mainly good practice if array changed, will find same id, not index
        productsToDisplay.push(products[uniqueIndex].id);

    }); // end uniqueRandomArray.forEach
}// end renderSurvey function