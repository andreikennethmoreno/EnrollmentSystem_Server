import { ClassSectionService } from '../services/classSectionService.js';
import { handleResponse } from '../utils/handleResponse.js';

const classSectionService = new ClassSectionService();

// Create class section
export const createClassSection = async (req, res) => {
  try {
    const newClassSection = await classSectionService.createClassSection(req.body);
    handleResponse(res, 201, newClassSection); // 201 Created
  } catch (error) {
    handleResponse(res, 500, { message: 'Failed to create class section' });
  }
};

// Get all class sections
export const getAllClassSections = async (req, res) => {
  try {
    const classSections = await classSectionService.getAllClassSections();
    handleResponse(res, 200, classSections); // 200 OK
  } catch (error) {
    handleResponse(res, 500, { message: 'Failed to retrieve class sections' });
  }
};

// Get class section by ID
export const getClassSectionById = async (req, res) => {
  const { id } = req.params;
  try {
    const classSection = await classSectionService.getClassSectionById(id);
    if (classSection) {
      handleResponse(res, 200, classSection); // 200 OK
    } else {
      handleResponse(res, 404, { message: 'Class section not found' }); // 404 Not Found
    }
  } catch (error) {
    handleResponse(res, 500, { message: 'Failed to retrieve class section' });
  }
};

// Update class section
export const updateClassSection = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedClassSection = await classSectionService.updateClassSection(id, req.body);
    if (updatedClassSection) {
      handleResponse(res, 200, updatedClassSection); // 200 OK
    } else {
      handleResponse(res, 404, { message: 'Class section not found' }); // 404 Not Found
    }
  } catch (error) {
    handleResponse(res, 500, { message: 'Failed to update class section' });
  }
};

// Delete class section
export const deleteClassSection = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedClassSection = await classSectionService.deleteClassSection(id);
    if (deletedClassSection) {
      handleResponse(res, 200, { message: `Class section ${id} deleted` });
    } else {
      handleResponse(res, 404, { message: 'Class section not found' });
    }
  } catch (error) {
    handleResponse(res, 500, { message: 'Failed to delete class section' });
  }
};
