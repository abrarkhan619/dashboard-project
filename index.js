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


app.get('/', async(req, res) => {
    res.render('index');
});

app.get('/sonarcloud', async (req, res) => {
    let data = await getAPI.getSonarcloud()
    console.log(data)

    res.render('sonarcloud', {
        data,
        name: data.branches[0].name,
        isMain: data.branches[0].isMain,
        date: data.branches[0].analysisDate,
        Status: data.branches[0].status.qualityGateStatus
    })
})


app.get('/sonarcloudPR', async (req, res) => {
    let data = await getAPI.getSonarcloudPR();
    console.log(data);

    res.render('sonarcloudPR', {
        data,
        Title: data.pullRequests[0].title,
        Branch: data.pullRequests[0].branch,
        Date: data.pullRequests[0].analysisDate,
        URL: data.pullRequests[0].url
    })
})


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

app.listen(3000, () => {
    console.log('Listening on port 3000');
})
