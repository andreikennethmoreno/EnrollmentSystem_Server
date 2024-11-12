import { query } from '../config/dbConfig.js';
import Student from '../models/studentModel.js';

export class StudentRepository {
  async createStudent(studentData) {
    const { name, email, age } = studentData;
    const result = await query(
      'INSERT INTO students (name, email, age) VALUES ($1, $2, $3) RETURNING *',
      [name, email, age]
    );
    const student = Student.fromDatabase(result.rows[0]);

    // If courseIds are provided, associate courses with the student
    if (studentData.courseIds) {
      for (const courseId of studentData.courseIds) {
        await query(
          'INSERT INTO student_courses (student_id, course_id) VALUES ($1, $2)',
          [student.id, courseId]
        );
      }
    }

    return student;
  }

  async getAllStudents() {
    const result = await query('SELECT * FROM students');
    return result.rows.map(row => Student.fromDatabase(row));
  }

  async getStudentById(id) {
    const result = await query('SELECT * FROM students WHERE id = $1', [id]);
    if (result.rows.length === 0) return null;

    const student = Student.fromDatabase(result.rows[0]);

    // Fetch the associated courses
    student.courseIds = await Student.fetchCourses(id);

    return student;
  }

  async updateStudent(id, studentData) {
    const { name, email, age, courseIds } = studentData;
    const result = await query(
      'UPDATE students SET name = $1, email = $2, age = $3 WHERE id = $4 RETURNING *',
      [name, email, age, id]
    );
    const student = Student.fromDatabase(result.rows[0]);

    // Update associated courses
    if (courseIds) {
      // Remove existing course associations
      await query('DELETE FROM student_courses WHERE student_id = $1', [id]);

      // Add new courses
      for (const courseId of courseIds) {
        await query(
          'INSERT INTO student_courses (student_id, course_id) VALUES ($1, $2)',
          [id, courseId]
        );
      }
    }

    return student;
  }

  async deleteStudent(id) {
    // Remove associated courses first
    await query('DELETE FROM student_courses WHERE student_id = $1', [id]);

    const result = await query('DELETE FROM students WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return null;
    return Student.fromDatabase(result.rows[0]);
  }
}

