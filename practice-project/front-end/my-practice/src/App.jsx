import { Route, Routes } from 'react-router-dom';
import Login from './login&register/Login'
import Register from './login&register/Register'
function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
