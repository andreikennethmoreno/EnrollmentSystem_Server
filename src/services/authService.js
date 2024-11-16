import jwt from 'jsonwebtoken';
import { DepartmentHeadRepository } from '../repositories/departmentHeadRepository.js';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET; 
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN; 

const departmentHeadRepository = new DepartmentHeadRepository();

export const loginDepartmentHead = async (email, password) => {
    console.log("loginDepartmentHead triggred")
  // Check if the department head exists
  const departmentHead = await departmentHeadRepository.getDepartmentHeadByEmail(email);
    console.log(departmentHead)
  if (!departmentHead) {
    throw new Error('Invalid credentials');
    }

  // Verify the password
  const isPasswordCorrect = await departmentHeadRepository.verifyPassword(departmentHead, password);
if (!isPasswordCorrect) {
  throw new Error('Invalid credentials');
}


  // Generate JWT
  const token = jwt.sign(
    { id: departmentHead.head_id, role: 'department_head' },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return { token, departmentHead };
};
