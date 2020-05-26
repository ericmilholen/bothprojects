
/**
 * %%%%%%%%%%%%%%%%%%%% *
 * %%% SERVER INDEX %%% *
 * %%%%%%%%%%%%%%%%%%%% *
 * 
*/
/*** [REQUIRE] ***/
const bodyParser = require("body-parser")
const cors = require("cors")
const express = require("express")

/*** [REQUIRE] Personal + ENV ***/
const events = require('./routes/api/events')
const posts = require('./routes/api/posts')
const tasks = require('./routes/api/tasks')
const users = require('./routes/api/users')
require('dotenv').config()

/*** [INIT] ***/
const app = express()

/*** [USE] ***/
app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

/*** [INIT USE] For "this" route use "this" ***/
app.use('/api/events', events)
app.use('/api/posts', posts)
app.use('/api/tasks', tasks)
app.use('/api/users', users)

/*** [PORT + LISTEN] ***/
const port = process.env.PORT || 5000

app.listen(port, function () {
	console.log(`Server Running on Port: ${port}`)
})