import { Route, Switch } from "react-router";
import { SignUp } from "./components/templates/SignUp";
import { SignIn } from "./components/templates/SignIn";
import { Auth } from "./Auth";
import { PasswordReset } from "./components/templates/PasswordReset";
import { ProductEdit } from "./components/templates/ProductEdit";
import { ProductList } from "./components/templates/ProductList";

export const Router = () => {
    return (
        <Switch>
            <Route exact path="/signUp" component={SignUp} />
            <Route exact path="/signIn" component={SignIn} />
            <Route exact path="/passwordReset" component={PasswordReset} />
            <Auth>
               <Route exact path="(/)?" component={ProductList} /> 
               <Route path="/productEdit(/:id)?" component={ProductEdit} />
            </Auth>
        </Switch>
    )
}
