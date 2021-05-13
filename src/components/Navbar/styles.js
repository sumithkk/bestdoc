import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
  appBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    boxShadow:
      "0px 2px 4px -1px rgb(0 0 0 / 3%), 0px 4px 5px 0px rgb(0 0 0 / 4%), 0px 1px 10px 0px rgb(0 0 0 / 2%)",
    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap",
      flexDirection: "column",
    },
  },
  heading: {
    color: "rgba(0,183,255, 1)",
    textDecoration: "none",
    fontSize: "2em",
  },
  image: {
    marginLeft: "15px",
  },
  toolbar: {
    display: "flex",
    width: "1024px",
    maxWidth: "1024px",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      width: "auto",
    },
  },
  profile: {
    display: "flex",
    justifyContent: "space-between",
    width: "400px",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      width: "auto",
      marginTop: 20,
      justifyContent: "center",
    },
  },
  logout: {
    marginLeft: "20px",
  },
  userName: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));
