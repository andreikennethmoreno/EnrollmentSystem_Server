// // __tests__/classSectionRoutes.test.js
// import request from 'supertest';
// import app from '../src/app';


// describe('Class Section Routes', () => {

//   let createdClassSectionId;

//   it('should create a new class section', async () => {
//     const res = await request(app)
//       .post('/api/class-sections')
//       .send({
//         year: 2024,
//         section: 'A',
//         course_ids: [1, 2],
//       });
    
//     expect(res.status).toBe(201);
//     expect(res.body).toHaveProperty('id');
//     createdClassSectionId = res.body.id;
//   });

//   it('should get all class sections', async () => {
//     const res = await request(app).get('/api/class-sections');
//     expect(res.status).toBe(200);
//     expect(Array.isArray(res.body)).toBe(true);
//   });

//   it('should get a class section by ID', async () => {
//     const res = await request(app).get(`/api/class-sections/${createdClassSectionId}`);
//     expect(res.status).toBe(200);
//     expect(res.body.id).toBe(createdClassSectionId);
//   });

//   it('should update a class section by ID', async () => {
//     const res = await request(app)
//       .put(`/api/class-sections/${createdClassSectionId}`)
//       .send({ year: 2025, section: 'B' });

//     expect(res.status).toBe(200);
//     expect(res.body.year).toBe(2025);
//   });

//   it('should delete a class section by ID', async () => {
//     const res = await request(app).delete(`/api/class-sections/${createdClassSectionId}`);
//     expect(res.status).toBe(200);
//     expect(res.body).toHaveProperty('message', 'Class Section deleted');
//   });

// });
