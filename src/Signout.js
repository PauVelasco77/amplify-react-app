import { Auth } from "aws-amplify";
import { useEffect } from "react";

const Signout = (props) => {
  useEffect(() => {
    (async () => {
      try {
        const data = await Auth.currentAuthenticatedUser();
        if (data) {
          props.setIsSignedIn(true);
        }
      } catch (error) {
        console.log("error signing in:", error);
      }
    })();
  }, [props]);

  const onClick = async () => {
    try {
      await Auth.signOut();
      props.setIsSignedIn(false);
    } catch (error) {
      console.log("error signing out:", error);
    }
  };

  return (
    <>
      <button onClick={onClick}>Logout</button>
    </>
  );
};

export default Signout;
