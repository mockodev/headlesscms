import "./App.css";
import useAnimals from "./useAnimals";

function App() {
  useAnimals();
  return (
    <div className="App">
      <div className="container">
        <header>
          <div className="wrapper"></div>
          <span>React and Contentful</span>
        </header>
        <main>
          <div className="wrapper"></div>
        </main>
      </div>
    </div>
  );
}

export default App;
