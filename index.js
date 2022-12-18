const express = require("express");
const cors = require("cors");
const pool = require("./config");
const pool2 = require("./config2");
const app = express();
 
app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
    })
);
app.post('/login', (req, res) => {
 const username = req.body.username;
 const password = req.body.password;
 
 pool.query(
     "SELECT * FROM users WHERE username = ? AND password = ?",
     [username, password],
     (err, result)=> {
         if (err) {
             res.send({err: err});
         }
 
         if (result.length > 0) {
             res.send( result);
             }else({message: "Wrong username/password comination!"});
         }
     
 );
});
 


/*-------------------------------------------------------------------------------------------------------------------*/




app.use((err, req, res, next) => {
  console.log(err.stack);
  console.log(err.name);
  console.log(err.code);
  res.status(500).json({
    message: "Something went rely wrong",
  });
});
app.use(cors());

app.get("/flatdata", (req, resp) => {
  pool2.query("select * from flatbased", (err, result) => {
    if (err) { resp.send("error in api") }
    else { resp.send(result) }
  })
});

const PORT = process.env.PORT || 8000;

app.listen(PORT,()=>console.log(`Server is running succesfully on PORT ${PORT}`))