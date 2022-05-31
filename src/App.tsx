import { useEffect } from 'react';
import { Route, Routes, BrowserRouter, useLocation, useNavigationType, useNavigate } from 'react-router-dom';
import { CoachApp } from './pages/coach-app/coach-app';
import Login from './pages/login/login';
import NotFound from './pages/not-found/not-found';
import { Signup } from './pages/signup/signup';
import { StudentApp } from './pages/student-app/student-app';
import { useSignupStore } from './stores/signup';
import { useUserStore } from './stores/user';

function App() {
  console.log("in app");
  const userStore = useUserStore();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(()=>{
    if (location.pathname === '/') {
      // do nothing
    }

    if (location.pathname.match(/^\/public-board.*/gi)) {
      // Allow public game view without login
    } else if (
      location.pathname.match(/^\/app.*/gi) &&
      !userStore!.isLoggedIn
    ) {
      // Protect the app routes
      navigate('/login')
    } else if (
      !location.pathname.match(/^\/app.*/gi) &&
      userStore!.uuid
    ) {
      // Already logged in
      navigate('/app')
    }
  });
  const InnerApp = (() => {
    if (userStore!.role === 'coach') {
      console.log("Route to " + userStore!.role)
      return <CoachApp/>
    }
    if (userStore!.role === 'student') {
      return <StudentApp/>
    }
  })()
  return (
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/app/*" element={InnerApp}/>
        <Route path="*" element={<NotFound/>} />
      </Routes>
    );
}

export default App;
