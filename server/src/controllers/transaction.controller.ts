import { Request, Response } from 'express';
import Transaction from '../models/transaction.model';

const createTransaction = async (req: Request, res: Response) => {
  try {
    const { type, amount, category } = req.body;

    if (!type || !['income', 'expense'].includes(type)) {
      return res.status(400).json({
        error: 'Type is required and must be either "income" or "expense"',
      });
    }
    if (!amount || amount <= 0) {
      return res
        .status(400)
        .json({ error: 'Amount is required and must be greater than 0' });
    }
    if (!category || typeof category !== 'string' || category.trim() === '') {
      return res.status(400).json({ error: 'Category is required' });
    }

    const transaction = new Transaction(req.body);
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllTransaction = async (req: Request, res: Response) => {
  try {
    const { offset = '0', limit = '10' } = req.query;

    const skip = parseInt(offset as string, 10);
    const limitNum = parseInt(limit as string, 10);

    const [transaction, total] = await Promise.all([
      Transaction.find().sort({ date: -1 }).skip(skip).limit(limitNum),
      Transaction.countDocuments(),
    ]);

    res.status(200).json({
      success: true,
      data: {
        transaction,
        total,
        offset: skip,
        limit: limitNum,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const searchTransaction = async (req: Request, res: Response) => {
  try {
    const { type, amount, description = '', category, date } = req.query;

    const query: any = {};

    if (type && ['expense', 'income'].includes(type as string)) {
      query.type = type;
    }

    if (amount && Number(amount as string)) {
      query.amount = amount;
    }

    if (
      description &&
      typeof description === 'string' &&
      description.trim() !== ''
    ) {
      query.description = description;
    }

    if (category && typeof category == 'string' && category.trim() !== '') {
      query.category = category;
    }

    if (date && typeof date == 'string' && date.trim() !== '') {
      const dateObj = new Date(date as string);
      const isValidDate = !isNaN(dateObj.getTime());

      if (isValidDate) {
        query.date = dateObj;
      }
    }
    const transactions = await Transaction.find(query).sort({ date: -1 });

    res.status(200).json({
      success: true,
      data: transactions,
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { getAllTransaction, createTransaction, searchTransaction };