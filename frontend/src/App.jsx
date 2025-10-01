
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import ToastProvider from './components/ToastProvider.jsx'
import UsersListPage from './pages/UsersListPage'
import UserFormPage from './pages/UserFormPage'
import UserDetailsPage from './pages/UserDetailsPage'

const API_BASE = import.meta.env.VITE_API_BASE 




function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Layout>
          <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<UsersListPage/>} />
          <Route path="/users/add" element={<UserFormPage/>} />
          <Route path="/users/:id" element={<UserDetailsPage/>} />
          <Route path="/users/:id/edit" element={<UserFormPage/>} />
          <Route path="*" element={<div className="text-center py-12">Not Found</div>} />
          </Routes>
        </Layout>
      </ToastProvider>
    </BrowserRouter>
  )
}

export default App
