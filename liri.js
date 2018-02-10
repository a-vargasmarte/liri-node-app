require("dotenv").config();
let Spotify = require('node-spotify-api');
let Twitter = require('twitter');
let keys = require('./keys.js');
const request = require('request');
// Load the fs package to read and write
let fs = require("fs");


let spotify = new Spotify(keys.spotify);
// console.log(keys.twitter);
let client = new Twitter(keys.twitter);
// console.log(client);

// we require spotify.js
const spotifyObject = require(`./spotify.js`);

// commands:
// my-tweets, spotify-this-song, movie-this, do-what-it-says

// basic structure of commands
// process.argv[2] is the user input
// process.argv[3] is user string that needs to be coded

let userSearch = process.argv.slice(3);
let command = process.argv[2];


let dataArray;

// node liri.js spotify-this-song '<song name here>'
function spotifySearch() {
    console.log(spotifyObject);
    if (dataArray === undefined) {
        spotifyObject.spotifySearch.query = userSearch.join(' ');
    }
    else {
        spotifyObject.spotifySearch.query = userSearch
    }
    // console.log(spotifyObject);

    spotify.search(spotifyObject.spotifySearch, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        let spotifyResponse = {
            Artists: data.tracks.items[0].album.artists[0].name,
            songName: data.tracks.items[0].name,
            previewLink: data.tracks.items[0].preview_url,
            album: data.tracks.items[0].album.name
        };

        console.log(spotifyResponse);
    });

}

// node liri.js my-tweets
function tweetSearch() {
    client.get('search/tweets', {
        q: 'from:JadasCarca'
    }, function (error, tweets, response) {
        if (!error) {
            let tweetResponse = {
                text: tweets.statuses[0].text,
                created_at: tweets.statuses[0].created_at
            };
            console.log(tweets.statuses);
            // console.log(tweetResponse);
        }
    });
}

// node liri.js movie-this `<movie name here>`
function movieSearch() {
    let encodedMovieSearch = userSearch.join('+');

    // then we run a request to the OMDB API with the movie specified
    const movieQuery = `http://www.omdbapi.com/?t=${encodedMovieSearch}&y=&plot=short&apikey=trilogy`;

    // then make a request using movieQuery
    request(movieQuery, function (e, r, b) {
        if (!e && r.statusCode === 200) {
            // console.log(JSON.parse(b));
            let movieJSON = JSON.parse(b);
            let movieResponse = {
                title: movieJSON.Title,
                year: movieJSON.Year,
                imdbRating: movieJSON.imdbRating,
                rottenRating: movieJSON.Ratings[1].Value,
                country: movieJSON.Country,
                language: movieJSON.Language,
                plot: movieJSON.Plot,
                actors: movieJSON.Actors
            };
            console.log(movieResponse);
        }
    });
}

// do-what-it-says
function doIt() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        // create an array of data by splitting by a comma
        dataArray = data.split(',');
        console.log(dataArray);
        // we redeclare command as the first item of this dataArray
        command = dataArray[0];
        // we redeclare userSearch as the second item of this dataArray
        userSearch = dataArray[1];
        console.log(userSearch);
        // and we invoke the spotifySearch function
        spotifySearch();
    });
}

// we create a switch-case statement where I set up each of the user's commands
switch (command) {
    case "my-tweets":
        tweetSearch();
        break;

    case "spotify-this-song":
        spotifySearch();
        break;

    case "movie-this":
        movieSearch();
        break;

    case "do-what-it-says":
        doIt();
        break;
}