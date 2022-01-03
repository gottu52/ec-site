import { Route, Switch } from "react-router";
import { Home } from "./components/templates/Home";
import { Login } from "./components/templates/Login";
import { SignUp } from "./components/templates/SignUp";

export const Router = () => {
    return (
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="(/)?" component={Home} />
            <Route exact path="/signUp" component={SignUp} />
        </Switch>
    )
}
