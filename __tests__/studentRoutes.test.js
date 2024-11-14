// __tests__/studentRoutes.test.js
import request from 'supertest';
import app from '../src/app';

describe('Student Routes', () => {

  let createdStudentId;

  it('should create a new student', async () => {
    const res = await request(app)
      .post('/api/students')
      .send({ name: 'John Doe', age: 22 , email: "john@example.com"});
    
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    createdStudentId = res.body.id;
  });

  it('should get all students', async () => {
    const res = await request(app).get('/api/students');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get a student by ID', async () => {
    const res = await request(app).get(`/api/students/${createdStudentId}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(createdStudentId);
  });

  it('should update a student by ID', async () => {
    const res = await request(app)
      .put(`/api/students/${createdStudentId}`)
      .send({ name: 'John Smith' });

    expect(res.status).toBe(200);
    expect(res.body.name).toBe('John Smith');
  });

  it('should delete a student by ID', async () => {
    const res = await request(app).delete(`/api/students/${createdStudentId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Student deleted');
  });

});
