const express = require('express')
const axios = require('axios')
const dotenv = require('dotenv')
const cors = require('cors')
const serverless = require('serverless-http')

dotenv.config()
const app = express()
const router = express.Router()

app.use(cors())

let config = {
	method: 'get',
	url: 'https://api.twitter.com/2/tweets/search/recent?query=frozen_custard',
	headers: {
		Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
	},
}

router.get('/', (req, res) => {
	axios(config)
		.then(response => {
			res.json({ data: response.data })
		})
		.catch(error => console.log(error.message))
})

app.use('/.netlify/functions/app', router)

module.exports.handler = serverless(app)
