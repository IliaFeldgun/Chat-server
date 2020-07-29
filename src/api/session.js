import session from 'express-session'

const COOKIE_SECRET = process.env.COOKIE_SECRET

const sessionConfig = session({
    store: "addStore", // Connect to MySQL
    secret: COOKIE_SECRET,
    cookie: {
        signed: true,
        httpOnly: true,
        maxAge: 86400 * 1000, // 1 Day
        path: "/api",
        secure: false
    },
    name: "chat.sid",
    resave: false,
    unset: "destroy",
    saveUninitialized: false
})

export default sessionConfig