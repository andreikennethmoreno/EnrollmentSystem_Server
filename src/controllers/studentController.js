import { StudentService } from '../services/studentService.js';
import { handleResponse } from '../utils/handleResponse.js';

const studentService = new StudentService();

export const getAllStudents = async (req, res) => {
  try {
    const students = await studentService.getAllStudents();
    return handleResponse(res, 200, students);
  } catch (error) {
    return handleResponse(res, 500, { error: 'Error Fetching Students' });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const student = await studentService.getStudentById(req.params.id);
    if (!student) {
      throw new Error('Student not found');
    }
    return handleResponse(res, 200, student);
  } catch (error) {
    return handleResponse(res, 404, { error: error.message});
  }
};


// src/controllers/studentController.js
export const createStudent = async (req, res) => {
  const { first_name, last_name, contact_number, address, date_of_birth, student_type, standing_year, semester } = req.body;

  // Check each field, returning specific errors as expected
  const requiredFields = { first_name, last_name, contact_number, address, date_of_birth, student_type, standing_year, semester };
  for (const [field, value] of Object.entries(requiredFields)) {
    if (!value) {
      return handleResponse(res, 400, { error: `${field.replace('_', ' ')} is required` });
    }
  }

  const newStudent = await studentService.createStudent(req.body);  // No try-catch, errors will propagate
  return handleResponse(res, 201, newStudent);
};


// src/controllers/studentController.js
export const updateStudent = async (req, res) => {
  try {
    const updatedStudent = await studentService.updateStudent(req.params.id, req.body);
    return handleResponse(res, 200, updatedStudent);
  } catch (error) {
    return handleResponse(res, 404, { error: 'Student not found' });
  }
};


// src/controllers/studentController.js
export const deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await studentService.deleteStudent(req.params.id);
  
    return handleResponse(res, 200, deletedStudent);  // Respond with the deleted student details
  } catch (error) {
    return handleResponse(res, 404, { error: 'Student not found' });
  }
};
