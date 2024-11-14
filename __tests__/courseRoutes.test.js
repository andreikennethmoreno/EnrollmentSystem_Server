// // __tests__/courseRoutes.test.js
// import request from 'supertest';
// import app from '../src/app';

// describe('Course Routes', () => {

//   let createdCourseId;

//   it('should create a new course', async () => {
//     const res = await request(app)
//       .post('/api/courses')
//       .send({ name: 'Math 101', description: 'Introductory Math' , credits: 69});
    
//     expect(res.status).toBe(201);
//     expect(res.body).toHaveProperty('id');
//     createdCourseId = res.body.id;
//   });

//   it('should get all courses', async () => {
//     const res = await request(app).get('/api/courses');
//     expect(res.status).toBe(200);
//     expect(Array.isArray(res.body)).toBe(true);
//   });

//   it('should get a course by ID', async () => {
//     const res = await request(app).get(`/api/courses/${createdCourseId}`);
//     expect(res.status).toBe(200);
//     expect(res.body.id).toBe(createdCourseId);
//   });

//   it('should update a course by ID', async () => {
//     const res = await request(app)
//       .put(`/api/courses/${createdCourseId}`)
//       .send({ name: 'Math 102' });

//     expect(res.status).toBe(200);
//     expect(res.body.name).toBe('Math 102');
//   });

//   it('should delete a course by ID', async () => {
//     const res = await request(app).delete(`/api/courses/${createdCourseId}`);
//     expect(res.status).toBe(200);
//     expect(res.body).toHaveProperty('message', 'Course deleted');
//   });

// });
