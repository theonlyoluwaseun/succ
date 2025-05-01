import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import KartGame from './KartGame';
import QuizApp from './QuizApp';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-primary flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold mb-4">Succinct Mini Apps</h1>
        <div className="flex gap-4">
          <Link to="/game" className="bg-primary text-white px-4 py-2 rounded-xl">Play Kart Game</Link>
          <Link to="/quiz" className="bg-primary text-white px-4 py-2 rounded-xl">Start Quiz</Link>
        </div>
        <Routes>
          <Route path="/game" element={<KartGame />} />
          <Route path="/quiz" element={<QuizApp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;