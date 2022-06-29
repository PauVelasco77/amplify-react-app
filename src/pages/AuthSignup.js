import { useState } from "react";
import { Auth } from "aws-amplify";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import { Lock } from "@mui/icons-material";
import { red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";

const AuthSignup = ({ setLoading }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("You are not signed up!");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      if (email && password && username) {
        const { user } = await Auth.signUp({
          username: username,
          password: password,
          attributes: {
            email: email,
          },
        });
        console.log(user);
        setMessage("You are signed up!");
        navigate("/");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: red[500] }}>
              <Lock sx={{ bgcolor: red[500] }} />
            </Avatar>
            <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                autoComplete="off"
                error={message.includes("Username")}
                fullWidth
                margin="normal"
                required
                label={message.includes("Username") ? message : "username"}
                name="username"
                type="text"
                value={username}
                onChange={onChange}
                autoFocus
              />
              <TextField
                error={message.includes("email")}
                fullWidth
                margin="normal"
                required
                label={message.includes("email") ? message : "email"}
                name="email"
                type="email"
                value={email}
                onChange={onChange}
                autoFocus
              />
              <TextField
                error={message.includes("Password")}
                fullWidth
                margin="normal"
                required
                label={message.includes("Password") ? message : "password"}
                name="password"
                type="password"
                value={password}
                onChange={onChange}
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Signup
              </Button>
              <p>{message}</p>
            </Box>
            <p>
              Already an user?{" "}
              <Link href="/" underline="hover" onClick={() => setLoading(true)}>
                Login
              </Link>
            </p>
          </Box>
        </CssBaseline>
      </Container>
    </>
  );
};

export default AuthSignup;
