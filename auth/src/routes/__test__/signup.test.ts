import { response } from 'express';
import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: '123password321' })
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .expect(201);
});

it('returns a 400 with an invalid email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({ email: 'test.com', password: 'dsadssdas23312' })
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .expect(400);
});

it('returns a 400 with an invalid password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'dsa' })
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .expect(400);
});

it('returns a 400 with missing email and password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ password: 'sdadswrrq2' })
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .expect(400);

  return request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com' })
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .expect(400);
});

it('return a 400 on duplicate email signup', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: '123password321' })
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .expect(201);

  return request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'dafsafas541123' })
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .expect(400);
});

it('sets a cookie after successful signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: '123password321' })
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});
