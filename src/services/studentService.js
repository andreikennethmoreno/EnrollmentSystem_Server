// src/services/studentService.js
import { StudentRepository } from '../repositories/studentRepository.js';

export class StudentService {
  constructor() {
    this.studentRepository = new StudentRepository();
  }

  // Get all students
  async getAllStudents() {
    return await this.studentRepository.getAllStudents();
  }

  // Get a student by ID
  async getStudentById(id) {
    return await this.studentRepository.getStudentById(id);
  }

  // Create a new student
  async createStudent(studentData) {
    return await this.studentRepository.createStudent(studentData);
  }

  // Update an existing student
  async updateStudent(id, studentData) {
    return await this.studentRepository.updateStudent(id, studentData);
  }

  // Delete a student by ID
  async deleteStudent(id) {
    return await this.studentRepository.deleteStudent(id);
  }
}

export default StudentService;
