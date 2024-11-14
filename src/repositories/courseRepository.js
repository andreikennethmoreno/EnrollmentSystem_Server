import { query } from '../config/dbConfig.js';
import Course from '../models/courseModel.js';

class CourseRepository {
  async createCourse(courseData) {
    const { name, description, credits } = courseData;

    // Create a course instance to leverage model validation
    const course = new Course(null, name, description, credits);
    course.validate(); // Validate course data before insertion
    
    // Insert course into the 'courses' table
    const result = await query(
      'INSERT INTO courses (name, description, credits) VALUES ($1, $2, $3) RETURNING *',
      [course.name, course.description, course.credits]
    );
    const newCourse = Course.fromDatabase(result.rows[0]);

    return newCourse; // Return the course instance
  }

  async getAllCourses() {
    // Get all courses from the database
    const result = await query('SELECT * FROM courses');
    
    // Map courses to model instances
    const courses = result.rows.map(courseRow => Course.fromDatabase(courseRow));
  
    return courses;
  }

  async getCourseById(id) {
    const result = await query('SELECT * FROM courses WHERE id = $1', [id]);
    if (result.rows.length === 0) return null;
  
    const course = Course.fromDatabase(result.rows[0]);
  
    return course;
  }

  async updateCourse(id, courseData) {
    const { name, description, credits } = courseData;

    const course = new Course(id, name, description, credits);
    course.validate();

    // Update course data in the 'courses' table
    const result = await query(
      'UPDATE courses SET name = $1, description = $2, credits = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *',
      [course.name, course.description, course.credits, course.id]
    );
    const updatedCourse = Course.fromDatabase(result.rows[0]);

    return updatedCourse;
  }

  async deleteCourse(id) {
    // Delete the course itself
    const result = await query('DELETE FROM courses WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return null;

    return Course.fromDatabase(result.rows[0]);
  }
}

export default new CourseRepository();
