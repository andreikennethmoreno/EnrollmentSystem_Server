// src/controllers/studentController.js
import { StudentService } from '../services/studentService.js';
import { handleResponse } from '../utils/handleResponse.js';

const studentService = new StudentService();

export const getAllStudents = async (req, res) => {
  const students = await studentService.getAllStudents();
  handleResponse(res, 200, students);
};

export const getStudentById = async (req, res) => {
  const student = await studentService.getStudentById(req.params.id);
  handleResponse(res, 200, student);
};

export const createStudent = async (req, res) => {
  const newStudent = await studentService.createStudent(req.body);
  handleResponse(res, 201, newStudent);
};

export const updateStudent = async (req, res) => {
  const updatedStudent = await studentService.updateStudent(req.params.id, req.body);
  handleResponse(res, 200, updatedStudent);
};

export const deleteStudent = async (req, res) => {
  const deletedStudent = await studentService.deleteStudent(req.params.id);
  handleResponse(res, 200, deletedStudent);
};
