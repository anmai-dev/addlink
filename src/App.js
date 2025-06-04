import './App.scss';
import Navbar from './components/Navbar/Navbar';
import HomePage from './page/homePage/HomePage';
import Login from './page/loginPage/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './page/registerPage/Register';
import '@fortawesome/fontawesome-free/css/all.min.css';
import X from './components/Create/x/X';
import Fb from './components/Create/fb/Fb';
import Footer from './components/Footer/Footer';
import Contact from './components/contact/Contact';
import ProtectedRoute from './protects/ProtectedRoute';
import ProtectedRouteAdmin from './protects/ProtectedRouteAdmin';
import Admin from './page/adminPage/Admin';
import ListLinks from './components/ListLinks/ListLinks';

const App = () => {


  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path="/create-x" element={
            <ProtectedRoute>
              <X />
            </ProtectedRoute>
          } />
          <Route path="/create-facebook" element={
            <ProtectedRoute>
              <Fb />
            </ProtectedRoute>
          } />
          <Route path="/admin-panel" element={
            <ProtectedRouteAdmin>
              <Admin />
            </ProtectedRouteAdmin>
          } />
          <Route path="/list-links" element={
            <ProtectedRoute>
              <ListLinks />
            </ProtectedRoute>
          } />


          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Register />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
