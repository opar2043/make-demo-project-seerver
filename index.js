require("dotenv").config();

const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5001;

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// zB31awhyLFjBjNGC
// campgain

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://campgain:zB31awhyLFjBjNGC@cluster0.xfvkq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
//  console.log(process.env.DB_USER ,'user vaiiiii');
//  console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // await client.connect();

    const campgainCollection = client.db("campgainDb").collection("campgain");
    const projectCollection = client.db("campgainDb").collection("project");

    // post operation  ................

    // app.post('/campgain',async (req,res)=>{
    //     const newCampgain = req.body;
    //     const result = await campgainCollection.insertOne(newCampgain);
    //     res.send(result)
    // })

    app.post('/project', async(req,res)=>{
        const projectNew = req.body;
        const result = await projectCollection.insertOne(projectNew);
        res.send(result)
    })

    app.get('/project', async(req,res)=>{
       const projectGet = projectCollection.find();
       const result = await projectGet.toArray();
       res.send(result);
    })

    app.delete('/project/:id' , async(req, res)=> {
      const id = req.params.id;
      const query = {_id : new ObjectId(id)};
      const result = await projectCollection.deleteOne(query);
      res.send(result);
    })

    // app.post('/users',async (req,res)=>{
    //     const newCampgain = req.body;
    //     const result = await userCollection.insertOne(newCampgain);
    //     res.send(result)
    // })

    //  get operation =====================

    // app.get('/campgain',async(req,res)=>{
    //     const cursor = campgainCollection.find();
    //     const result = await cursor.toArray();
    //     res.send(result);
    // })

    // app.get('/users',async(req,res)=>{
    //     const cursor = userCollection.find();
    //     const result = await cursor.toArray();
    //     res.send(result);
    // })

    // delete operation =====================
    // app.delete('/campgain/:id', async(req,res)=>{
    //     const id = req.params.id;
    //     const query = {_id: new ObjectId(id)};
    //     const result = await campgainCollection.deleteOne(query);
    //     res.send(result);
    // })

    // app.patch('/campgain/:id',async(req,res)=>{
    //   const id = req.params.id;
    //   const updateCampgain = req.body;
    //   const query = {_id: new ObjectId(id)};
    //   const update = {
    //     $set: {
    //       title : updateCampgain?.title  ,
    //       image: updateCampgain?.image,
    //       type: updateCampgain?.type,
    //       description: updateCampgain?.description,
    //       minDonation: updateCampgain?.minDonation,
    //       deadline: updateCampgain?.deadline
    //     },
    //   }
    //   const result = await campgainCollection.updateOne(query,update);
    //   res.send(result)
    // })

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB to the Protfolio server!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  console.log("hello server ");
  res.send("the portfolio server is running");
});

app.listen(port, (req, res) => {
  console.log("port is running:", port);
});
