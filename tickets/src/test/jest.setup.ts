import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';
import jwt from 'jsonwebtoken';

declare global {
    var signin: () => string[];
}

let mongo: any;
beforeAll(async () => {
    process.env.JWT_KEY = 'asdasdafssaf';
    mongo = await MongoMemoryServer.create();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    if (mongo) {
        await mongo.stop();
    }
    await mongoose.connection.close();
});

global.signin = () => {
    /*const email = 'test@test.com';
    const password = 'password';

    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email, password
        })
        .expect(201)

    const cookie = response.get('Set-Cookie');
    return cookie;
    */

    // build a jwt payload {id, email}
    const payload = {
        id: '1lk24j124l',
        email: 'test@test.com'
    }

    // create the JWT!  
    const token = jwt.sign(payload, process.env.JWT_KEY!);

    // build session Object { jwt: my_jwt}
    const session = { jwt: token};

    //turn that session into JSON
    const sessionJSON = JSON.stringify(session);

    // take json and encode it as base64
    const base64 = Buffer.from(sessionJSON).toString('base64');

    // return a string thats the cookie with the encoded data
    return [`session=${base64}`];

};
