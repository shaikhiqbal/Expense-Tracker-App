import cors from 'cors';

const allowedOrigins = [
  'https://expense-tracker-app-pearl-five.vercel.app/',
].filter(Boolean) as string[];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

export default cors(corsOptions);
