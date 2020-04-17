const fetch = require ('node-fetch');
const request = require('request');
const { promisify } = require('util'); // required part of the util module - the full thing is quite big, and we don't want all of it.
require('dotenv').config()

const promisifiedRequest = promisify(request);


const getSonarcloud = async () => {
    let data = await promisifiedRequest({
        uri: `https://sonarcloud.io/api/project_branches/list?project=Health-Education-England_TIS-TRAINEE-DETAILS`,
        json: true
    })
    return data.body
}

const getSonarcloudPR = async () => {
    let data = await promisifiedRequest({
        url: 'https://sonarcloud.io/api/project_pull_requests/list?project=Health-Education-England_TIS-TRAINEE-DETAILS',
        json: true
    })
    return data.body
}


const getSentry = async () => {
    let data = await fetch('https://sentry.io/api/0/projects/health-education-england-9v/tis-profile/issues/',{
        headers: {
            Authorization: `Bearer ${process.env.SENTRYID}`
        }
    })
    return await data.json();
}


const getJenkins = async () => {
    let data = await fetch(
       `https://abrarkhan619:${process.env.JENKINSID}@build.tis.nhs.uk/jenkins//view/Pipeline%20Dashboard/api/json?pretty=true`,
    )
    return await data.json();
}

const getServiceStatus = async () => {
    let data = await promisifiedRequest({
        url: 'http://service-status.tis.nhs.uk/api/activeStatus',
        json: true
    })
    return data.body
}

module.exports = {
    getSonarcloud,
    getSonarcloudPR,
    getSentry,
    getJenkins,
    getServiceStatus
};

// APPID="c8c3ba96b9701732d4139697f681d8e7" nodemon