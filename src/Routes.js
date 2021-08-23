import React, { lazy, Suspense, Fragment } from "react";
import { Switch, Route } from "react-router-dom";
// import LoadingScreen from "src/components/LoadingScreen";
import Layout from './hoc/Layout';

const routesConfig = [
    {
        path: "/tracking-shipment",
        component: lazy(() => import("./views/Shipment")),
        layout: Layout,

    },
    {
        exact: true,
        path: "/",
        component: lazy(() => import("./views/Home")),
        layout: Layout,
    },
];
const renderRoutes = (routes) =>
    routes ? (
        <Suspense fallback={<div></div>}>
            <Switch>
                {routes.map((route, i) => {
                    const Layout = route.layout || Fragment;
                    const Component = route.component;

                    return (
                        <Route
                            key={i}
                            path={route.path}
                            exact={route.exact}
                            render={(props) => (
                                <Layout>
                                    {route.routes ? (
                                        renderRoutes(route.routes)
                                    ) : (
                                        <Component {...props} />
                                    )}
                                </Layout>
                            )}
                        />
                    );
                })}
            </Switch>
        </Suspense>
    ) : null;

function Routes() {
    return renderRoutes(routesConfig);
}

export default Routes;


