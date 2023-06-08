import { Request, Response, NextFunction } from 'express';

function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) return next();
  else return res.status(401).json({ message: 'Not authenticated' });
}

export default isAuthenticated;
