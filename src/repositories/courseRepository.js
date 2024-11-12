import { query } from '../config/dbConfig.js';
import Course from '../models/courseModel.js';
import CourseSubject from '../models/courseSubjectModel.js';

class CourseRepository {
  async createCourse(courseData) {
    const { name, description, credits, subjectIds } = courseData;

    // Create a course instance to leverage model validation
    const course = new Course(null, name, description, credits, subjectIds);
    course.validate(); // Validate course data before insertion
    
    // Insert course into the 'courses' table
    const result = await query(
      'INSERT INTO courses (name, description, credits) VALUES ($1, $2, $3) RETURNING *',
      [course.name, course.description, course.credits]
    );
    const newCourse = Course.fromDatabase(result.rows[0]);

    // Insert entries into the junction table for subjects using CourseSubject model
    const courseSubjectPromises = subjectIds.map(subjectId => 
      query(
        'INSERT INTO course_subjects (course_id, subject_id) VALUES ($1, $2)',
        [newCourse.id, subjectId]
      )
    );
    
    // Wait for all subject insertions to complete
    await Promise.all(courseSubjectPromises);

    return newCourse; // Return the course instance
  }

  async getAllCourses() {
    // Get all courses from the database
    const result = await query('SELECT * FROM courses');
    
    // For each course, fetch its associated subjects
    const coursesWithSubjects = await Promise.all(
      result.rows.map(async (courseRow) => {
        const course = Course.fromDatabase(courseRow);
  
        // Fetch subjects associated with the course
        const subjectResult = await query(
          'SELECT subject_id FROM course_subjects WHERE course_id = $1',
          [course.id]
        );
        
        // Add subjectIds to the course object
        course.subjectIds = subjectResult.rows.map(row => row.subject_id);
  
        return course;
      })
    );
  
    return coursesWithSubjects;
  }

  async getCourseById(id) {
    const result = await query('SELECT * FROM courses WHERE id = $1', [id]);
    if (result.rows.length === 0) return null;
  
    const course = Course.fromDatabase(result.rows[0]);
  
    // Fetch subjects associated with the course
    const subjectResult = await query(
      'SELECT subject_id FROM course_subjects WHERE course_id = $1',
      [id]
    );
    
    // Add subjectIds to the course object
    course.subjectIds = subjectResult.rows.map(row => row.subject_id);
  
    return course;
  }

  async updateCourse(id, courseData) {
    const { name, description, credits, subjectIds } = courseData;

    const course = new Course(id, name, description, credits, subjectIds);
    course.validate();

    // Update course data in the 'courses' table
    const result = await query(
      'UPDATE courses SET name = $1, description = $2, credits = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *',
      [course.name, course.description, course.credits, course.id]
    );
    const updatedCourse = Course.fromDatabase(result.rows[0]);

    // Remove existing course-subject associations
    await query('DELETE FROM course_subjects WHERE course_id = $1', [id]);

    // Insert new associations for the subjects using CourseSubject model
    const courseSubjectPromises = subjectIds.map(subjectId => 
      query(
        'INSERT INTO course_subjects (course_id, subject_id) VALUES ($1, $2)',
        [id, subjectId]
      )
    );
    await Promise.all(courseSubjectPromises);

    return updatedCourse;
  }

  async deleteCourse(id) {
    // Delete course-subject relationships
    await query('DELETE FROM course_subjects WHERE course_id = $1', [id]);

    // Delete the course itself
    const result = await query('DELETE FROM courses WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return null;

    return Course.fromDatabase(result.rows[0]);
  }
}

export default new CourseRepository();
