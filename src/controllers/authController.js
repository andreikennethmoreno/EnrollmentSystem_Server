import { loginDepartmentHead } from '../services/authService.js';

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)

  try {
    const { token, departmentHead } = await loginDepartmentHead(email, password);
    console.log(departmentHead, token)
    res.status(200).json({ token, departmentHead });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
