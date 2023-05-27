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


const users = [
    { id: 1, name: 'samsul', email: "samsul@gmail.com" },
    { id: 2, name: 'kamsul', email: "samsun@gmail.com" },
    { id: 3, name: 'zamrul', email: "samsu@gmail.com" }
]

//username: simpleNodeServer
//password: DoR9ziRnLZ1ecsPP

const uri = "mongodb+srv://simpleNode:pIjpN5x9ojjuKz8Q@cluster0.gfg0jvx.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        const userCollection = client.db('simpleNodeServer').collection('users');
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


app.get('/users', (req, res) => {
    if (req.query.name) {
        const search = req.query.name;
        const filtered = users.filter(usr => usr.name.toLowerCase().indexOf(search) >= 0)
        res.send(filtered)
    }
    res.send(users)
})

app.post('/users', (req, res) => {
    console.log('POST API CALLED');
    const user = req.body;
    user.id = users.length + 1;
    users.push(user)
    console.log(user)
    res.send(user)
})


app.listen(port, () => {
    console.log(`simple node server running on port ${port}`);
})