import { Router } from "./Router";
import { Header } from "./components/templates/Header";
import React from "react";

const App = () => {
    return (
      <>
        <Header />
          <main className="c-main">
            <Router />
          </main>
      </>
      
    ); 
}
  

export default App;
