import React, { lazy, useContext, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer'
import { AuthContext } from './context/AuthContext'
import { SidebarContext } from './context/SidebarContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Main from './containers/Main';
import routes from './routes';

const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/Login'))
const CreateAccount = lazy(() => import('./pages/CreateAccount'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const ChangePassword = lazy(()=> import('./pages/ChangePassword'))
const Dashboard = lazy(()=> import('./pages/Dashboard'))

function App() {
  const { uid } = useContext(AuthContext);
  console.log(uid);

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
            <Route path="/change_password" Component={ChangePassword} />
        </Routes>

        <div
          className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${isSidebarOpen && 'overflow-hidden'}`}
        >
            <Sidebar />

            <div className="flex flex-col flex-1 w-full">
              <Header />
              <Main>
                <Routes>
                <Route path="/" Component={Dashboard} />
                  {
                    routes.map( route => 
                      <Route path={`/app${route.path}`} Component={route.component} />
                    )
                  }
                </Routes>
              </Main>
            </div>
        </div>
      </div>
        
    }
      {/* <Router>
        <AccessibleNavigationAnnouncer />
        <Switch>
          <Route path="/login" Component={Login} />
          <Route path="/create-account" Component={CreateAccount} />
          <Route path="/forgot-password" Component={ForgotPassword} />
          <Route path="/change_password" Component={ChangePassword} /> */}

          {/* Place new routes over this */}
          {/* <Route path="/app" Component={Layout} /> */}
          {/* If you have an index page, you can remothis Redirect */}
          {/* <Redirect exact from="/" to="/login" />
        </Switch>
      </Router> */}
  </div>
  )
}

export default App
