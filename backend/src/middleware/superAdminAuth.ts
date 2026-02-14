import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface SuperAdminRequest extends Request {
  isSuperAdmin?: boolean;
}

/**
 * Middleware to verify super-admin JWT token
 */
export const verifySuperAdmin = (
  req: SuperAdminRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        error: 'Access denied. No token provided.',
      });
      return;
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      isSuperAdmin: boolean;
    };

    if (!decoded.isSuperAdmin) {
      res.status(403).json({
        success: false,
        error: 'Access denied. Super-admin privileges required.',
      });
      return;
    }

    req.isSuperAdmin = true;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: 'Invalid or expired token',
    });
  }
};
