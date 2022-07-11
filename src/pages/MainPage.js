import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import SignoutButton from "../components/SignoutButton";
import { useEffect } from "react";
import styled from "styled-components";

const LogoutContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: yellow;
`;

const MainPage = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    props.setLoading(true);
    (async () => {
      try {
        const hola = await Auth.currentAuthenticatedUser();
        console.log("hola", hola);
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
      <LogoutContainer>
        <SignoutButton onClick={onClick} />
      </LogoutContainer>
    </>
  );
};
export default MainPage;
