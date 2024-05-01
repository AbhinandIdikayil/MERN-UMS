import { Routes, Route } from 'react-router-dom'
import UserLayout from './layout/UserLayout'
import AdminLayout from './layout/AdminLayout'
import { Userlogin } from './pages/user/Login'
import Login from './pages/admin/Login'
import Home from './pages/admin/Home'
import { Userhome } from './pages/user/Home'
import Signup2 from './pages/user/Signup2'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store'
import PrivateRoute from './pages/user/PrivateRoute'
import { PersistGate } from 'redux-persist/integration/react'
import AdminPrivateRoute from './pages/admin/AdminPrivateRoute'
import AddUser from './pages/admin/AddUser'
function App() {

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes>
            {/* route for users */}
            <Route path='/' element={<UserLayout />}>
              <Route path='signup' element={<Signup2 />} />
              <Route path='' element={<Userlogin />} />
              <Route path='login' element={<Userlogin />} />
              <Route path='home' element={
                <PrivateRoute>
                  <Userhome />
                </PrivateRoute>
              } />
            </Route>
            {/* ------------------------------------------------------------------------ */}
            {/* route for admin */}
            <Route path='/admin' element={<AdminLayout />}>
              <Route path='' element={<Login />} />
              <Route path='home' element={<AdminPrivateRoute />}>
                <Route path='' element={<Home />} />
                <Route path='add' element={<AddUser />} />
              </Route>
            </Route>
          </Routes>
        </PersistGate>
      </Provider>
    </>
  )
}

export default App
