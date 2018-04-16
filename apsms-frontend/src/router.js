import { Router} from 'dva/router';
import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import dynamic from 'dva/dynamic'
import {app} from './index'

function RouterConfig({ history}) {
    const routes = [
      {
        path: `/register`,
        models: () => [import('./models/register')],
        component: () => import('./routes/RegisterUser'),
      }
      ,
      {
        path: `/login`,
        models: () => [import('./models/login')],
        component: () => import('./routes/LoginApsms'),
      },
      {
        path: `/apsms`,
        models: () => [import('./models/apsms')],
        component: () => import('./routes/Apsms'),
      }
      ,
      {
        path: `/users`,
        models: () => [import('./models/user')],
        component: () => import('./routes/UserCrud'),
      }
    ]
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact render={() => (<Redirect to="/apsms" />)} />
          {
            routes.map(({ path, ...dynamics }, key) => (
              <Route
                exact
                key={key}
                path={path}
                component={dynamic({ app, ...dynamics })}
              />
            ))
          }
          {/* <Route component={error} /> */}
          {/* <Route path="/apsms" exact component={LoginApsms} /> */}
        </Switch>
      </Router>
    )
}

export default RouterConfig;
