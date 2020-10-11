const sched = require('node-schedule')
sched.scheduleJob('*/2 * * * * ', function () {
    console.log('Running getAndgetAndUploadJob...')
    setTimeout(function () {
        let date = new Date()
        console.log(date.toISOString())
    }, 5000);
    setTimeout(function () {
        let date = new Date()
        console.log('Getting the latest CoVid update from Municipality of Liloan Page...')
        console.log(date.toISOString())
    }, 10000);
    setTimeout(function () {
        let date = new Date()
        console.log('Downloading the latest photo...')
        console.log(date.toISOString())
    }, 15000);
    setTimeout(function () {
        let date = new Date()
        console.log('Uploading to fb-liloan-covid-daily-update Storage bucket...')
        console.log(date.toISOString())
    }, 20000);
    setTimeout(function () {
        let date = new Date()
        console.log('Upload done. Deleting the image from path...')
        console.log(date.toISOString())
    }, 25000);
    setTimeout(function () {
        let date = new Date()
        console.log('Job done. Over and out...')
        console.log(date.toISOString())
    }, 30000);
})