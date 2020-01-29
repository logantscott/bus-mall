import renderSurvey from './render-survey.js';
import { getCounter, reloadSurvey, newSession, setSessionCounter, setLastSessionIds } from '../common/utils.js';

const form = document.getElementById('surveyForm');
// const container = document.getElementById('surveyContainer');

let sessionId = sessionStorage.getItem('sessionId');
sessionId = sessionId ? JSON.parse(sessionId) : newSession() ;
let counter = getCounter();

(counter >= 25) ? window.location.href = '../survey/complete/' : renderSurvey();

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    counter = getCounter(); //do i need this?
    let selected = document.querySelector('input[name="surveyOptions"]:checked').id;

    const displayedIds = getDisplayedIds();
    setLastSessionIds(displayedIds);

    updateAllSessions(displayedIds, selected, sessionId);
    updateUserSession(displayedIds, selected, sessionId);

    counter++;
    setSessionCounter(counter);
    
    //PLACEHOLDER for doing stuff when you're done
    if (counter >= 25) {
        localStorage.setItem('userSession', sessionStorage.getItem('userSession'));
        sessionStorage.removeItem('userSession');
        window.location.href = '../survey/complete/';
        return false;
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

function updateUserSession(displayedProductIds, selectedProduct, sessionId) {
    const userSession = getUserSession();
    const session = new Session(displayedProductIds, selectedProduct, sessionId);

    userSession.push(session);
    sessionStorage.setItem('userSession', JSON.stringify(userSession));
}

function getUserSession() {
    return sessionStorage.getItem('userSession') ? JSON.parse(sessionStorage.getItem('userSession')) : [] ;
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