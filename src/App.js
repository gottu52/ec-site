import { Router } from "./Router";
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
