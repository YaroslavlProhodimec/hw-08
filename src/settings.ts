import express, {Request, Response} from "express";
import cookieParser from "cookie-parser";
import {blogRoute} from "./routes/blog-route";
import {postRoute} from "./routes/post-route";
import {testingRouter} from "./testing-router";
import {authRouter} from "./routes/auth-route";
import {usersRouter} from "./routes/users-route";
import {commentsRoute} from "./routes/comments-route";
import {emailRouter} from "./routes/email-router";
import {port, runDb} from "./index";
export const settings = {
JWT_SECRET:
    // process.env.JWT_SECRET ||
    '123'
}

export const app = express()
app.use('/blogs', blogRoute)
app.use('/posts', postRoute)
app.use('/testing', testingRouter)
app.use('/auth', authRouter)
app.use('/users', usersRouter)
app.use('/comments', commentsRoute)
app.use('/', emailRouter)

app.use(express.json())
app.use(cookieParser());
