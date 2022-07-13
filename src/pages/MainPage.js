import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { CssBaseline, Typography } from "@mui/material";
import { Box } from "@mui/system";
import GenericButton from "../components/GenericButton";

const MainPage = (props) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { username } = await Auth.currentAuthenticatedUser();
        setUsername(username);
        props.setLoading(false);
      } catch (error) {
        props.setLoading(false);
        navigate("/signin");
      }
    })();
  }, [navigate, props]);

  const onClick = async () => {
    props.setLoading(true);
    try {
      await Auth.signOut();
      navigate("/signin");
      props.setIsSignedIn(false);
      props.setLoading(false);
    } catch (error) {
      console.log("error signing out:", error);
      props.setLoading(false);
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
            }}
          >
            <Typography align="center" variant="h4">
              USERNAME: {username}
            </Typography>

            <GenericButton
              textButton="Logout"
              actionOnClick={() => onClick()}
              message={""}
            />
          </Box>
        </CssBaseline>
      </Container>
    </>
  );
};
export default MainPage;
