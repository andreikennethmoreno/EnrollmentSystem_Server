// src/services/studentService.js
import { StudentRepository } from '../repositories/studentRepository.js';

export class StudentService {
  constructor() {
    this.studentRepository = new StudentRepository();
  }

  async getAllStudents() {
    return await this.studentRepository.getAllStudents();
  }

  async getStudentById(id) {
    return await this.studentRepository.getStudentById(id);
  }

  async createStudent(studentData) {
    return await this.studentRepository.createStudent(studentData);
  }

  async updateStudent(id, studentData) {
    return await this.studentRepository.updateStudent(id, studentData);
  }

  async deleteStudent(id) {
    return await this.studentRepository.deleteStudent(id);
  }
}
