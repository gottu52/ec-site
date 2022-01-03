import { Route, Switch } from "react-router";
import { Home } from "./components/templates/Home";
import { Login } from "./components/templates/Login";

export const Router = () => {
    return (
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="(/)?" component={Home} />
        </Switch>
    )
}
