//New Way with gRPC
const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set("authorization", "Key a98ffe3acb7b4ed884e7ab5a5811c7b0");

// const clarifai = require('clarifai'); // old way


// const app = new Clarifai.App({
//     apiKey: ''
//    });
const hanldeApiCall = (req, res) => {
    stub.PostModelOutputs(
        {
            // This is the model ID of a publicly available General model. You may use any other public or custom model ID.
            model_id: "aaa03c23b3724a16a56b629203edc62c",
            inputs: [{data: {image: {url: "https://samples.clarifai.com/dog2.jpeg"}}}]
        },
        metadata,
        (err, response) => {
            if (err) {
                console.log("Error: " + err);
                return;
            }

            if (response.status.code !== 10000) {
                console.log("Received failed status: " + response.status.description + "\n" + response.status.details);
                return;
            }

            console.log("Predicted concepts, with confidence values:")
            for (const c of response.outputs[0].data.concepts) {
                console.log(c.name + ": " + c.value);
            }
        }
    );

    //Old way of predicting
    // app.models
    // .predict(
    //     {
    //     id: 'face-detection',
    //     name: 'face-detection',
    //     version: '6dc7e46bc9124c5c8824be4822abe105',
    //     type: 'visual-detector',
    //     },
    //     req.body.input
    // )
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