import {  Router } from "./Router";
import "./assets/theme";
import "./assets/reset.css";
import "./assets/style.css";
import { Header } from "./components/templates/Header";

function App() {

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
