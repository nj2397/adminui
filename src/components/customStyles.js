import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import { pink } from "@mui/material/colors";

//-------------Custom CSS Styles---------------------//

const useStyles = makeStyles({
  root: {
    [`& fieldset`]: {
      borderRadius: 200
    }
  },

  button: {
    backgroundColor: "#e8336d !important",
    color: "honeydew !important",
    textTransform: "none !important",
    float: "left !important",
    "&:hover": {
      backgroundColor: "#be1053 !important",
      color: "honeydew !important"
    },
    borderRadius: "100px !important",
    marginTop: "10px !important"
  },

  row: {
    backgroundColor: "#dddddd !important",
    color: "black !important"
  },

  activePageButtons: {
    maxWidth: "50px !important",
    maxHeight: "50px !important",
    minWidth: "30px !important",
    minHeight: "30px !important",
    borderRadius: "100% !important",
    margin: "5px !important",
    backgroundColor: "#A459D1 !important",
    color: "white !important"
  },

  normalPageButtons: {
    maxWidth: "50px !important",
    maxHeight: "50px !important",
    minWidth: "30px !important",
    minHeight: "30px !important",
    borderRadius: "100% !important",
    margin: "5px !important"
  },

  navButtons: {
    maxWidth: "50px !important",
    maxHeight: "50px !important",
    minWidth: "30px !important",
    minHeight: "30px !important",
    borderRadius: "100% !important",
    margin: "5px !important"
  }
});

//-------Custom Theme Palette------------------------//

const theme = createTheme({
  palette: {
    primary: {
      // main: "#ffa567"
      main: pink[600]
    }
  }
});

//---------------------------------------------------//

export { useStyles, theme };
