import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  userId?: string;
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      res.status(401).json({
        success: false,
        error: 'Access token required',
      });
      return;
    }

    const jwtSecret = process.env.JWT_SECRET || 'fallback-secret-key';

    jwt.verify(token, jwtSecret, (err, decoded: any) => {
      if (err) {
        res.status(403).json({
          success: false,
          error: 'Invalid or expired token',
        });
        return;
      }

      req.userId = decoded.userId;
      next();
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Authentication error',
    });
  }
};

export const generateToken = (userId: string): string => {
  const jwtSecret = process.env.JWT_SECRET || 'fallback-secret-key';
  const expiresIn = (process.env.JWT_EXPIRES_IN || '7d') as jwt.SignOptions['expiresIn'];

  return jwt.sign({ userId }, jwtSecret, { expiresIn } as jwt.SignOptions);
};
