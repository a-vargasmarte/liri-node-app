# liri-node-app

## Intro

Language Interpretation and Recognition Interface **(LIRI)** takes user commands to send requests to Twitter, Spotify, and OMDB APIs. LIRI then displays responses to the user in the command line (or terminal).

## How it works

### Commands

LIRI takes the following commands:

* `my-tweets`

* `spotify-this-song`

* `movie-this`

* `do-what-it-says`

### Commands in detail

From the same directory location of `liri.js`, type the following in git bash or your terminal (if you're using a Mac):

1. `node liri.js my-tweets`

   * This will show your last 20 tweets and when they were created at in your terminal/bash window. **(read important info on twitter keys below)**.

2. `node liri.js spotify-this-song '<song name here>'`

   * This will show the following information about the song in your terminal/bash window:
     
     * Artist(s)
     
     * The song's name
     
     * A preview link of the song from Spotify
     
     * The album that the song is from

   * If no song is provided then your program will default to "The Sign" by Ace of Base.

3. `node liri.js movie-this '<movie name here>'`

   * This will output the following information to your terminal/bash window:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```

   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
     
     * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>
     
     * It's on Netflix!

**Psst!** A little bird told me this:
> You will need to provide your own api keys for twitter, spotify, and OMDB in `keys.js` if you actually want these commands to work.

## API keys

#### Get your Twitter API keys by following these steps:

1. Visit [this link] (https://apps.twitter.com/app/new).
   
2. Fill out the form with dummy data. Type `http://google.com` in the Website input. Don't fill out the Callback URL input. Then submit the form.
   
3. On the next screen, click the Keys and Access Tokens tab to get your consume key and secret.   
    
    * Copy and paste them into your .env file, replacing the `your-twitter-consumer-key` and `your-twitter-consumer-secret` placeholders.
   
4. At the bottom of the page, click the `Create my access token` button to get your access token key and secret. 
     
    * Copy the access token key and secret displayed at the bottom of the next screen. Paste them into your .env file, replacing the placeholders for `your-twitter-access-token-key` and `your-twitter-access-token-secret`.

#### Get your spotify keys by following these steps:

1. Visit [this link] (https://developer.spotify.com/my-applications/#!/).
   
2. Either login to your existing Spotify account or create a new one (a free account is fine) and log in.

3. Once logged in, navigate to <https://developer.spotify.com/my-applications/#!/applications/create> to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.

4. On the next screen, scroll down to where you see your client id and client secret. You will copy and paste these values to your `.env` file to replace placeholders for `SPOTIFY_ID` and `SPOTIFY_SECRET`
