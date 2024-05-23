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
const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    requireAuth: true,
    element: <FetchData />
  },
  {
    path: '/fetch-user',
    requireAuth: true,
    element: <UserComponent />
  },
  {
    path: '/fetch-product',
    requireAuth: true,
    element: <ProductComponent />
  },
  {
    path: '/fetch-categories',
    requireAuth: true,
    element: <CategoriesComponent />
  },
  {
    path: '/fetch-blogPosts',
    requireAuth: true,
    element: <BlogPostComponent />
  },
  {
    path: '/fetch-orders',
    requireAuth: true,
    element: <OrderComponent />
  },
  {
    path: '/fetch-blogs',
    requireAuth: true,
    element: <BlogComponent />
  },
  {
    path: '/fetch-coupons',
    requireAuth: true,
    element: <CouponComponent />
  },
  {
    path: '/fetch-chat',
    requireAuth: true,
    element: <Chat />
  },

  ...ApiAuthorzationRoutes
];

export default AppRoutes;
