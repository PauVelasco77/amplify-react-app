import { useState } from "react";
import "./App.css";
import AuthSignin from "./AuthSignin";
import AuthSignup from "./AuthSignup";
import SignOut from "./Signout";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  return (
    <>
      <AuthSignup />
      <AuthSignin setIsSignedIn={setIsSignedIn} isSignedIn={isSignedIn} />
      <SignOut setIsSignedIn={setIsSignedIn} isSignedIn={isSignedIn} />
    </>
  );
}

export default App;
