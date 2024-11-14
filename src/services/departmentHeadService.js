// src/services/departmentHeadService.js
import { DepartmentHeadRepository } from '../repositories/departmentHeadRepository.js';

export class DepartmentHeadService {
  constructor() {
    this.departmentHeadRepository = new DepartmentHeadRepository();
  }

  // Get all department heads
  async getAllDepartmentHeads() {
    return await this.departmentHeadRepository.getAllDepartmentHeads();
  }

  // Get a department head by ID
  async getDepartmentHeadById(id) {
    return await this.departmentHeadRepository.getDepartmentHeadById(id);
  }

  // Create a new department head
  async createDepartmentHead(departmentHeadData) {
    return await this.departmentHeadRepository.createDepartmentHead(departmentHeadData);
  }

  // Update an existing department head
  async updateDepartmentHead(id, departmentHeadData) {
    return await this.departmentHeadRepository.updateDepartmentHead(id, departmentHeadData);
  }

  // Delete a department head by ID
  async deleteDepartmentHead(id) {
    return await this.departmentHeadRepository.deleteDepartmentHead(id);
  }
}

export default DepartmentHeadService;
