import './App.css'
import Login from './Pages/Login'
import { Provider } from 'react-redux'
import store from './redux/store'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import PageNotFound from './Pages/PageNotFound'
import Signup from './Pages/Signup'
import Dashboard from './Pages/Student/Dashboard'
import StudentStat from './Pages/Student/StudentStat'
import ActiveDrives from './Pages/Student/ActiveDrives'
import DriveDetail from './Pages/Student/DriveDetail'
import Reset from './Pages/ForgetPassword/Reset'
import TokenForm from './Pages/ForgetPassword/TokenForm'
import ForgetPassword from './Pages/ForgetPassword/index'
import ResetForm from './Pages/ForgetPassword/ResetForm'
import 'react-toastify/dist/ReactToastify.css';
import AdminDashboard from './Pages/Admin/Dashboard'
import AllStats from './Pages/Admin/AllStats'
import AddAdmin from './Pages/Admin/AddAdmin'
import AddDrive from './Pages/Admin/AddDrive'
import Drives from './Pages/Admin/Drives'
import EditDrive from './Pages/Admin/EditDrive'
import Students from './Pages/Admin/Students'
import ViewStudent from './Pages/Admin/ViewStudent'
import ViewProfile from './Pages/Student/ViewProfile'
import ViewApplication from './Pages/Admin/ViewApplication'
import MyApplication from './Pages/Student/MyApplication'
import ViewDrive from './Pages/Admin/ViewDrive'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
      errorElement: <PageNotFound />
    },
    {
      path: '/signup',
      element: <Signup />,
      errorElement:<PageNotFound />
    },
    {
      path: '/student',
      element: <Dashboard />,
      children:[
        {
          path:'',
          element: <StudentStat />
        },
        {
          path:'drives',
          element: <ActiveDrives />
        },
        {
          path: 'drive/:id',
          element: <DriveDetail />
        },
        {
          path:'profile/:studentId',
          element: <ViewProfile />
        },
        {
          path: 'request',
          element: <MyApplication />
        }
      ],
      errorElement: <PageNotFound />
    },
    {
      path: 'admin',
      element: <AdminDashboard />,
      errorElement: <PageNotFound />,
      children: [
        {
          path: '',
          element: <AllStats />
        },
        {
          path:'add-admin',
          element: <AddAdmin />
        },
        {
          path: 'add-drive',
          element: <AddDrive />
        },
        {
          path: 'drives',
          element: <Drives />
        },
        {
          path: 'drive/:id',
          element: <ViewDrive />
        },
        {
          path:'drive/edit/:id',
          element: <EditDrive />
        },
        {
          path:'students',
          element: <Students />
        },
        {
          path:'student/:id',
          element: <ViewStudent />
        },
        {
          path: 'request',
          element: <ViewApplication />
        }
      ]
    },
    {
      path: 'forget-password',
      element: <ForgetPassword />,
      children: [
        {
          path: '',
          element: <Reset />
        },
        {
          path:'token',
          element: <TokenForm />
        },
        {
          path: 'reset',
          element: <ResetForm />
        }
      ]
    }
  ])
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
