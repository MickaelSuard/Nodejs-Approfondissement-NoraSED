const request = require('supertest');
const { app } = require('../server');
const mongoose = require('mongoose');
const mockingoose = require('mockingoose');
const Article = require('../api/articles/articles.schema');
const jwt = require('jsonwebtoken');
const config = require('../config');

async function connectDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}

connectDB();

describe('API /articles', () => {
    const USER = { userId: "60d5f4ee2f8fb814c8b4b484", role: "admin" }
    beforeEach(() => {
        mockingoose.resetAll();
    });

    it('should create a new article', async () => {
        const mockArticle = {
            _id: mongoose.Types.ObjectId(),
            title: 'Test Article',
            content: 'This is a test article.',
            user: '672a0178fb49b921d55e4e96',
        };

        mockingoose(Article).toReturn(mockArticle, 'save');

        console.log('Sending request to create article:', mockArticle);
        const token = jwt.sign(USER, config.secretJwtToken);
        console.log('Token:', token);
        const response = await request(app)
            .post('/api/articles')
            .send(mockArticle)
            .set('x-access-token', token);

        console.log('create article status:', response.status);
        console.log('create article body:', response.body);

        expect(response.status).toBe(201);
        expect(response.body.title).toBe(mockArticle.title);
        expect(response.body.content).toBe(mockArticle.content);
    });

    // it('should update an existing article', async () => {
    //     const mockArticle = {
    //         _id: '672cca976df9cb188f4df9ef',
    //         title: 'Updated Article',
    //         content: 'This is an updated test article.',
    //         user: '672a0178fb49b921d55e4e96'
    //     };

    //     mockingoose(Article).toReturn(mockArticle, 'findOneAndUpdate');
    //     const token = jwt.sign(USER, config.secretJwtToken);

    //     console.log('Sending request to update article:', mockArticle);
    //     console.log('Token:', token);
    //     const response = await request(app)
    //         .put(`/api/articles/${mockArticle._id}`)
    //         .set('x-access-token', token)
    //         .send(mockArticle);

    //     console.log('update article status:', response.status);
    //     console.log('update article body:', response.body);

    //     expect(response.status).toBe(200);
    //     expect(response.body.title).toBe(mockArticle.title);
    //     expect(response.body.content).toBe(mockArticle.content);
    // });

    // it('should delete an article', async () => {
    //     const mockArticle = {
    //         _id: '672cca976df9cb188f4df9ef',
    //     };

    //     mockingoose(Article).toReturn(mockArticle, 'findOneAndDelete');

    //     console.log('Sending request to delete article:', mockArticle._id);
        
    //     const token = jwt.sign(USER, config.secretJwtToken);
    //     console.log('Token:', token);
    //     const response = await request(app)
    //         .delete(`/api/articles/${mockArticle._id}`)
    //         .set('x-access-token', token)
    //         .send(mockArticle);

    //     console.log('delete article status:', response.status);

    //     expect(response.status).toBe(204);
    // });
});