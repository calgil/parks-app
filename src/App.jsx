import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./Components/Layout/Layout";
import { StatesMap } from "./Components/StatesMap/StatesMap";
import { SignUpForm } from "./Components/SignUpForm/SignUpForm";
import { AuthProvider } from "./providers/auth.provider";
import { Toaster } from "react-hot-toast";
import { LoginForm } from "./Components/LoginForm/LoginForm";
import { ParkProvider } from "./providers/parks.provider";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <ParkProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<StatesMap />} />
              <Route path="login" element={<LoginForm />} />
              <Route path="register" element={<SignUpForm />} />
            </Route>
          </Routes>
        </ParkProvider>
      </AuthProvider>
      <Toaster />
    </div>
  );
}

export default App;
