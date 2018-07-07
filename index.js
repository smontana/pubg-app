// const env = require('dotenv').load(); <-- if using express (maybe?)
require('dotenv').load();
const lodash = require('lodash');
const env = process.env;
const region = 'xbox-na'
const http = require('https');
const fs = require('fs');

const pubg = require('pubg.js');
const client = new pubg.Client(env.API_KEY, region);

// const telemetryUrl = (id) => {
//     return `https://telemetry-cdn.playbattlegrounds.com/${region}/2018/01/01/0/0/${id}-telemetry.json`;
// }


function saveMatchTelemetry(matchId, telemetryUrl) {
    var file = fs.createWriteStream(`${__dirname}/matches/match-${matchId}-telemetry.json`);
    var request = http.get(telemetryUrl, response => {
      response.pipe(file);
    });
}

//---- Get a single player using their name
const player = client.getPlayer({name: 'SMontana1992'})
    .then(player => {
        let nMatches = lodash.take(player.relationships.matches, 1);
        // console.log(nMatches);
        nMatches.forEach(match => {
            client.getMatch(match.id)
                .then(match => {
                    let telemetryUrl = match.relationships.assets[0].attributes.URL;
                    saveMatchTelemetry(match.id, telemetryUrl)
                });
        });
    })
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
