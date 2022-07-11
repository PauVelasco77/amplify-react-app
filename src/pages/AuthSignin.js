import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Box } from "@mui/system";
import { Avatar, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { red } from "@mui/material/colors";
import { Face } from "@mui/icons-material";
import Link from "@mui/material/Link";

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
      }
    })();
  }, [navigate, props]);

  const onSubmit = async (e) => {
    e.preventDefault();
    props.setLoading(true);
    if (username === "") {
      setMessage("Please enter a username");
      props.setLoading(false);
    } else if (password === "") {
      setMessage("Please enter a password");
      props.setLoading(false);
    } else {
      try {
        await Auth.signIn(username, password);
        props.setIsSignedIn(true);
        navigate("/");
      } catch (error) {
        console.log("error signing in:", error);
        setMessage(error.message);
        props.setLoading(false);
      }
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
              <Face sx={{ bgcolor: red[500] }} />
            </Avatar>
            <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                error={message.match(/username/i)}
                fullWidth
                margin="normal"
                required
                label={
                  message.match(/username/i) ? message : "username or email"
                }
                name="username"
                type="text"
                value={username}
                onChange={onChange}
                autoFocus
              />
              <TextField
                autoComplete="off"
                error={message.match(/password/i)}
                fullWidth
                margin="normal"
                required
                label={message.match(/password/i) ? message : "password"}
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
                Login
              </Button>
            </Box>
            <p>
              Dont have an account?{" "}
              <Link
                href="/signup"
                underline="hover"
                onClick={() => props.setLoading(true)}
              >
                Signup here
              </Link>
            </p>
          </Box>
        </CssBaseline>
      </Container>
    </>
  );
};

export default AuthSignin;
