import { Request, Response, NextFunction } from 'express';
import request from 'supertest';
import { app } from '../server/server';

jest.mock('../server/controllers/isAuthenticated.ts', () => {
  return (req: Request, res: Response, next: NextFunction) => {
    return next();
  };
});

jest.mock('../server/controllers/authController.ts', () => {
  return {
    register: (req: Request, res: Response, next: NextFunction) => {
      if (req.body.username === 'existinguser') {
        // Simulate registration failure with existing username
        res.status(400).json({ message: 'Username already exists' });
      } else {
        // Simulate successful registration
        res.sendStatus(200);
      }
    },
    login: (req: Request, res: Response, next: NextFunction) => {
      // Simulate login success for a specific username and password
      if (req.body.username === 'testuser' && req.body.password === 'correctpassword') {
        res.status(200).json({ message: 'Login successful' });
      } else {
        // Simulate login failure for incorrect credentials
        res.status(400).json({ message: 'Invalid username or password' });
      }
    },
    logout: (req: Request, res: Response, next: NextFunction) => {
      // Simulate successful logout
      res.sendStatus(200);
    }
  };
});

describe('User authentication routes', () => {
  test('should register a new user', async () => {
    const response = await request(app).post('/api/users/register');
    expect(response.statusCode).toBe(200);
  });

  test('should fail to register with existing username', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({ username: 'existinguser', password: 'testpassword' });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ message: 'Username already exists' });
  });

  test('should log in a user', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send({ username: 'testuser', password: 'correctpassword' });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: 'Login successful' });
  });

  test('should fail to log in with incorrect credentials', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send({ username: 'testuser', password: 'incorrectpassword' });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ message: 'Invalid username or password' });
  });

  test('should log out a user', async () => {
    const response = await request(app).post('/api/users/logout');
    expect(response.statusCode).toBe(200);
  });
});

describe('Dashboard routes', () => {
  test('responds to /api/dashboard/metrics', async () => {
    const response = await request(app).get('/api/dashboard/metrics');
    expect(response.statusCode).toBe(200);
  });

  test('responds to /api/dashboard/count', async () => {
    const response = await request(app).get('/api/dashboard/count');
    expect(response.statusCode).toBe(200);
  });
});
