// App.js
import './css/my_reset.css';
// import './css/App.css';
import './styles/App.scss';

import Header from './components/Header';
import Footer from './components/Footer';
import MainListPage from './pages/MainListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreatePage from './pages/CreatePage';
import RecipesPage from './pages/Recipes';
import { Route, Routes } from 'react-router-dom';

import DetailPage from './pages/DetailPage';
import EditPage from './pages/EditPage';

function App() {
  return (
    <div className="wrap">
      <Header />
      <Routes>
        <Route path="/" element={<MainListPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/recipes" element={<RecipesPage />} />

        <Route path="/detail/:postId" element={<DetailPage />} />
        <Route path="/edit/:postId" element={<EditPage />} />

        <Route
          path="*"
          element={
            <div className="notFound">404 - Page Not Found.</div>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
