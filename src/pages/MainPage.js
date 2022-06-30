import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import SignoutButton from "../components/SignoutButton";
import { useEffect } from "react";

const MainPage = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    props.setLoading(true);
    (async () => {
      try {
        await Auth.currentAuthenticatedUser();
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
  console.log("MainPage props:", props);
  return (
    <>
      <SignoutButton onClick={onClick} />
    </>
  );
};
export default MainPage;
