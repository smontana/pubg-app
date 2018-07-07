// const env = require('dotenv').load(); <-- if using express (maybe?)
require('dotenv').load();
const env = process.env;
const region = 'xbox-na'

const pubg = require('pubg.js');
const client = new pubg.Client(env.API_KEY, region);

//---- Get a single player using their name
const player = client.getPlayer({name: 'SMontana1992'})
    .then(player => console.log(JSON.stringify(player, null, 2)))
    .catch(error => console.log(error))

//---- Retrieve thousands of recent matches, and get stats for any of them
const matches = client.getSamples()
    .then(matches => console.log(JSON.stringify(matches, null, 2)))
    .catch(error => console.log(error))



//------- WIP -------\\

// let mid = '25bc8116-4a60-44b1-8467-0699cd32bdad';

//---- Fetch a match with a heap of data on every participant of the match and their stats
// const match = client.getSamples()

// const match = client.getMatch(mid)

    // .then(match => {

        //---- Manipulate the data in any way you like, or even get match telemetry data

        // match.fetchTelemetry()

        //---- View a heap of data on the teams - best k/d, winning team etc
        // match.relationships.rosters

    // })
    // .catch(error => console.log(error))