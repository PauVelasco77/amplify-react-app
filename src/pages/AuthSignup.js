import { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { Alert, styled, TextField } from "@mui/material";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import { Lock } from "@mui/icons-material";
import { red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";

const AlertSignup = styled(Alert)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
`;

const AuthSignup = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
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
      console.log("Please enter a username");
      setMessage("Please enter a username");
      props.setLoading(false);
    } else if (email === "") {
      setMessage("Please enter an email");
      props.setLoading(false);
    } else if (password === "") {
      setMessage("Please enter a password");
      props.setLoading(false);
    } else {
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
          // navigate("/signin");
        }
        props.setLoading(false);
      } catch (error) {
        props.setLoading(false);
        setMessage(error.message);
        console.log("error signing up:", error);
      }
    }
  };

  const onChange = (e) => {
    setMessage("");

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
      {message === "You are signed up!" && (
        <AlertSignup severity="success" color="success">
          {message}
        </AlertSignup>
      )}
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
                error={message.match(/username/i) || message.match(/user/i)}
                fullWidth
                margin="normal"
                required
                label={
                  message.match(/username/i) || message.match(/user/i)
                    ? message
                    : "username"
                }
                name="username"
                type="text"
                value={username}
                onChange={onChange}
                autoFocus
              />
              <TextField
                error={message.match(/email/i)}
                fullWidth
                margin="normal"
                required
                label={message.match(/email/i) ? message : "email"}
                name="email"
                type="email"
                value={email}
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
                Signup
              </Button>
            </Box>
            <p>
              Already an user?{" "}
              <Link
                href="/signin"
                underline="hover"
                onClick={() => props.setLoading(true)}
              >
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
