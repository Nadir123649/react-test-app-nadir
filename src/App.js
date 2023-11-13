import MainRoute from "./Routes";
import AuthState from "./context";

function App() {
  return (
    <div className="App">
      <AuthState>
        <MainRoute />
      </AuthState>
    </div>
  );
}

export default App;
