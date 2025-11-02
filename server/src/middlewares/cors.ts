import cors from 'cors';

const allowedOrigins = (
  process.env.NODE_ENV === 'production'
    ? ['https://expense-tracker-app-pearl-five.vercel.app/']
    : ['http://localhost:5173']
).filter(Boolean) as string[];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

export default cors(corsOptions);
