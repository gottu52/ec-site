import { Route, Switch } from "react-router";
import { SignUp } from "./components/templates/SignUp";
import { SignIn } from "./components/templates/SignIn";
import { Auth } from "./Auth";
import { PasswordReset } from "./components/templates/PasswordReset";
import { ProductEdit } from "./components/templates/ProductEdit";
import { ProductList } from "./components/templates/ProductList";
import { ProductDetail } from "./components/templates/ProductDetail";
import { CartList } from "./components/templates/CartList";
import { OrderConfirm } from "./components/templates/OrderConfirm";
import { OrderComplete } from "./components/templates/OrderComplete";
import { OrderHistory } from "./components/templates/OrderHistory";
import { FavoriteList } from "./components/templates/FavoriteList";

export const Router = () => {
    return (
        <Switch>
            <Route exact path="/signUp" component={SignUp} />
            <Route exact path="/signIn" component={SignIn} />
            <Route exact path="/passwordReset" component={PasswordReset} />
            <Auth>
               <Route exact path="(/)?" component={ProductList} /> 
               <Route exact path="/product/:id" component={ProductDetail} />
               <Route path="/productEdit(/:id)?" component={ProductEdit} />
               <Route path="/cart" component={CartList} />
               <Route path="/favorite" component={FavoriteList} />
               <Route path="/order/confirm" component={OrderConfirm} />
               <Route path="/order/complete" component={OrderComplete} />
               <Route path="/order/history" component={OrderHistory} />
            </Auth>
        </Switch>
    )
}
