import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import SignoutButton from "../components/SignoutButton";
import { Link, useNavigate } from "react-router-dom";

const AuthSignin = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("You are not signed in!");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const data = await Auth.currentAuthenticatedUser();
        if (data) {
          props.setIsSignedIn(true);
          navigate("/");
        }
      } catch (error) {
        props.setIsSignedIn(false);
        setMessage("You are not signed in!");
      }
    })();
  }, [navigate, props]);

  const onSubmit = async (e) => {
    e.preventDefault();
    props.setLoading(true);
    try {
      await Auth.signIn(username, password);
      props.setIsSignedIn(true);
      navigate("/");
      props.setLoading(false);
    } catch (error) {
      console.log("error signing in:", error);
      setMessage(error.message);
      props.setLoading(false);
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
    <>
      <div>
        <form onSubmit={onSubmit}>
          <label htmlFor="username">username or email</label>
          <input type={username} name="username" onChange={onChange} />
          <label htmlFor="password">password</label>
          <input type={password} name="password" onChange={onChange} />
          <button type="submit">Signup</button>
          <p>{message}</p>
        </form>
        <SignoutButton
          setIsSignedIn={props.setIsSignedIn}
          isSignedIn={props.isSignedIn}
        />

        <p>
          Dont have an account? <Link to={"/signup"}>Signup here</Link>
        </p>
      </div>
    </>
  );
};

export default AuthSignin;
