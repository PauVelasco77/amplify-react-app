import { Auth } from "aws-amplify";
import { useState } from "react";

const AuthSignin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("You are not signed in!");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await Auth.signIn(username, password);
      console.log("You are signed in!");
      setMessage("You are signed in!");
    } catch (error) {
      console.log("error signing in:", error);
    }
  };

  const onChange = (e) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="username">username</label>
      <input type={username} name="username" onChange={onChange} />
      <label htmlFor="password">password</label>
      <input type={password} name="password" onChange={onChange} />
      <button type="submit">Signup</button>
      <p>{message}</p>
    </form>
  );
};

export default AuthSignin;
