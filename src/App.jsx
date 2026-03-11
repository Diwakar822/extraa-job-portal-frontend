import React from 'react';

import { BrowserRouter, Outlet, Route, Router, Routes } from 'react-router-dom';
import Pages from './pages/RegisterPage/Pages';
import WelcomePage from './components/WelcomePage';
import Login from './pages/RegisterPage/Login';
import Unanuthorized from './pages/Unanuthorized';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import JobsList from './pages/JobsList';
import JobDetails from './pages/JobDetails';
import ApplyJob from './pages/ApplyJob';
import AdminLayout from './layouts/AdminLayout';
import CreateJob from './pages/CreateJob';
import AdminJobPanel from './components/AdminJobPanel';
import { ToastContainer } from 'react-toastify';
import MyApplications from './pages/MyApplications';
import MyApplicationDetailsPage from './pages/MyApplicationDetailsPage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import AdminHome from './components/AdminHome';


const App = () => {
  return (
          
      <BrowserRouter>
  <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
  
  />

      <Routes>

      <Route path="/admin" element={
        <ProtectedRoute>
        <AdminLayout/>
        </ProtectedRoute>
        }>

      <Route path="dashboard" element={<Dashboard/>}/>
      <Route index element={<AdminHome />} />
      <Route path="jobs" element={<AdminJobPanel/>}/>
      <Route path='CreatJob' element={<CreateJob/>}/>

      </Route>

        <Route path='/' element={<WelcomePage/>}/>
        <Route path='/register' element={<Pages/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/reset-password/:token' element={<ResetPassword/>}/>
        <Route path='/Unauthorized' element={<Unanuthorized/>} />
        {/* <Route path='/admin/AdminDashboard' element={<Dashboard/>}/> */}
        {/* <Route path='/admin' element={<AdminLayout/>}/> */}
        <Route path='/jobs' element={
          <ProtectedRoute>
          <JobsList/>
          </ProtectedRoute>
          }/>
        <Route path='/jobs/:id' element={<ProtectedRoute><JobDetails/></ProtectedRoute>}/>
        <Route path='/apply/:id' element={<ProtectedRoute><ApplyJob/></ProtectedRoute>}/>
        <Route path='/my-applications' element={<ProtectedRoute><MyApplications/></ProtectedRoute>}/>
        <Route path='/my-applications/:id' element={<ProtectedRoute><MyApplicationDetailsPage/></ProtectedRoute>}/>
        {/* <Route path='/admin' element={
          <ProtectedRoute role="admin">
             <AdminDashboard/>
        </ProtectedRoute>}/> */}
        
        {/* <Route
        path='/jobs'
        element={<ProtectedRoute role="user">
          <Jobs/>
        </ProtectedRoute>}
        /> */}

     </Routes>
      
      </BrowserRouter>
    
  );
};

export default App;