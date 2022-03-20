import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './pages/login/login';
import NotFound from './pages/not-found/not-found';
import { Signup } from './pages/signup/signup';

function App() {
  console.log("in app");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
      </BrowserRouter>
    );
}

export default App;
