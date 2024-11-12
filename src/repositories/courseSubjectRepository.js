import { query } from '../config/dbConfig.js';
import CourseSubject from '../models/courseSubjectModel.js';

class CourseSubjectRepository {
  async addSubjectToCourse(courseId, subjectId) {
    await query(
      'INSERT INTO course_subjects (course_id, subject_id) VALUES ($1, $2)',
      [courseId, subjectId]
    );
  }

  async getSubjectsByCourse(courseId) {
    const result = await query(
      'SELECT subject_id FROM course_subjects WHERE course_id = $1',
      [courseId]
    );
    return result.rows.map(row => row.subject_id);
  }

  async removeSubjectFromCourse(courseId, subjectId) {
    await query(
      'DELETE FROM course_subjects WHERE course_id = $1 AND subject_id = $2',
      [courseId, subjectId]
    );
  }
}

export default new CourseSubjectRepository();
