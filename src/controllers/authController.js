import { loginUser } from '../services/authService.js';

export const login = async (req, res) => {
  const { email, password, role } = req.body; // Include role in the request payload
  console.log(req.body);

  try {
    const { token, user } = await loginUser(email, password, role); // Dynamically handle roles
    console.log(user, token);
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
