// repositories/studentRepository.js
import { query } from '../config/dbConfig.js';
import Student from '../models/studentModel.js';

export class StudentRepository {
  // Create a new student
  async createStudent(studentData) {
    const {
      first_name, middle_name, last_name, contact_number, address,
      date_of_birth, student_type, standing_year, semester
    } = studentData;

    const result = await query(
      `INSERT INTO students 
        (first_name, middle_name, last_name, contact_number, address, date_of_birth, student_type, standing_year, semester) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
       RETURNING *`,
      [
        first_name, middle_name, last_name, contact_number, address,
        date_of_birth, student_type, standing_year, semester
      ]
    );

    return Student.fromDatabase(result.rows[0]);
  }

  // Update a student's details
  async updateStudent(id, studentData) {
    const {
      first_name, middle_name, last_name, contact_number, address,
      date_of_birth, student_type, standing_year, semester
    } = studentData;

    // Check if the student exists
    const existingStudent = await this.getStudentById(id);
    if (!existingStudent) {
      throw new Error('Student not found');
    }

    const result = await query(
      `UPDATE students SET 
        first_name = $1, middle_name = $2, last_name = $3, 
        contact_number = $4, address = $5, date_of_birth = $6, 
        student_type = $7, standing_year = $8, semester = $9 
       WHERE student_id = $10 RETURNING *`,
      [
        first_name, middle_name, last_name,  contact_number, address,
        date_of_birth, student_type, standing_year, semester, id
      ]
    );
    return Student.fromDatabase(result.rows[0]);
  }

  // Retrieve all students
  async getAllStudents() {
    const result = await query('SELECT * FROM students');
    return result.rows.map(row => Student.fromDatabase(row));
  }

  // Retrieve a student by ID
  async getStudentById(id) {
    const result = await query('SELECT * FROM students WHERE student_id = $1', [id]);
    if (result.rows.length === 0) return null;
    return Student.fromDatabase(result.rows[0]);
  }

  // Delete a student by ID
  async deleteStudent(id) {
    // Check if the student exists before attempting deletion
    const existingStudent = await this.getStudentById(id);
    if (!existingStudent) {
      throw new Error('Student not found');
    }

    const result = await query('DELETE FROM students WHERE student_id = $1 RETURNING *', [id]);
    return Student.fromDatabase(result.rows[0]);
  }
}

export default StudentRepository;
