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
    const userCollection = client.db("campgainDb").collection("user");
    const reviewsCollection = client.db("campgainDb").collection('reviews');

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

  //  User Section

    app.post('/user', async(req,res)=>{
        const userNew = req.body;
        const result = await userCollection.insertOne(userNew);
        res.send(result)
    })

    app.get('/user', async(req,res)=>{
       const userGet = userCollection.find();
       const result = await userGet.toArray();
       res.send(result);
    })

    // reviews Section

    app.post('/reviews', async(req, res)=>{
      const reviews = req.body;
      const result = await reviewsCollection.insertOne(reviews);
      res.send(result)
    });

    app.get('/reviews' , async(req, res)=>{
      const review = reviewsCollection.find();
      const result = await review.toArray();
      res.send(result)
    })
    app.delete('/reviews/:id' , async(req , res)=>{
      const id = req.params.id;
      const query = {_id : new ObjectId(id)};
      const result = await reviewsCollection.deleteOne(query);
      res.send(result)

    })





    // Reviews

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
