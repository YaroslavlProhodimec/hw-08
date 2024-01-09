// @ts-ignore
import {blogsTestManager} from "./blogsTestManager";
// @ts-ignore
import request from "supertest";
import {app} from "../src/settings";
import {HTTP_STATUSES} from "../src/utils/common";

describe('test for /auth', () => {
    beforeAll(async () => {
        await request(app).delete('/testing/all-data')
    })

    it('should return 200 and empty array', async () => {
     const user =  await request(app)
            .get('/users')
            .send({
                "login": "len",
                "password": "string",
                "email": "yar.muratof@gmail.com"
            })
            .expect(HTTP_STATUSES.CREATED_201, {
                "id": expect.any(String),
                "login": "len",
                "email": "yar.murat@gmail.com",
                "createdAt": expect.any(String),

            })
        console.log(user,'user')
        const login =  await request(app)
            .post('/auth/login')
            .send({
                "loginOrEmail": "len",
                "password": "string",
            })
            .expect(HTTP_STATUSES.OK_200, {
                "accessToken": expect.any(String)
            })
        console.log(login.body,'login.body')
        console.log(login,'login')
    });



    afterAll(done => {
        done()
    })
})
