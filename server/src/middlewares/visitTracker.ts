import { Request, Response, NextFunction } from 'express';
import Visitor from '../models/visitor.model';

const visitTracker = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.path === '/' || req.path === '/api') {
      const ipAddress = req.ip || req.connection.remoteAddress || 'unknown';
      const userAgent = req.get('User-Agent') || 'unknown';
      const referrer = req.get('Referer');

      const visitor = new Visitor({
        ipAddress,
        userAgent,
        referrer,
      });

      await visitor.save();
    }
  } catch (error) {
    // Silently fail to not interrupt the main request
  }
  next();
};

export default visitTracker;