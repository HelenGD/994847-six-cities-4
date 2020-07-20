import * as React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {connect} from "react-redux";

import Main from '../main/main';
import OfferDetails from '../offer-details/offer-details';
import SignIn from '../sign-in/sign-in';
import Favorites from '../favorites/favorites';

interface Props {
  authorizationStatus: string
}

const App: React.FC<Props> = (props) => {
  const {authorizationStatus} = props;
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/offer/:id">
          <OfferDetails />
        </Route>
        <Route exact path="/sign-in">
          {authorizationStatus === `AUTH` && <Redirect to="/" />}
          <SignIn />
        </Route>
        <Route exact path="/favorites">
          {authorizationStatus !== `AUTH` && <Redirect to="/sign-in" />}
          <Favorites />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => ({
  authorizationStatus: state.user.authorizationStatus,
});

export {App};
export default connect(mapStateToProps)(App);
