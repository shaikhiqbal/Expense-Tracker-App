# Expense Tracker

A modern full-stack expense tracking application built with the MERN stack and TypeScript.

## 🚀 Tech Stack

**Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Redux Toolkit, Chart.js  
**Backend:** Node.js, Express, TypeScript, MongoDB, Mongoose  
**UI Components:** Radix UI primitives with custom styling

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd expense-tracker-egc
```

2. **Install dependencies**
```bash
npm run install:all
```

3. **Environment setup**
Create a `.env` file in the `server` directory:
```env
PORT=5002
MONGODB_URI=mongodb://localhost:27017/expense-tracker
NODE_ENV=development
ADMIN_TOKEN=your-secure-admin-token-here
```

## 🚀 Development

Start both frontend and backend servers:
```bash
npm run dev
```

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:5002

## 📁 Project Structure

```
expense-tracker-egc/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── features/       # Redux slices and API logic
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Page components
│   │   └── utils/          # Utility functions
│   └── package.json
├── server/                 # Express backend
│   ├── src/
│   │   ├── controllers/    # Route handlers
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API routes
│   │   └── config/         # Database configuration
│   └── package.json
└── package.json           # Root package.json
```

## 🔌 API Endpoints

### Transactions
- `GET /api/transaction` - Get paginated transactions
- `POST /api/` - Create new transaction
- `GET /api/search-transaction` - Search transactions with filters

### Visitor Analytics & Feedback
- `POST /api/visitors` - Track visitor (automatic)
- `POST /api/visitors/feedback` - Submit feedback
- `GET /api/visitors` - Get all visitors (admin only, requires Bearer token)

## 🧪 Available Scripts

### Root Level
- `npm run dev` - Start both frontend and backend
- `npm run install:all` - Install all dependencies
- `npm run build` - Build both applications

### Individual Services
```bash
# Backend
cd server && npm run dev    # Development server
cd server && npm run build  # Build for production
cd server && npm start      # Start production server

# Frontend
cd client && npm run dev    # Development server
cd client && npm run build  # Build for production
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy the dist/ folder
```

### Backend (Railway/Render/Heroku)
```bash
cd server
npm run build
# Deploy with start command: "node dist/index.js"
```

### Environment Variables for Production
- Set `NODE_ENV=production`
- Update `MONGODB_URI` to your production database
- Configure CORS origins for your production domains

## 🛠️ Features

- ✅ Add income and expense transactions
- ✅ Real-time transaction filtering and search
- ✅ Interactive charts and analytics
- ✅ Responsive design with dark mode support
- ✅ Pagination for large datasets
- ✅ TypeScript for type safety
- ✅ Modern UI with Tailwind CSS
- ✅ Visitor analytics and feedback system
- ✅ Automatic visit tracking
- ✅ User feedback collection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.