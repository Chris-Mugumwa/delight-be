const express = require('express')
const axios = require('axios')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()
const app = express()
app.use(cors())

let config = {
	method: 'get',
	url: 'https://api.twitter.com/2/tweets/search/recent?query=frozen_custard',
	headers: {
		Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
	},
}

app.get('/', (req, res) => {
	axios(config)
		.then(response => {
			res.json({ data: response.data })
		})
		.catch(error => console.log(error.message))
})

app.listen(5000, () => {
	console.log('Running on port 5000.')
})

module.exports = app
