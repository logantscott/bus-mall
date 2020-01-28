import renderSurvey from './render-survey.js';

let sessionId = sessionStorage.getItem('sessionId');
let sessionCounter = sessionStorage.getItem('sessionCounter') ? Number(sessionStorage.getItem('sessionCounter')) : 0;

// sessionStorage.setItem('sessionCounter', sessionCounter); does this need to happen here?

if (sessionId) {
    sessionId = JSON.parse(sessionId);
} else {
    sessionId = newSession();
}

function newSession() {
    const newSessionId = Date.now();
    sessionCounter = 0;
    sessionStorage.setItem('sessionId', newSessionId);
    sessionStorage.setItem('sessionCounter', 0);
    return newSessionId;
}

console.log(sessionId + ' : ' + sessionCounter);


renderSurvey(sessionCounter);