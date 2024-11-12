// src/controllers/subjectController.js
import { SubjectService } from '../services/subjectService.js';
import { handleResponse } from '../utils/handleResponse.js';

const subjectService = new SubjectService();

export const createSubject = async (req, res) => {
  try {
    const newSubject = await subjectService.createSubject(req.body);
    handleResponse(res, 201, newSubject); // 201 Created
  } catch (error) {
    handleResponse(res, 500, { message: 'Failed to create subject' });
  }
};

export const getAllSubjects = async (req, res) => {
  try {
    const subjects = await subjectService.getAllSubjects();
    handleResponse(res, 200, subjects); // 200 OK
  } catch (error) {
    handleResponse(res, 500, { message: 'Failed to retrieve subjects' });
  }
};

export const getSubjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const subject = await subjectService.getSubjectById(id);
    if (subject) {
      handleResponse(res, 200, subject); // 200 OK
    } else {
      handleResponse(res, 404, { message: 'Subject not found' }); // 404 Not Found
    }
  } catch (error) {
    handleResponse(res, 500, { message: 'Failed to retrieve subject' });
  }
};

export const updateSubject = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedSubject = await subjectService.updateSubject(id, req.body);
    if (updatedSubject) {
      handleResponse(res, 200, updatedSubject); // 200 OK
    } else {
      handleResponse(res, 404, { message: 'Subject not found' }); // 404 Not Found
    }
  } catch (error) {
    handleResponse(res, 500, { message: 'Failed to update subject' });
  }
};

export const deleteSubject = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedId = await subjectService.deleteSubject(id);
    if (deletedId) {
      handleResponse(res, 200, { message: `Subject ${id} deleted` });
    } else {
      handleResponse(res, 404, { message: 'Subject not found' });
    }
  } catch (error) {
    handleResponse(res, 500, { message: 'Failed to delete subject' });
  }
};
