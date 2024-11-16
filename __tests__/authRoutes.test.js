import jwt from 'jsonwebtoken';
import { loginDepartmentHead } from '../src/services/authService.js';
import { DepartmentHeadRepository } from '../src/repositories/departmentHeadRepository.js';

jest.mock('dotenv', () => ({
  config: jest.fn(),
}));

jest.mock('../src/repositories/departmentHeadRepository.js', () => {
  return {
    DepartmentHeadRepository: jest.fn().mockImplementation(() => ({
      getDepartmentHeadByEmail: jest.fn(),
      verifyPassword: jest.fn(),
    })),
  };
});

describe('loginDepartmentHead', () => {
  let departmentHeadRepository;
  const mockJwtSign = jest.spyOn(jwt, 'sign');
  const mockDepartmentHead = {
    head_id: 1,
    email: 'admin@example.com',
    password: 'hashedpassword',
  };

  beforeEach(() => {
    departmentHeadRepository = new DepartmentHeadRepository();
    process.env.JWT_SECRET = 'test_secret';
    process.env.JWT_EXPIRES_IN = '1d';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a token and departmentHead for valid credentials', async () => {
    departmentHeadRepository.getDepartmentHeadByEmail.mockResolvedValue(mockDepartmentHead);
    departmentHeadRepository.verifyPassword.mockResolvedValue(true);

    mockJwtSign.mockReturnValue('mockToken');

    const result = await loginDepartmentHead('admin@example.com', 'password');

    expect(departmentHeadRepository.getDepartmentHeadByEmail).toHaveBeenCalledWith('admin@example.com');
    expect(departmentHeadRepository.verifyPassword).toHaveBeenCalledWith(mockDepartmentHead, 'password');
    expect(mockJwtSign).toHaveBeenCalledWith(
      { id: 1, role: 'department_head' },
      'test_secret',
      { expiresIn: '1d' }
    );
    expect(result).toEqual({
      token: 'mockToken',
      departmentHead: mockDepartmentHead,
    });
  });

  it('should throw an error if email is not found', async () => {
    departmentHeadRepository.getDepartmentHeadByEmail.mockResolvedValue(null);

    await expect(loginDepartmentHead('nonexistent@example.com', 'password')).rejects.toThrow('Invalid credentials');

    expect(departmentHeadRepository.getDepartmentHeadByEmail).toHaveBeenCalledWith('nonexistent@example.com');
    expect(departmentHeadRepository.verifyPassword).not.toHaveBeenCalled();
    expect(mockJwtSign).not.toHaveBeenCalled();
  });

  it('should throw an error if the password is incorrect', async () => {
    departmentHeadRepository.getDepartmentHeadByEmail.mockResolvedValue(mockDepartmentHead);
    departmentHeadRepository.verifyPassword.mockResolvedValue(false);

    await expect(loginDepartmentHead('admin@example.com', 'wrongpassword')).rejects.toThrow('Invalid credentials');

    expect(departmentHeadRepository.getDepartmentHeadByEmail).toHaveBeenCalledWith('admin@example.com');
    expect(departmentHeadRepository.verifyPassword).toHaveBeenCalledWith(mockDepartmentHead, 'wrongpassword');
    expect(mockJwtSign).not.toHaveBeenCalled();
  });

  it('should throw an error for empty email or password', async () => {
    await expect(loginDepartmentHead('', 'password')).rejects.toThrow('Email and password are required');
    await expect(loginDepartmentHead('admin@example.com', '')).rejects.toThrow('Email and password are required');
  });

  it('should throw an error if JWT signing fails', async () => {
    mockJwtSign.mockImplementation(() => {
      throw new Error('JWT signing failed');
    });

    await expect(loginDepartmentHead('admin@example.com', 'password')).rejects.toThrow('JWT signing failed');
  });
});
