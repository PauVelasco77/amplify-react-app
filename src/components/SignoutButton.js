import { Auth } from "aws-amplify";

const SignoutButton = (props) => {
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

export default SignoutButton;
