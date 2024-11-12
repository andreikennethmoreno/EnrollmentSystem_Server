import { query } from '../config/dbConfig.js';
import ClassSection from '../models/classSectionModel.js';

class ClassSectionRepository {
  // Create new class section
  async createClassSection(classSectionData) {
    const { year, section, courseIds } = classSectionData;
    const result = await query(
      'INSERT INTO class_sections (year, section, course_ids) VALUES ($1, $2, $3) RETURNING *',
      [year, section, courseIds]
    );
    return ClassSection.fromDatabase(result.rows[0]);
  }

  // Get all class sections
  async getAllClassSections() {
    const result = await query('SELECT * FROM class_sections');
    return result.rows.map(ClassSection.fromDatabase);
  }

  // Get class section by ID
  async getClassSectionById(id) {
    const result = await query('SELECT * FROM class_sections WHERE id = $1', [id]);
    if (result.rows.length === 0) return null;
    return ClassSection.fromDatabase(result.rows[0]);
  }

  // Update class section
  async updateClassSection(id, classSectionData) {
    const { year, section, courseIds } = classSectionData;
    const result = await query(
      'UPDATE class_sections SET year = $1, section = $2, course_ids = $3 WHERE id = $4 RETURNING *',
      [year, section, courseIds, id]
    );
    return ClassSection.fromDatabase(result.rows[0]);
  }

  // Delete class section
  async deleteClassSection(id) {
    const result = await query('DELETE FROM class_sections WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return null;
    return ClassSection.fromDatabase(result.rows[0]);
  }

  // Get section count for a specific year
  async getClassSectionCountByYear(year) {
    const result = await query(
      'SELECT COUNT(*) FROM class_sections WHERE year = $1',
      [year]
    );
    return parseInt(result.rows[0].count, 10);
  }
}

export default new ClassSectionRepository();
