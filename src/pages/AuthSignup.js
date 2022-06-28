import { useState } from "react";
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";

const AuthSignup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("You are not signed up!");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = await Auth.signUp({
        username: username,
        password: password,
        attributes: {
          email: email,
        },
      });
      console.log(user);
      setMessage("You are signed up!");
    } catch (error) {
      setMessage(error.message);
      console.log("error signing up:", error);
    }
  };

  const onChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
    if (e.target.name === "username") {
      setUsername(e.target.value);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="username">username</label>
        <input type={username} name="username" onChange={onChange} />
        <label htmlFor="email">email</label>
        <input type={email} name="email" onChange={onChange} />
        <label htmlFor="password">password</label>
        <input type={password} name="password" onChange={onChange} />
        <button type="submit">Signup</button>
        <p>{message}</p>
      </form>
      <p>
        Already an user? <Link to={"/"}>Login</Link>
      </p>
    </div>
  );
};

export default AuthSignup;
