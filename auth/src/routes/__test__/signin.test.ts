import { app } from '../../app';
import request from 'supertest';

it('returns a 400 when an email that does not exist is supplied', async () => {
  return request(app)
    .post('/api/users/signin')
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send({ email: 'khalid.n.', password: 'testing' })
    .expect(400);
});

it('it fails when an incorrect password is supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send({ email: 'test@test.com', password: 'testing' })
    .expect(201);

  return request(app)
    .post('/api/users/signin')
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send({ email: 'test@test.com', password: 'testing31' })
    .expect(400);
});

it('it responds with a cookie when giving correct credentials', async () => {
  await request(app)
    .post('/api/users/signup')
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send({ email: 'test@test.com', password: 'testing' })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signin')
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send({ email: 'test@test.com', password: 'testing' })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});
