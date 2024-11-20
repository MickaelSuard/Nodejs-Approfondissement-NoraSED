const request = require('supertest');
const { app } = require('../server'); 
const usersService = require('../api/users/users.service');
const jwt = require('jsonwebtoken');
const config = require('../config');
const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}

connectDB();

const MOCK_DATA_CREATED = {
  name: 'Test User',
  email: 'test@user.com',
  password: 'testuser123',
  role: 'member',
};

describe('tester API users', () => {
  
  beforeEach(() => {
    const token = jwt.sign({ userId: '672a0178fb49b921d55e4e96', role: 'admin' }, config.secretJwtToken, {
      expiresIn: '3d',
    });
  });

  test('[Users] Create User', async () => {!
    console.log('Token:', token);
    const res = await request(app)
      .post('/api/users')
      .send(MOCK_DATA_CREATED)
      .set('x-access-token', token);
    console.log('Create User response status:', res.status);
    console.log('Create User response body:', res.body);
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(MOCK_DATA_CREATED.name);
  });

  test('[Users] Get All', async () => {
    console.log('Etape 1 > Token:', token);
    const res = await request(app)
      .get('/api/users')
      .set('x-access-token', token);
    console.log('Get All response status:', res.status);
    console.log('Get All response body:', res.body);
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('Est-ce userService.getAll', async () => {
    console.log('Token:', token);
    const spy = jest
      .spyOn(usersService, 'getAll')
      .mockImplementation(() => 'test');
    const res = await request(app)
      .get('/api/users')
      .set('x-access-token', token);
    console.log('Get All (spy) response status:', res.status);
    console.log('Get All (spy) response body:', res.body);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveReturnedWith('test');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

});