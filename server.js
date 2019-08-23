const express = require("express");
const sql = require("sqlite3").verbose();
const cors = require("cors");

const app = express();

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

app.use(cors());

// open db connection
let db = new sql.Database("./messages.db", (err) => {
   if (err) {
      throw err;
   }
   let s = `CREATE TABLE IF NOT EXISTS messages (
               name TEXT NOT NULL,
               number INTEGER NOT NULL,
               email TEXT NOT NULL,
               msg TEXT NOT NULL,
               datetime TEXT NOT NULL
            );`;
   db.run(s, [], (err) => {
      if (err) {
         throw err;
      }
   })
});


// @route   POST /new-message
// @desc    post new message
app.post("/new-message", jsonParser, (req, res) => {
   let name = req.body.name;
   let number = req.body.number;
   let email = req.body.email;
   let msg = req.body.msg;
      let q = `INSERT INTO messages (name, number, email, msg, datetime) 
               VALUES 
               ("${name}", "${number}", "${email}", "${msg}", datetime('now', 'localtime'));`;
      // add to db
      db.run(q, (err) => {
         if (err) {
            throw err;
         }
         // update message list
         res.json({msg: "updated"});
      })
});


// @route   GET /get-messages
// @desc    List messages
app.get("/get-messages", (req, res) => {
   // query
   let q  = "select * from messages order by datetime DESC;";
   
   // get messages from db
   db.all(q, (err, rows) => {
      if (err) {
         throw err;
      }
      let messages = [];
      rows.forEach((row) => {
         messages.push({ 
            name: row.name, 
            number: row.number, 
            email: row.email, 
            msg: row.msg, 
            datetime: row.datetime
         })
      })
      // send json
      res.json({ messages: messages })
   })
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('listening on 5000')
})
