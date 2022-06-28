import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";

const AuthSignin = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("You are not signed in!");

  useEffect(() => {
    (async () => {
      try {
        const data = await Auth.currentAuthenticatedUser();
        if (data) {
          props.setIsSignedIn(true);
          setMessage(`You are signed in! ${data.username}`);
        }
      } catch (error) {
        props.setIsSignedIn(false);
        setMessage("You are not signed in!");
      }
    })();
  }, [props]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await Auth.signIn(username, password);
      props.setIsSignedIn(true);
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
      <label htmlFor="username">username or email</label>
      <input type={username} name="username" onChange={onChange} />
      <label htmlFor="password">password</label>
      <input type={password} name="password" onChange={onChange} />
      <button type="submit">Signup</button>
      <p>{message}</p>
    </form>
  );
};

export default AuthSignin;
