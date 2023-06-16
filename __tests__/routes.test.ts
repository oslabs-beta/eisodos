import { Request, Response, NextFunction } from 'express';
import request from 'supertest';
import { app } from '../server/server';

jest.mock('../server/controllers/isAuthenticated.ts', () => {
  return (req: Request, res: Response, next: NextFunction) => {
    return next();
  };
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
