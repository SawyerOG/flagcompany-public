import React from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';

import Home from '../src/Containers/Home';
import CustomerLocations from './Containers/LocationCollection/CustomerLocations';
import Routes from './Containers/MonthlyRoutes/MonthlyRoutes';
import InventoryManagement from './Containers/InventoryManagement/InventoryManagement';
import Jobs from './Containers/Jobs/Jobs';
import Schedule from './Containers/Schedules/Schedule';

const App: React.FC = () => {
    let content;

    //if user is not logged in we will have an auth route someday

    //else they are logged in.
    content = (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/customerLocations" component={CustomerLocations} />
            <Route path="/monthlyRoutes" component={Routes} />
            <Route path="/inventoryMgmt" component={InventoryManagement} />
            <Route path="/jobs" component={Jobs} />
            <Route path="/schedule" component={Schedule} />
            <Redirect to="/" />
        </Switch>
    );

    return <>{content}</>;
};

export default withRouter(App);
