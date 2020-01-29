import renderSurvey from './render-survey.js';
import { getCounter, reloadSurvey, newSession, setSessionCounter, setLastSessionIds } from '../common/utils.js';

const form = document.getElementById('surveyForm');
// const container = document.getElementById('surveyContainer');

let sessionId = sessionStorage.getItem('sessionId');
sessionId = sessionId ? JSON.parse(sessionId) : newSession() ;

renderSurvey();

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let counter = getCounter(); //do i need this?
    let selected = document.querySelector('input[name="surveyOptions"]:checked').id;

    const displayedIds = getDisplayedIds();
    setLastSessionIds(displayedIds);

    updateAllSessions(displayedIds, selected, sessionId);

    counter++;
    setSessionCounter(counter);
    
    //PLACEHOLDER for doing stuff when you're done
    if (counter >= 25) {
        if (confirm('start over?')) {
            newSession();
        }
    }

    reloadSurvey();

}); // end EVENT LISTENER

class Session {
    constructor(displayedProductIds, selectedProduct, sessionId) {
        this.productIds = displayedProductIds;
        this.selectedId = selectedProduct;
        this.sessionId = sessionId;
    }
}

function updateAllSessions(displayedProductIds, selectedProduct, sessionId) {
    const allSessions = getAllSessions();
    const session = new Session(displayedProductIds, selectedProduct, sessionId);

    allSessions.push(session);
    localStorage.setItem('allSessions', JSON.stringify(allSessions));
}

function getAllSessions() {
    return localStorage.getItem('allSessions') ? JSON.parse(localStorage.getItem('allSessions')) : [] ;
}

function getDisplayedIds() {
    const inputs = document.getElementsByTagName('input');
    let displayedProductIds = [];

    for (let i = 0; i < inputs.length; i++) {
        displayedProductIds.push(inputs[i].id);
    }
    return displayedProductIds;
}