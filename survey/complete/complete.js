import { newSession } from '../../common/utils.js';

const newSurvey = document.getElementById('newSurvey');
const lastResults = document.getElementById('lastResults');

newSurvey.addEventListener('click', (e) => {
    e.preventDefault;
    newSession();
    window.location.href = '../../survey/';
    return false;
});

lastResults.addEventListener('click', () => {

})