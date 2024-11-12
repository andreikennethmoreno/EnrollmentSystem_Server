// models/studentModel.js
import { query } from '../config/dbConfig.js';  // Assuming query is a function to run SQL queries

class Student {
  constructor(id, name, email, courseIds) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.courseIds = courseIds || [];
  }

  static fromDatabase(row) {
    return new Student(row.id, row.name, row.email, row.courseIds);
  }

  // Static method to fetch courses for a student
  static async fetchCourses(studentId) {
    const result = await query(
      'SELECT c.id, c.name FROM courses c ' + 
      'JOIN student_courses sc ON c.id = sc.course_id ' +
      'WHERE sc.student_id = $1', [studentId]
    );
    return result.rows.map(row => ({
      id: row.id,
      name: row.name
    }));
  }
}

export default Student;
