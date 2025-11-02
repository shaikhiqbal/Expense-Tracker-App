import Navbar from './components/Navbar/Navbar';
import DashboardPage from './pages/DashboardPage';
import FeedbackButton from './components/Feedback/FeedbackButton';
import { useVisitTracker } from './hooks/useVisitTracker';

function App() {
  useVisitTracker();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <DashboardPage />
      <FeedbackButton />
    </div>
  );
}

export default App;