import { Router } from "./Router";
import { Header } from "./components/templates/Header";
import React from "react";
import { useSelector } from "react-redux";
import { getIsSignedIn } from "./redux/users/selector";

const App = () => {
  const selector = useSelector(state => state)
  const isSignedIn = getIsSignedIn(selector)
    return (
      <>
        {isSignedIn && (
          <Header />
        )}
          <main className="c-main">
            <Router />
          </main>
      </>
      
    ); 
}
  
export default App;
