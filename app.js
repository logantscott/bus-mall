//sessionStorage.getItem('')

//onclick sessionstorage counter++
//if checkcounter25(), get session key, clear session storage, and load session results

//so, on survey page load, get session key and counter to vars
//on click, sessionstorage increase counter, checkcounter25() (if yes, load session key analytics)

//session object:
//{ 
    // productIds: [1, 5, 15],
    // selected: 15,
    // sessionId: 234213534532
    // clickId?
//}
// get unique sessions?
// get id appearance totals from session productIds property
// get selected total from session selected property


//for comparing, store a previous session key separately
//function will be new obj without previous session obj ids
//stretch goal: prefer showing products with less representation?
//selection random... how to iterate and remove random selection for showing 3 unique non-repetitive products?

//difference between 'session of 25' and click session... make sure to differentiate
//session of 25 can use a separate var for keeping track... maybe even in sessionStorage
//maybe use sessionStorage for it's own list of <=25 selections
//click session just gets recorded to total sessions (.push(), .setItem())

//sessionstorage:
//session id
//last session
//total session (up to 25)

//localstorage:
//totalsessions