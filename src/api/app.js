import express from 'express'
import httpLogger from 'morgan'

import session from './session'
import login from './login'
const app = express()

app.use(cors({origin: process.env.CLIENT_ORIGIN, credentials: true}))
app.use(httpLogger('dev'))
app.use(express.json)
app.use(session)

app.use('/api/login', login)

export default app
