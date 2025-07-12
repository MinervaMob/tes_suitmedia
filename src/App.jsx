import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IdeasPage from './pages/IdeasPage';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<IdeasPage />} />
      </Routes>
    </Router>
  );
}

export default App;