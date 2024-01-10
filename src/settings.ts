import cookieParser from "cookie-parser";
import express, { NextFunction, Request, Response } from "express";
import { httpMethodsCheckMiddleware } from "./middlewares/httpMethodsCheckMiddleware";
import morgan from "morgan";
import { StatusCodes } from "http-status-codes";
import {blogRoute} from "./routes/blog-route";
import {postRoute} from "./routes/post-route";
import {testingRouter} from "./testing-router";
import {authRouter} from "./routes/auth-route";
import {usersRouter} from "./routes/users-route";
import {commentsRoute} from "./routes/comments-route";
import {emailRouter} from "./routes/email-router";

export const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(httpMethodsCheckMiddleware);
app.use(cookieParser());

app.use('/blogs', blogRoute)
app.use('/posts', postRoute)
app.use('/testing', testingRouter)
app.use('/auth', authRouter)
app.use('/users', usersRouter)
app.use('/comments', commentsRoute)
app.use('/', emailRouter)
app.use(async (req: Request, res: Response, next: NextFunction) => {
    next(StatusCodes.NOT_FOUND);
});
