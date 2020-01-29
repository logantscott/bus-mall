const allSessions = JSON.parse(localStorage.getItem('allSessions'));

// example object:
// wine-glass: {
    // impressions: 16,
    // clicks: 3
// },

let surveyResults = {};

allSessions.forEach(session => {
    session.productIds.forEach(productId => {
        if (!surveyResults[productId]) surveyResults[productId] = {};
        surveyResults[productId].impressions = surveyResults[productId].impressions ? surveyResults[productId].impressions + 1 : 1;
    });
    if (!surveyResults[session.selectedId]) surveyResults[session.selectedId] = {};
    surveyResults[session.selectedId].clicks = surveyResults[session.selectedId].clicks ? surveyResults[session.selectedId].clicks + 1 : 1;
});

console.log(surveyResults);