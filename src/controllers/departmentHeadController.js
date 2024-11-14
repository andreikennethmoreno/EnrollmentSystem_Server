// src/controllers/departmentHeadController.js
import { DepartmentHeadService } from '../services/departmentHeadService.js';
import { handleResponse } from '../utils/handleResponse.js';

const departmentHeadService = new DepartmentHeadService();

export const getAllDepartmentHeads = async (req, res) => {
  try {
    const departmentHeads = await departmentHeadService.getAllDepartmentHeads();
    return handleResponse(res, 200, departmentHeads);
  } catch (error) {
    return handleResponse(res, 500, { error: 'Error Fetching Department Heads' });
  }
};

export const getDepartmentHeadById = async (req, res) => {
  try {
    const departmentHead = await departmentHeadService.getDepartmentHeadById(req.params.id);
    if (!departmentHead) {
      throw new Error('Department Head not found');
    }
    return handleResponse(res, 200, departmentHead);
  } catch (error) {
    return handleResponse(res, 404, { error: error.message });
  }
};

export const createDepartmentHead = async (req, res) => {
  const { first_name, last_name, password } = req.body;

  // Check each field, returning specific errors as expected
  const requiredFields = { first_name, last_name, password };
  for (const [field, value] of Object.entries(requiredFields)) {
    if (!value) {
      return handleResponse(res, 400, { error: `${field.replace('_', ' ')} is required` });
    }
  }

  try {
    const newDepartmentHead = await departmentHeadService.createDepartmentHead(req.body);  // Errors will propagate
    return handleResponse(res, 201, newDepartmentHead);
  } catch (error) {
    return handleResponse(res, 500, { error: 'Error Creating Department Head' });
  }
};

export const updateDepartmentHead = async (req, res) => {
  try {
    const updatedDepartmentHead = await departmentHeadService.updateDepartmentHead(req.params.id, req.body);
    return handleResponse(res, 200, updatedDepartmentHead);
  } catch (error) {
    return handleResponse(res, 404, { error: 'Department Head not found' });
  }
};

export const deleteDepartmentHead = async (req, res) => {
  try {
    const deletedDepartmentHead = await departmentHeadService.deleteDepartmentHead(req.params.id);
    return handleResponse(res, 200, deletedDepartmentHead);  // Respond with the deleted department head details
  } catch (error) {
    return handleResponse(res, 404, { error: 'Department Head not found' });
  }
};