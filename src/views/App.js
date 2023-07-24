/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';
import AdminLayout from 'layouts/Admin';
import HomeLayout from 'layouts/Home';

function App() {
    const [isAuthenticated] = useState(false);

    useEffect(() => {}, []);

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        //a
        <>
            {isAuthenticated ? (
                <Switch>
                    <Route
                        path="/private"
                        render={(props) => <AdminLayout {...props} />}
                    />
                    <Redirect from="/" to="/admin/user-profile" />
                </Switch>
            ) : (
                <Switch>
                    <Route
                        exact
                        path="/login"
                        render={(props) => <HomeLayout {...props} />}
                    />
                    <Route
                        path="/private"
                        render={(props) => <AdminLayout {...props} />}
                    />
                    <Redirect from="*" to="/login" />
                </Switch>
            )}
        </>
    );
}

export default App;
