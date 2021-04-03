import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Airline from "./containers/Airline/Airline";
import Airlines from "./containers/airlines/Airlines";

const App = () => {
    return (
        <Switch>
            <Route exact path="/" component={Airlines} />
            <Route exact path="/:slug" component={Airline} />
        </Switch>
    );
};

export default App;
