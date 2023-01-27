const clarifai = require('clarifai');


const app = new Clarifai.App({
    apiKey: 'a98ffe3acb7b4ed884e7ab5a5811c7b0'
   });

const hanldeApiCall = (req, res) => {
    app.models
    .predict(
        {
        id: 'face-detection',
        name: 'face-detection',
        version: '6dc7e46bc9124c5c8824be4822abe105',
        type: 'visual-detector',
        },
        req.body.input
    )
}
   
const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => {
        res.status(400).json('unable to get entries')
    })
}

module.exports = {
    handleImage
}
module.exports = {
    hanldeApiCall
}