import MainRoute from "./routes";
import AuthState from "./context";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <AuthState>
        <Toaster position="top-right" />
        <MainRoute />
      </AuthState>
    </div>
  );
}

export default App;
