import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import NotFound from './pages/NotFound';
import Header from './components/Header';
import ErrorBoundary from './components/ErrorBoundary';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Header />
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
