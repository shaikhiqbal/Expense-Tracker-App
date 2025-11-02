import { Request, Response } from 'express';
import Visitor from '../models/visitor.model';

const trackVisit = async (req: Request, res: Response) => {
  try {
    const ipAddress = req.ip || req.connection.remoteAddress || 'unknown';
    const userAgent = req.get('User-Agent') || 'unknown';
    const referrer = req.get('Referer');

    const visitor = new Visitor({
      ipAddress,
      userAgent,
      referrer,
    });

    await visitor.save();
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to track visit' });
  }
};

const submitFeedback = async (req: Request, res: Response) => {
  try {
    const { fullName, email, feedback } = req.body;

    if (!feedback || feedback.trim() === '') {
      return res.status(400).json({ error: 'Feedback message is required' });
    }

    const ipAddress = req.ip || req.connection.remoteAddress || 'unknown';
    const userAgent = req.get('User-Agent') || 'unknown';
    const referrer = req.get('Referer');

    const visitor = new Visitor({
      ipAddress,
      userAgent,
      referrer,
      fullName,
      email,
      feedback,
    });

    await visitor.save();
    res.status(201).json({ success: true, message: 'Feedback submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
};

const getAllVisitors = async (req: Request, res: Response) => {
  try {
    const adminToken = req.headers.authorization?.replace('Bearer ', '');
    
    if (adminToken !== process.env.ADMIN_TOKEN) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const visitors = await Visitor.find().sort({ visitTime: -1 });
    res.status(200).json({ success: true, data: visitors });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch visitors' });
  }
};

export { trackVisit, submitFeedback, getAllVisitors };