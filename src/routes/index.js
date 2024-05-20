import { lazy } from 'react'

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import('../pages/Dashboard'))
const Payouts = lazy(()=> import('../pages/Payouts'))
const Settings = lazy(()=> import('../pages/Settings'))
const SimpleForm = lazy(()=> import('../pages/SimpleForm'))
const FileUpload = lazy(()=> import('../pages/FileUpload'))
const SummaryAndPayment = lazy(()=> import('../pages/SummaryAndPayment'))
const CreatorApplications = lazy(() => import('../pages/CreatorApplications'))
const Deposit = lazy(()=> import('../pages/Deposit'))
const Forms = lazy(() => import('../pages/Forms'))
const Cards = lazy(() => import('../pages/Cards'))
const Charts = lazy(() => import('../pages/Charts'))
const Buttons = lazy(() => import('../pages/Buttons'))
const Modals = lazy(() => import('../pages/Modals'))
const Tables = lazy(() => import('../pages/Tables'))
const Page404 = lazy(() => import('../pages/404'))
const Blank = lazy(() => import('../pages/Blank'))

/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [
  {
    path: '/', // the url
    component: Dashboard,
  },
  {
    path: '/app/dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/app/payouts',
    component: Payouts
  },
  {
    path: '/app/creator_applications',
    component: CreatorApplications,
  },
  {
    path: '/app/settings',
    component: Settings
  },
  {
    path: '/app/simple_form',
    component: SimpleForm
  },
  {
    path: '/app/file_upload',
    component: FileUpload
  },
  {
    path: '/app/summary_payment',
    component: SummaryAndPayment
  },
  {
    path: '/app/add_funds',
    component: Deposit,
  },
  {
    path: '/app/forms',
    component: Forms,
  },
  {
    path: '/app/cards',
    component: Cards,
  },
  {
    path: '/app/charts',
    component: Charts,
  },
  {
    path: '/app/buttons',
    component: Buttons,
  },
  {
    path: '/app/modals',
    component: Modals,
  },
  {
    path: '/app/tables',
    component: Tables,
  },
  {
    path: '/app/404',
    component: Page404,
  },
  {
    path: '/app/blank',
    component: Blank,
  },
]

export default routes
