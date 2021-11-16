require('dotenv').config()
const express = require('express')
const router = express.Router()
const axios = require ('axios')
const authHeader = {
    headers: {
        'Authorization': process.env.API_KEY
    }
}

// create search route
router.get('/search', (req, res) => {
    res.render('exercises/search')
})

// create index route based on search results
router.get('/search/results', (req, res) => {
    const rootApi = 'https://v1.exercisedb.io/api/exercises'
    let muscleTargeted = req.query.bodyPart

    axios.get(`${rootApi}/bodyPart/${muscleTargeted}`, authHeader)
    .then(apiRes => {
        console.log('this is the apiRes data arr of exercises', apiRes.data)
        const results = apiRes.data
        res.render('exercises/index', {results})
    })
    .catch(error => {
        console.error
    })
})

// create a show route based on exercise clicked on
router.get('/:exercise_name', (req, res) => {
    const rootApi = 'https://v1.exercisedb.io/api/exercises'
    let exerciseName = req.params.exercise_name

    axios.get(`${rootApi}/name/${exerciseName}`, authHeader)
    .then(apiRes => {
        console.log('these are the exercise details', apiRes.data)
        const results = apiRes.data[0]
        let name = results.name
        let bodyPart = results.bodyPart
        let equipment = results.equipment
        let demoVid = results.gifUrl
        let targetMuscle = results.target

        res.render('exercises/show', {name, bodyPart, equipment, demoVid, targetMuscle})
    })
})

module.exports = router