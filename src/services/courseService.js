import CourseRepository from '../repositories/courseRepository.js';

export class CourseService {
  async createCourse(courseData) {
    // Create the course without handling subjects
    const course = await CourseRepository.createCourse(courseData);
    return course;
  }

  async getAllCourses() {
    // Get all courses without concern for subjects
    return await CourseRepository.getAllCourses();
  }

  async getCourseById(id) {
    // Get a course by ID without handling subjects
    return await CourseRepository.getCourseById(id);
  }

  async updateCourse(id, courseData) {
    // Update the course without handling subjects
    const course = await CourseRepository.updateCourse(id, courseData);
    return course;
  }

  async deleteCourse(id) {
    // Delete the course without concern for subjects
    const course = await CourseRepository.deleteCourse(id);
    return course;
  }
}
