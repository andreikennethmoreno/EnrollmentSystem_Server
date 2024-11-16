import bcrypt from 'bcrypt';
import { query } from '../config/dbConfig.js';
import DepartmentHead from '../models/departmentHeadModel.js';

export class DepartmentHeadRepository {
  // Create a new department head
  async createDepartmentHead(departmentHeadData) {
    const { first_name, middle_name, last_name, password } = departmentHeadData;

    // Hash the password before inserting
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    const result = await query(
      `INSERT INTO department_heads 
        (first_name, middle_name, last_name, password) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [first_name, middle_name, last_name, hashedPassword]
    );

    return DepartmentHead.fromDatabase(result.rows[0]);
  }

  // Update a department head's details
  async updateDepartmentHead(id, departmentHeadData) {
    const { first_name, middle_name, last_name, password } = departmentHeadData;

    // Check if the department head exists
    const existingDepartmentHead = await this.getDepartmentHeadById(id);
    if (!existingDepartmentHead) {
      throw new Error('Department Head not found');
    }

    // If password is provided, hash it before updating
    let hashedPassword = existingDepartmentHead.password; // Keep existing password if not updating
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10); // Hash new password if provided
    }

    const result = await query(
      `UPDATE department_heads SET 
        first_name = $1, middle_name = $2, last_name = $3, 
        password = $4
       WHERE head_id = $5 RETURNING *`,
      [first_name, middle_name, last_name, hashedPassword, id]
    );
    return DepartmentHead.fromDatabase(result.rows[0]);
  }

  // Retrieve all department heads
  async getAllDepartmentHeads() {
    const result = await query('SELECT * FROM department_heads');
    return result.rows.map(row => DepartmentHead.fromDatabase(row));
  }

  // Retrieve a department head by ID
  async getDepartmentHeadById(id) {
    const result = await query('SELECT * FROM department_heads WHERE head_id = $1', [id]);
    if (result.rows.length === 0) return null;
    return DepartmentHead.fromDatabase(result.rows[0]);
  }

  // Delete a department head
  async deleteDepartmentHead(id) {
    // Check if the department head exists before attempting deletion
    const existingDepartmentHead = await this.getDepartmentHeadById(id);
    if (!existingDepartmentHead) {
      throw new Error('Department Head not found');
    }

    const result = await query('DELETE FROM department_heads WHERE head_id = $1 RETURNING *', [id]);
    return DepartmentHead.fromDatabase(result.rows[0]);
  }


  async getByEmail(email) {
    const result = await query('SELECT * FROM department_heads WHERE email = $1', [email]);
    if (result.rows.length === 0) return null;
    return DepartmentHead.fromDatabase(result.rows[0]);
  }

  // Verify the password
  async verifyPassword(departmentHead, plainPassword) {
    const isMatch = await bcrypt.compare(plainPassword, departmentHead.password);
    return isMatch;
  }
}

export default DepartmentHeadRepository;
