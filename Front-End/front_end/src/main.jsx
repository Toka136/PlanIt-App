import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AuthProvider } from './API/Context/AuthContext.jsx';
import { TasksProvider } from './API/Context/TasksContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <TasksProvider>
    
    <BrowserRouter>
  
    <App />
    </BrowserRouter>
 
   </TasksProvider>
     </AuthProvider>
    
  </StrictMode>,
)
