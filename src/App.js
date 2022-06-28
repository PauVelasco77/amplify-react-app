import { useState } from "react";
import "./App.css";
import AuthSignin from "./pages/AuthSignin";
import AuthSignup from "./pages/AuthSignup";
import { Route, Routes } from "react-router-dom";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <AuthSignin setIsSignedIn={setIsSignedIn} isSignedIn={isSignedIn} />
          }
        />
        <Route
          path="/signup"
          element={
            <AuthSignup setIsSignedIn={setIsSignedIn} isSignedIn={isSignedIn} />
          }
        />
      </Routes>
    </>
  );
}

export default App;
