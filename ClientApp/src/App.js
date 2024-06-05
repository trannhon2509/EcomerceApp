import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import AuthorizeRoute from "./components/api-authorization/AuthorizeRoute";
import "./custom.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ProductProvider } from "./context/ProductContext";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <ProductProvider>
        <Provider store={store}>
          <Routes>
            {AppRoutes.map((route, index) => {
              const {
                element,
                requireAuth,
                layout: Layout = React.Fragment,
                ...rest
              } = route;
              const RouteElement = requireAuth ? (
                <AuthorizeRoute
                  {...rest}
                  element={<Layout>{element}</Layout>}
                />
              ) : (
                <Layout>{element}</Layout>
              );
              return <Route key={index} {...rest} element={RouteElement} />;
            })}
          </Routes>
        </Provider>
      </ProductProvider>
    );
  }
}
