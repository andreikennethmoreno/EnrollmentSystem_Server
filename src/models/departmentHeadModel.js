// models/departmentHeadModel.js
import { query } from '../config/dbConfig.js';  // Assuming query is a function to run SQL queries

class DepartmentHead {
  constructor({
    id,
    first_name,
    middle_name,
    last_name,
    email,
    password,
  }) {
    this.id = id;
    this.first_name = first_name;
    this.middle_name = middle_name;
    this.last_name = last_name;
    this.email = email;
    this.password = password;
  }

  // Static method to create a DepartmentHead instance from a database row
  static fromDatabase(row) {
    return new DepartmentHead({
      id: row.id,
      first_name: row.first_name,
      middle_name: row.middle_name,
      last_name: row.last_name,
      email: row.email,
      password: row.password,
    });
  }

  // Additional methods for DepartmentHead can be added here
}

export default DepartmentHead;
