import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Home from './components/Home';
import Jobs from './components/Jobs';
import Browse from './components/Browse';
import Profile from './components/Profile';
import JobDescription from './components/JobDescription';
import Companies from './admin/Companies';
import CompanyCreate from './admin/CompanyCreate';
import CompanySetup from './admin/CompanySetup';
import AdminJobs from "./admin/AdminJobs";
import PostJob from './admin/PostJob';
import Applicants from './admin/Applicants';
import AdminProtectecRoute from "./admin/AdminProtectecRoute"
import StudentProtectedRoute from './components/StudentProtectedRoute';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <StudentProtectedRoute><Home /></StudentProtectedRoute>
  },
  {
    path: '/login',
    element: <StudentProtectedRoute><Login /></StudentProtectedRoute>
  },
  {
    path: '/signup',
    element: <StudentProtectedRoute><Signup /></StudentProtectedRoute>
  },
  {
    path: '/jobs',
    element: <StudentProtectedRoute><Jobs /></StudentProtectedRoute>
  },
  {
    path: '/description/:id',
    element: <StudentProtectedRoute><JobDescription /></StudentProtectedRoute>
  },
  {
    path: '/browse',
    element: <StudentProtectedRoute><Browse /></StudentProtectedRoute>
  },
  {
    path: '/profile',
    element: <StudentProtectedRoute><Profile /></StudentProtectedRoute>
  },

  // Admin Routes
  {
    path: '/admin/companies',
    element: <AdminProtectecRoute><Companies /></AdminProtectecRoute>
  },
  {
    path: '/admin/companies/create',
    element: <AdminProtectecRoute><CompanyCreate /></AdminProtectecRoute>
  },
  {
    path: '/admin/companysetup/:id',
    element: <AdminProtectecRoute><CompanySetup /></AdminProtectecRoute>
  },
  {
    path: "/admin/jobs",
    element: <AdminProtectecRoute><AdminJobs /></AdminProtectecRoute>
  },
  {
    path: '/admin/jobs/create',
    element: <AdminProtectecRoute><PostJob /></AdminProtectecRoute>
  },
  {
    path: '/admin/job/:id/applicants',
    element: <AdminProtectecRoute><Applicants /></AdminProtectecRoute>
  }
])

function App() {

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
