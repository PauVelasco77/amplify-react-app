import { useState } from "react";
import UserPool from "./UserPool";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    console.log("email: ", email);
    e.preventDefault();
    await UserPool.signUp(email, password, [], null, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    });
  };

  const onChange = (e) => {
    if (e.target.value === "email") {
      setEmail(e.target.value);
      console.log(email, password);
    }
    if (e.target.value === "password") {
      setPassword(e.target.value);
      console.log(email, password);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">email</label>
        <input type={email} name="email" onChange={onChange} />
        <label htmlFor="password">password</label>
        <input type={password} name="password" onChange={onChange} />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
