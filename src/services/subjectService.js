// src/services/subjectService.js

import { SubjectRepository } from '../repositories/subjectRepository.js';

export class SubjectService {
  constructor() {
    this.subjectRepository = new SubjectRepository();
  }

  // Create a subject
  async createSubject(subjectData) {
    return await this.subjectRepository.createSubject(subjectData);
  }

  // Get all subjects
  async getAllSubjects() {
    return await this.subjectRepository.getAllSubjects();
  }

  // Get subject by ID
  async getSubjectById(id) {
    return await this.subjectRepository.getSubjectById(id);
  }

  // Update a subject
  async updateSubject(id, subjectData) {
    return await this.subjectRepository.updateSubject(id, subjectData);
  }

  // Delete a subject
  async deleteSubject(id) {
    return await this.subjectRepository.deleteSubject(id);
  }
}
