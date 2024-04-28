import { Routes, Route } from 'react-router-dom'
import UserLayout from './layout/UserLayout'
import AdminLayout from './layout/AdminLayout'
import SignUp from './pages/user/SignUp'
import {Userlogin}  from './pages/user/Login'
import Login from './pages/admin/Login'
import {Userhome} from './pages/user/Home'
function App() {

  return (
    <>
      <Routes>
          {/* route for users */}
          <Route path='/' element={<UserLayout />}>
            {/* <Route path='' element={<Userhome />} /> */}
            <Route path='signup' element={<SignUp />} />
            <Route path='' element={ <Userlogin /> } />            
            <Route path='login' element={ <Userlogin /> } />
          </Route>
{/* ------------------------------------------------------------------------ */}
          {/* route for admin */}
          <Route path='/admin' element={<AdminLayout />}>
            <Route path='' element={<Login />} />
          </Route>
      </Routes>
    </>
  )
}

export default App
