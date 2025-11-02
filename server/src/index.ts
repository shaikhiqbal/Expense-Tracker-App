import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';
import corsMiddleware from './middlewares/cors';
import visitTracker from './middlewares/visitTracker';
import transactionRoutes from './routes/transaction.routes';
import visitorRoutes from './routes/visitor.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

// Connect to MongoDB
connectDB();

// Middleware
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(visitTracker);



// Routes
app.use('/api', transactionRoutes);
app.use('/api', visitorRoutes);

// Global error handler
app.use((err: any, req: any, res: any, next: any) => {
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Server running on port ${PORT}`);
  }
});
