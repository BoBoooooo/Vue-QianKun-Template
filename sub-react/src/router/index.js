import React from "react";
import { Router, Route, Switch } from "dva/router";
import dynamic from "dva/dynamic";

const menuGlobal = [
  {
    id: "app",
    pid: "0",
    name: "App页",
    icon: "user",
    path: "/",
    component: () => import("../views/App.tsx"),
  },
  {
    id: "hello",
    pid: "0",
    name: "Hello页面",
    icon: "user",
    path: "/hello",
    models: () => [import("../models/Hello.ts")], //models可多个
    component: () => import("../views/Hello.tsx"),
  },
  {
    id: "test",
    pid: "0",
    name: "Test页面",
    icon: "user",
    path: "/test",
    models: () => [import("../models/Test.ts"), import("../models/Hello.ts")], //models可多个
    component: () => import("../views/Test.tsx"),
  },
];

function RouterConfig({ history, app }) {
  return (
    <Router history={history}>
      <Switch>
        {menuGlobal.map(({ path, ...dynamics }, index) => (
          <Route
            key={index}
            path={path}
            exact
            component={dynamic({
              app,
              ...dynamics,
            })}
          />
        ))}
      </Switch>
    </Router>
  );
}

export default RouterConfig;
