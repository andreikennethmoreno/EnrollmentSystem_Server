// src/repositories/subjectRepository.js

import { query } from '../config/dbConfig.js';
import { Subject } from '../models/subjectModel.js';

export class SubjectRepository {
  // Create a new subject
  async createSubject(subjectData) {
    const { name, description, credits } = subjectData;
    const sql = `
      INSERT INTO subjects (name, description, credits)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [name, description, credits];

    try {
      const result = await query(sql, values);
      const { id, name: subjectName, description: subjectDescription, credits: subjectCredits } = result.rows[0];
      return new Subject(id, subjectName, subjectDescription, subjectCredits);
    } catch (error) {
      console.error("Error inserting subject:", error);
      throw error;
    }
  }

  // Get all subjects
  async getAllSubjects() {
    const sql = `SELECT * FROM subjects;`;
    try {
      const result = await query(sql);
      return result.rows.map(row => new Subject(row.id, row.name, row.description, row.credits));
    } catch (error) {
      console.error("Error retrieving subjects:", error);
      throw error;
    }
  }

  // Get subject by ID
  async getSubjectById(id) {
    const sql = `SELECT * FROM subjects WHERE id = $1;`;
    try {
      const result = await query(sql, [id]);
      if (result.rows.length === 0) return null;
      const { id: subjectId, name, description, credits } = result.rows[0];
      return new Subject(subjectId, name, description, credits);
    } catch (error) {
      console.error("Error retrieving subject:", error);
      throw error;
    }
  }

  // Update a subject
  async updateSubject(id, subjectData) {
    const { name, description, credits } = subjectData;
    const sql = `
      UPDATE subjects
      SET name = $1, description = $2, credits = $3
      WHERE id = $4
      RETURNING *;
    `;
    const values = [name, description, credits, id];

    try {
      const result = await query(sql, values);
      if (result.rows.length === 0) return null;
      const { id: subjectId, name: subjectName, description: subjectDescription, credits: subjectCredits } = result.rows[0];
      return new Subject(subjectId, subjectName, subjectDescription, subjectCredits);
    } catch (error) {
      console.error("Error updating subject:", error);
      throw error;
    }
  }

  // Delete a subject
  async deleteSubject(id) {
    const sql = `DELETE FROM subjects WHERE id = $1 RETURNING *;`;
    try {
      const result = await query(sql, [id]);
      if (result.rows.length === 0) return null;
      const { id: subjectId } = result.rows[0];
      return subjectId;
    } catch (error) {
      console.error("Error deleting subject:", error);
      throw error;
    }
  }
}
