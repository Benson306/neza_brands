import React, { lazy, useContext, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer'
import Sidebar from './components/Sidebar';
import routes from './routes';
import { AuthContext } from './context/AuthContext'
import { SidebarContext } from './context/SidebarContext';
import Header from './components/Header';
import Main from './containers/Main';

const Login = lazy(() => import('./pages/Login'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const ChangePassword = lazy(()=> import('./pages/ChangePassword'))
const Dashboard = lazy(()=> import('./pages/Dashboard'))

function App() {
  const { uid } = useContext(AuthContext);

  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext)
  let location = useLocation()

  useEffect(() => {
    closeSidebar()
  }, [location])
  return (
  <div>

    {
        uid == null ?  
    
        <Routes>
            <Route path="/login" Component={Login} />
            <Route path="/forgot-password" Component={ForgotPassword} />
            <Route exact path="/*" Component={Login} />
        </Routes> 
        :

      <div>
        <Routes>
          <Route path="/change_password" element={<ChangePassword />} />

          {routes.map(route => (
              <Route
                key={route.path}
                path={route.path}
                element={(
                  <div className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${isSidebarOpen && 'overflow-hidden'}`}>
                    <Sidebar />
                    <div className="flex flex-col flex-1 w-full">
                      <Header />
                      <Main>
                        <route.component />
                      </Main>
                    </div>
                  </div>
                )}
              />
            ))}
        </Routes>
      </div>
        
    }
  </div>
  )
}

export default App
