import products from '../data/products.js';
import { generateUniqueArray, getLastSession } from '../common/utils.js';

export default function renderSurvey() {
    const form = document.getElementById('surveyForm');
    const container = document.getElementById('surveyContainer');

    // let counter = getCounter();
    let lastSessionIndexes = getLastSession();
    let uniqueRandomArray = generateUniqueArray(lastSessionIndexes);

    // uniqueRandomArray contains 3 unique indexes of product, loop through and display them
    uniqueRandomArray.forEach(uniqueIndex => {

        const label = document.createElement('label'); //child container
        const input = document.createElement('input'); //radio input
        const image = document.createElement('img'); //product image
        const span = document.createElement('span'); //textcontent below

        input.type = 'radio';
        input.name = 'surveyOptions';
        input.id = products[uniqueIndex].id;
        image.src = products[uniqueIndex].image;
        span.textContent = products[uniqueIndex].name;

        label.appendChild(input);
        label.appendChild(image);
        label.appendChild(span);
        container.appendChild(label);
        
    }); // end uniqueRandomArray.forEach

    const button = document.createElement('button');
    button.textContent = 'Submit';

    form.appendChild(button);

}// end renderSurvey function