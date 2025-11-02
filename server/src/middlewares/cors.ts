import cors from 'cors';

const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL || 'https://your-frontend-url.vercel.app'] 
    : ['http://localhost:5173'],
  credentials: true,
};

export default cors(corsOptions);