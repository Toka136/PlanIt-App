import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import HomePage from './components/Home/HomePage'
import Task from './components/Tasks/Task'
import { AuthProvider } from './API/Context/AuthContext'
function App() {
 
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/homepage" element={<HomePage />} />
      <Route path='/mytasks' element={<Task/>}/>
    </Routes>
  )
}

export default App
