const request = require('request');
const { promisify } = require('util'); // required part of the util module - the full thing is quite big, and we don't want all of it.

const promisifiedRequest = promisify(request);

const getWeather = async () => {
    let data = await promisifiedRequest({
        uri: `https://api.openweathermap.org/data/2.5/weather?q=Blackpool,uk&APPID=${process.env.APPID}`,
        json: true
    })
    return data.body
}

const getHaryyPotter = async () => {
    let data = await promisifiedRequest({
        uri: `https://www.potterapi.com/v1/sortingHat`,
        json: true
    })
    return data.body
}

const chuckNorris = async () => {
    let data = await promisifiedRequest({
        url: 'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random',
        headers: {
            'x-rapidapi-host': 'matchilling-chuck-norris-jokes-v1.p.rapidapi.com',
            'x-rapidapi-key': 'b9bfac585emshe768f7b7e99349fp10b4f9jsnc007da24024f',
            accept: 'application/json'
        },
        json: true
    })
    return data.body
};

const getJoke = async () => {
    let data = await promisifiedRequest({
        url: 'https://joke3.p.rapidapi.com/v1/joke',
        qs: { format: 'json' },
        headers: {
            'x-rapidapi-host': 'joke3.p.rapidapi.com',
            'x-rapidapi-key': 'b9bfac585emshe768f7b7e99349fp10b4f9jsnc007da24024f',
            'content-type': 'application/json',
            accept: 'application/json'
        },
        json: true
    })
    return data.body
}

const randomQuote = async () => {
    let data = await promisifiedRequest({
        url: 'https://quotes15.p.rapidapi.com/quotes/random/',
        headers: {
            "x-rapidapi-host": "quotes15.p.rapidapi.com",
            "x-rapidapi-key": "b9bfac585emshe768f7b7e99349fp10b4f9jsnc007da24024f"
        },
        json: true
    })
    return data.body
}

const getPokemon = async () => {
    let data = await promisifiedRequest({
        uri: `https://pokeapi.co/api/v2/pokemon/`,
        json: true
    })
    return data.body
}

module.exports = {
    getWeather,
    getHaryyPotter,
    getPokemon,
    chuckNorris,
    getJoke,
    randomQuote
};

// APPID="c8c3ba96b9701732d4139697f681d8e7" nodemon