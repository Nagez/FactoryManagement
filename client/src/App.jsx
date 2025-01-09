import { Routes, Route } from 'react-router-dom'
import Users from './pages/Users'
import Login from './pages/Login'
import TopBar from './components/TopBar'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/userReducer';
import {jwtDecode} from 'jwt-decode';
import Employees from './pages/Employees'
import NewDepartment from './pages/NewDepartment';
import Departments from './pages/Departments';
import NewEmployee from './pages/NewEmployee';
import EditDepartment from './pages/EditDepartment';
import EditEmployee from './pages/EditEmployee';
import MainPage from './pages/MainPage';
import Shifts from './pages/Shifts'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    
    const token = sessionStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        dispatch(setUser({ id: decoded.id, name: decoded.username }));
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
  }, [dispatch]);
    
  return (
    <>
      <TopBar />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path='/MainPage' element={<MainPage />} />
        <Route path='/Users' element={<Users />} />
        <Route path='/Employees' element={<Employees />} />
        <Route path='/Shifts' element={<Shifts />} />
        <Route path='/NewEmployee' element={<NewEmployee />} />
        <Route path='/EditEmployee/:id' element={<EditEmployee />} />
        <Route path='/Departments' element={<Departments />} />
        <Route path='/NewDepartment' element={<NewDepartment />} />
        <Route path='/EditDepartment/:id' element={<EditDepartment />} />
      </Routes>
    </>
  )
}

export default App
