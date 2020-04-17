const express = require('express'); // npm i express - this allows me to use express server in my project
const request = require('request'); // this will be replaced with fetch later on.
const path = require('path'); // npm i path
const hbs = require('express-handlebars'); // npm i express-handlebars

// function inits
const app = express(); //initialised express to use its features
// const getWeather = require('./lib/getWeather')
const getAPI = require('./lib/getAPI');

// path is about to be set // linking directory to public folder
app.use(express.static(path.join(__dirname, 'public')))




app.engine('.hbs', hbs({
    defaultLayout: 'layout',
    extname: '.hbs'
}))
app.set('view engine', '.hbs')


// getWeather()

// four http methods: GET, POST, PUT & DELETE - you may see CRUD for other stacks which stands for CREADE, READ, UPDATE, DELETE

// get is a function inside of express - for more info, look at express mpdule on NPMJS
app.get('/', async (req, res) => { // each GET method should have a req and res. req = request, res = response, - standard naming convention
    let data = await getAPI.getWeather();
    console.log(data);
    res.render('index');
    // res.sendFile(__dirname + '/index.html') // sendFile is for express only, no templating engine used.
    // For each file you want to load, you need a GET.
});

app.get('/harryPotter', async (req, res) => {
    let data = await getAPI.getHaryyPotter();
    console.log(data);
    res.render('harryPotter', {
        data,
        houseName: data
    })
});

app.get('/pokemon', async (req, res) => {
    let data = await getAPI.getPokemon();
    console.log(data);
    res.render('pokemon', {
        data,
        title: `This is your pokemon: ${data}`
    })  
})

app.get('/chuckNorris', async (req, res) => {
    let data = await getAPI.chuckNorris();
    // data = JSON.parse(data);
    console.log(data);
    console.log(data.value);
    
    res.render('chuckNorris', {
        data,
        title: data.value
    })  
})

app.get('/getJoke', async (req, res) => {
    let data = await getAPI.getJoke();
    console.log(data);
    res.render('getJoke', {
        data,
        title: `Here is your joke: ${data.content}`
    })
})

app.get('/randomQuote', async (req, res) => {
    let data = await getAPI.randomQuote();
    console.log(data);
    res.render('randomQuote', {
        data,
        title: `Here is your Quote: ${data.content}`,
        person: `- ${data.originator.name}`
    })
})

app.get('/sonarcloud', async (req, res) => {
    let data = await getAPI.getSonarcloud();
    console.log(data);
    res.render('sonarcloud', {
        data,
        Title: data.pullRequests[0].title,
        Branch: data.pullRequests[0].branch,
        Date: data.pullRequests[0].analysisDate,
        URL: data.pullRequests[0].url
        
    })
})

// app.get('/sentry', async (req, res) => {
//     let data = await getAPI.getSentry();
//     console.log(data);
//     res.render('sentry', {
//         data,
//         title: data
//     })
// })

app.get('/sentry', async (req, res) => {
    let data = await getAPI.getSentry();
    console.log(data)

    sentryArray = []

    for (const object of data){
        let newObject = {
            title: object.title,
            culprit: object.culprit,
            permalink: object.permalink,
            lastSeen: object.lastSeen,
            platform: object.platform
        }

        sentryArray.push(newObject);
    }
        
    res.render('sentry', {
        sentryArray, 
    })
})

// app.get('/jenkins', async (req, res) => {
//     let data = await getAPI.getJenkins();
//     console.log(data);
//     res.render('jenkins', {
//         data,
//         title: data.pipelines.lastActivity
//     })
// })

app.get('/jenkins', async (req, res) => {
    let data = await getAPI.getJenkins()
    console.log(data)

    jenkinsArray = []

     for (const jenkinsData of data.jobs){
            let newObject1 = {
                name: jenkinsData.name,
                url: jenkinsData.url,
                color: jenkinsData.color
            }
            
            jenkinsArray.push(newObject1);
     }
    res.render('jenkins', {
        jenkinsArray,
    })
})

app.get('/serviceStatus', async (req, res) => {
    let data = await getAPI.getServiceStatus();
    console.log(data);
    res.render('serviceStatus', {
        data,
    })
})

app.listen(3000, () => { // creates a connection on a specified port - localhost: 3000 - response I should get whn I run is 'cannot GET/
    console.log('Listening on port 3000');
})
