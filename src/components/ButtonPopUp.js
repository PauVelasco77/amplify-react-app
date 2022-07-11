import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { red } from "@mui/material/colors";

const ButtonPopUp = ({ textButton, message }) => {
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <Button
            {...bindTrigger(popupState)}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {textButton}
          </Button>
          {message === "User is not confirmed." && (
            <Popover
              {...bindPopover(popupState)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <Typography sx={{ p: 2, color: red[500] }}>{message}</Typography>
            </Popover>
          )}
        </div>
      )}
    </PopupState>
  );
};

export default ButtonPopUp;
