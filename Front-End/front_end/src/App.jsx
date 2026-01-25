import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import HomePage from './components/Home/HomePage'
import Task from './components/Tasks/Task'
import { AuthProvider } from './API/Context/AuthContext'
import TaskFlowHeader from './components/common/Header'
import SidebarMenu from './components/common/Sidebar'
import Profile from './components/user/Profile'
import ChangProfile from './components/user/CahngeProfile'
function App() {
 
  return (
    <>
    <TaskFlowHeader/>
    <div className='grid grid-cols-[20%_80%]'>
      <SidebarMenu className='col-start-2'/>
         <Routes className='col-start-10 '>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/homepage" element={<HomePage />} />
      <Route path='/mytasks' element={<Task/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/changeprofile' element={<ChangProfile/>}/>
    </Routes>
    </div>
 
    </>
  )
}

export default App
