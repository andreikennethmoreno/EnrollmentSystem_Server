import { CourseService } from '../services/courseService.js';
import { handleResponse } from '../utils/handleResponse.js';

const courseService = new CourseService();

export const createCourse = async (req, res) => {
  try {
    const newCourse = await courseService.createCourse(req.body);
    handleResponse(res, 201, newCourse); // 201 Created
  } catch (error) {
    handleResponse(res, 500, { message: 'Failed to create course' });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await courseService.getAllCourses();
    handleResponse(res, 200, courses); // 200 OK
  } catch (error) {
    handleResponse(res, 500, { message: 'Failed to retrieve courses' });
  }
};

export const getCourseById = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await courseService.getCourseById(id);
    if (course) {
      handleResponse(res, 200, course); // 200 OK
    } else {
      handleResponse(res, 404, { message: 'Course not found' }); // 404 Not Found
    }
  } catch (error) {
    handleResponse(res, 500, { message: 'Failed to retrieve course' });
  }
};

export const updateCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedCourse = await courseService.updateCourse(id, req.body);
    if (updatedCourse) {
      handleResponse(res, 200, updatedCourse); // 200 OK
    } else {
      handleResponse(res, 404, { message: 'Course not found' }); // 404 Not Found
    }
  } catch (error) {
    handleResponse(res, 500, { message: 'Failed to update course' });
  }
};

export const deleteCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCourse = await courseService.deleteCourse(id);
    if (deletedCourse) {
      handleResponse(res, 200, { message: `Course ${id} deleted` });
    } else {
      handleResponse(res, 404, { message: 'Course not found' });
    }
  } catch (error) {
    handleResponse(res, 500, { message: 'Failed to delete course' });
  }
};
