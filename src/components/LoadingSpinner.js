import CircularProgress from "@mui/material/CircularProgress";
import { lightBlue } from "@mui/material/colors";
import styled from "styled-components";
import Box from "@mui/material/Box";

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
`;

const LoadingSpinner = () => {
  return (
    <LoadingContainer>
      <Box sx={{ position: "relative" }}>
        <CircularProgress
          variant="indeterminate"
          sx={{ color: lightBlue[400] }}
        />
      </Box>
    </LoadingContainer>
  );
};

export default LoadingSpinner;
