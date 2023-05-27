const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send("simple node server is running")
})

//middleware
app.use(cors())
app.use(express.json())


//username: simpleNode
//password: pIjpN5x9ojjuKz8Q

const uri = "mongodb+srv://simpleNode:pIjpN5x9ojjuKz8Q@cluster0.gfg0jvx.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        const userCollection = client.db('simpleNodeAnother').collection('users');

        app.get('/users', async (req, res) => {
            const cursor = userCollection.find({})
            const user = await cursor.toArray();
            res.send(user)
        })

        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user);
            user._id = result.insertedId;
            res.send(user)
        })
    }
    finally {

    }
}
run().catch(error => console.log(error))




app.listen(port, () => {
    console.log(`simple node server running on port ${port}`);
})