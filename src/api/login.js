import express from 'express'
import Validator from "validator"

const router = express.Router()

router.post('/', async (req, res, next) => {
    const userName = req.body.userName
    
    if (!Validator.isAlphanumeric(userName)) {
        res.status(400).send("Player name invalid")
    }

    req.session.userName = userName
    res.status(200).send(userName)
})