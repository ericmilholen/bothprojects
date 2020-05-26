/**
 * %%%%%%%%%%%%%%%%%%% *
 * %%% TASKS ROUTE %%% *
 * %%%%%%%%%%%%%%%%%%% *
 * ordered by "CRRUD" then alphabetical
 * for other path
*/
/*** [REQUIRE] ***/
const express = require('express')
const mongodb = require('mongodb')

/*** [REQUIRE] Personal ***/
require('dotenv').config()

/*** [INIT] ***/
const router = express.Router()

/*** [CREATE] Add Task ***/
router.post('/create', async (req, res) => {
	// [INIT] // Get DB Collection //
	const tasks = await loadTasksCollection()

	// [INSERT] Into Collection //
	await tasks.insertOne({
		email: req.body.email,
		title: req.body.title,
      type: req.body.type,
      timeDue: req.body.timeDue,
      dateDue: req.body.dateDue,
      description: req.body.description,
		createdAt: new Date()
	})

	// Set Status // [RES SEND] //
	res.status(201).send()
})

/*** [READ ALL] Get Tasks ***/
router.get('/read-all/:email', async (req, res) => {
	// [INIT] // Get DB Collection // Retrieve From Collection //
	const tasks = await loadTasksCollection()
	let retrievedData = await tasks.find(
		{ email: req.params.email }
	).toArray()

	// [RES SEND] //
	res.send(retrievedData)
})

/*** [READ] Get Single Tasks ***/
router.get('/read/:id', async (req, res) => {
	// [INIT] // Get DB Collection // Retrieve From Collection //
	const tasks = await loadTasksCollection()
	
	let retrievedData = await tasks.find(
		{ _id: new mongodb.ObjectID(req.params.id) }
	).toArray()

	// [RES SEND] //
	res.send(retrievedData)
})

/*** [UPDATE] Add Task ***/
router.post('/update/:id', async (req, res) => {
	// [INIT] // Get DB Collection //
	const tasks = await loadTasksCollection()

	tasks.findOneAndUpdate(
		{ _id: new mongodb.ObjectID(req.params.id) },
		{ $set: {
			title: req.body.title,
			type: req.body.type,
			timeDue: req.body.timeDue,
			dateDue: req.body.dateDue,
			description: req.body.description,
		}},
		{ upsert: true }
	)

	// Set Status // [RES SEND] //
	res.status(201).send()
})

/*** [DELETE] Delete Post ***/
router.delete('/delete/:id', async (req, res) => {
	const tasks = await loadTasksCollection()
	
	await tasks.deleteOne(
		{ _id: new mongodb.ObjectID(req.params.id) }
	)

	// Set Status // [RES SEND] //
	res.status(200).send()
})
///////////////// CRRUD DONE /////////////////

/*** [T/F] ***/
router.get('/ownership-validation/:id', async (req, res) => {
	const tasks = await loadTasksCollection()
	
	let retrievedData = await tasks.findOne(
		{
			_id: new mongodb.ObjectID(req.params.id),
			email: req.query.email
		},
	)
	console.log('Email Recieved to Validate Ownership of Task:', req.query.email)

	if (retrievedData) { res.json({ owned: true }).send() }
	else { res.json({ owned: false }).send() }
})

// [F] Tasks Collection in Database //
async function loadTasksCollection() {
	// [INIT] //
	const uri = process.env.MONGO_URI
	const db_name = process.env.DB || 'db_name'
	const c_name = 'tasks'
	
	const client = await mongodb.MongoClient.connect(
		uri,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true
		}
	)

	// [RETURN] //
	return client.db(db_name).collection(c_name)
}

/*** [EXPORT] ***/
module.exports = router