import { useState } from 'react';
import FeedbackForm from './FeedbackForm';

export default function FeedbackButton() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-full shadow-lg transition-colors duration-200 flex items-center gap-2 z-40"
      >
        <span>💬</span>
        <span className="hidden sm:inline">Feedback</span>
      </button>

      {showForm && <FeedbackForm onClose={() => setShowForm(false)} />}
    </>
  );
}