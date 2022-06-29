import express, { Express, Request, Response } from 'express'
import axios from 'axios'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()
const app: Express = express()

app.use(cors())

let config = {
	method: 'get',
	url: 'https://api.twitter.com/2/tweets/search/recent?query=frozen_custard',
	headers: {
		Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
	},
}

app.get('/', (req: Request, res: Response) => {
	axios(config)
		.then(response => {
			res.json({ data: response.data })
		})
		.catch(error => console.log(error.message))
})

app.listen(process.env.PORT || 3001, () => {
	console.log(
		`[server] : Server is running at http://localhost:${
			process.env.PORT || 3001
		}`,
	)
})
