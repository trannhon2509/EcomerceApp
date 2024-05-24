import ApiAuthorzationRoutes from '../components/api-authorization/ApiAuthorizationRoutes';
import { Counter } from "../components/Counter";
import { FetchData } from "../components/FetchData";
import { Home } from "../components/Home";
import UserComponent from '../components/UserComponent';
import ProductComponent from '../components/ProductComponent';
import CategoriesComponent from '../components/CategoriesComponent';
import BlogPostComponent from '../components/BlogPostComponent';
import OrderComponent from '../components/OrderComponent';
import BlogComponent from '../components/BlogComponent';
import CouponComponent from '../components/CouponComponent';
import Chat from '../components/Chat';
import AdminLayout from '../Layouts/AdminLayout';
import DefaultLayout from '../Layouts/DefaultLayout';
import RoutePath from './RoutePath';
import DashBoard from '../components/DashBoard';
import HomePage from '../views/HomePage';
const AppRoutes = [
  {
    index: true,
    element: <HomePage />,
    layout : DefaultLayout
  },
  {
    path: '/counter',
    element: <Counter />,
    layout: DefaultLayout
  },
  {
    path: '/fetch-data',
    requireAuth: true,
    element: <FetchData />,
    layout: AdminLayout
  },
  {
    path: RoutePath.USER,
    requireAuth: true,
    element: <UserComponent />,
    layout: AdminLayout
  },
  {
    path: RoutePath.PRODUCT,
    requireAuth: true,
    element: <ProductComponent />,
    layout: AdminLayout
  },
  {
    path: RoutePath.CATEGORIES,
    requireAuth: true,
    element: <CategoriesComponent />,
    layout: AdminLayout
  },
  {
    path: RoutePath.BLOGPOST,
    requireAuth: true,
    element: <BlogPostComponent />,
    layout: AdminLayout
  },
  {
    path: RoutePath.ORDER,
    requireAuth: true,
    element: <OrderComponent />,
    layout: AdminLayout
  },
  {
    path: RoutePath.BLOG,
    requireAuth: true,
    element: <BlogComponent />,
    layout: AdminLayout
  },
  {
    path: RoutePath.COUPON,
    requireAuth: true,
    element: <CouponComponent />,
    layout: AdminLayout
  },
  {
    path: RoutePath.CHAT,
    requireAuth: true,
    element: <Chat />,
    layout: AdminLayout
  },
  {
    path: RoutePath.DASHBOARD,
    requireAuth: true,
    element: <DashBoard />,
    layout: AdminLayout
  },

  ...ApiAuthorzationRoutes
];

export default AppRoutes;
