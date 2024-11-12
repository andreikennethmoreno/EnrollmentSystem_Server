import CourseRepository from '../repositories/courseRepository.js';
import CourseSubjectRepository from '../repositories/courseSubjectRepository.js';

export class CourseService {
  async createCourse(courseData) {
    const course = await CourseRepository.createCourse(courseData);

    // Add subjects to course if provided
    if (courseData.subjectIds) {
      for (const subjectId of courseData.subjectIds) {
        await CourseSubjectRepository.addSubjectToCourse(course.id, subjectId);
      }
    }

    return course;
  }

  async getAllCourses() {
    return await CourseRepository.getAllCourses();
  }

  async getCourseById(id) {
    return await CourseRepository.getCourseById(id);
  }

  async updateCourse(id, courseData) {
    const course = await CourseRepository.updateCourse(id, courseData);

    // Remove previous subjects and add new ones
    await CourseSubjectRepository.removeSubjectsFromCourse(course.id);
    if (courseData.subjectIds) {
      for (const subjectId of courseData.subjectIds) {
        await CourseSubjectRepository.addSubjectToCourse(course.id, subjectId);
      }
    }

    return course;
  }

  async deleteCourse(id) {
    const course = await CourseRepository.deleteCourse(id);
    return course;
  }
}

