import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { CoachApp } from './pages/coach-app/coach-app';
import Login from './pages/login/login';
import NotFound from './pages/not-found/not-found';
import { Signup } from './pages/signup/signup';
import { useSignupStore } from './stores/signup';
import { useUserStore } from './stores/user';

function App() {
  console.log("in app");
  const userStore = useUserStore();
  const InnerApp = (() => {
    if (userStore!.role === 'coach') {
      console.log("Route to " + userStore!.role)
      return <CoachApp/>
    }
  })()
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/app/*" element={InnerApp}/>
        <Route path="*" element={<NotFound/>} />
      </Routes>
      </BrowserRouter>
    );
}

export default App;
