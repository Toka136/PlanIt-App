import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import HomePage from './components/HomePage'
function App() {
 
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/homepage" element={<HomePage />} />
    </Routes>
  )
}

export default App
