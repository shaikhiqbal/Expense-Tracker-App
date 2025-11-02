import cors from 'cors';

const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://expense-tracker-app-pp6k.vercel.app', process.env.FRONTEND_URL].filter(Boolean) as string[]
    : ['http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

export default cors(corsOptions);