const { log } = require('console')
const express = require('express')
const fs = require('fs')
const app = express()
app.use(express.json())

app.use((req, res, next) => {

})
const route = express.Router()
app.use(route)

app.get('/', (req, res) => {
    res.status(200).json({ msg: "Hello From NaTours Server" })
})

const tours = JSON.parse(fs.readFileSync('./Assets/tours.json'))
app.get('/api/tours', async (req, res) => {

    res.status(200).json({
        status: "active",
        results: tours.length,
        data: {
            tours: tours
        }
    })
})

app.get('/api/tours/:id', async (req, res) => {

    let id = req.params.id * 1
    const tour = tours.find(el => el.id == id)

    if (!tour) res.status(400).json({
        status: "Failed", data: { msg: "No such Tour" }
    })
    else {
        res.status(200).json({
            status: "Success",
            data: {
                tour: tour
            }
        })
    }
})

app.post('/api/tours', async (req, res) => {

    const newId = tours[tours.length - 1].id + 1
    const newTour = Object.assign({ id: newId }, req.body)
    tours.push(newTour);
    console.log(tours);
    fs.writeFile('./Assets/tours.json', JSON.stringify(tours), err => {
        res.status(201).json({
            status: "success",
            data: {
                tour: newTour
            }
        })
    })
    tours.push
})

app.patch('/api/tours/:id', (req, res) => {
    // Logic to Update tour
    let id = req.params.id * 1
    // const tour = tours.find(el => el.id == id)

    if (id > tours.length) res.status(400).json({
        status: "failed", data: { msg: "No such Tour" }
    })
    res.status(200).json({
        status: "success",
        data: {
            // tour : updateTour 
        }
    })
})


app.delete('/api/tours/:id', (req, res) => {
    // Logic to Update tour
    let id = req.params.id * 1
    // const tour = tours.find(el => el.id == id)

    if (id > tours.length) res.status(400).json({
        status: "failed", data: { msg: "No such Tour" }
    })
    res.status(204).json({
        status: "success",
        data: null
    })
})
////////////////////

const getAllUsers = (req, res) => {
    console.log("Inisde getAllusers");
    res.status(500).json({
        status: "err",
        message: "This route is not yet defined"
    })
}

const getUser = (req, res) => {
    res.status(500).json({
        status: "err",
        message: "This route is not yet defined"
    })
}
const createUser = (req, res) => {
    res.status(500).json({
        status: "err",
        message: "This route is not yet defined"
    })
}
const updateUser = (req, res) => {
    res.status(500).json({
        status: "err",
        message: "This route is not yet defined"
    })
}
const deleteUser = (req, res) => {
    res.status(500).json({
        status: "err",
        message: "This route is not yet defined"
    })
}
app.route('/api/users').get(getAllUsers).post(createUser);

app.route('/api/users/:id').get(getUser).patch(updateUser).delete(deleteUser)

app.listen(5100, () => {
    console.log("server Started on Port Number : 5100");
})