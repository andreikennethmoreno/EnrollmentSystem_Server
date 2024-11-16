import jwt from 'jsonwebtoken';
import { DepartmentHeadRepository } from '../repositories/departmentHeadRepository.js';
//import { RegistrarRepository } from '../repositories/registrarRepository.js'; // Example additional repository
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

// Map roles to their corresponding repositories
const roleRepositories = {
  department_head: new DepartmentHeadRepository(),
  //registrar: new RegistrarRepository(), // Example additional role
};

export const loginUser = async (email, password, role) => {
  console.log('loginUser triggered for role:', role);

  // Check if the role is valid
  const repository = roleRepositories[role];
  if (!repository) {
    throw new Error('Invalid role');
  }

  // Check if the user exists
  const user = await repository.getByEmail(email);
  console.log(user);

  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Verify the password
  const isPasswordCorrect = await repository.verifyPassword(user, password);
  if (!isPasswordCorrect) {
    throw new Error('Invalid credentials');
  }

  // Generate JWT
  const token = jwt.sign(
    { id: user.id, role }, // Include role in the payload
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return { token, user };
};
