import { useState } from "react";
import "./App.css";
import AuthSignin from "./pages/AuthSignin";
import AuthSignup from "./pages/AuthSignup";
import { Route, Routes } from "react-router-dom";
import LoadingSpinner from "./components/Layout/LoadingSpinner";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <LoadingSpinner loading={loading}>
        <Routes>
          <Route
            path="/"
            element={
              <AuthSignin
                setIsSignedIn={setIsSignedIn}
                isSignedIn={isSignedIn}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <AuthSignup
                setLoading={setLoading}
                setIsSignedIn={setIsSignedIn}
                isSignedIn={isSignedIn}
              />
            }
          />
        </Routes>
      </LoadingSpinner>
    </>
  );
}

export default App;
