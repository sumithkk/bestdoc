import React, { useState, useEffect } from "react";
import { AppBar, Avatar, Button, Toolbar } from "@material-ui/core";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import * as actionType from "../../constants/actionTypes";
import useStyles from "./styles";

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push("/auth");

    setUser(null);
  };

  useEffect(() => {
    const token = profile?.token;
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setProfile(JSON.parse(localStorage.getItem("profile")));
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [location.pathname]);

  return (
    <AppBar position="fixed" color="default" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.brandContainer}>
          <Avatar
            className={classes.purple}
            alt={user?.username}
            src={user?.organization?.config?.logoUrl}
          >
            {user?.username.charAt(0)}
          </Avatar>
          <p style={{ marginLeft: "15px" }}>{user?.username}</p>
        </div>
        {user?.id ? (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
              size="medium"
            >
              Logout
            </Button>
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              component={Link}
              to="/auth"
              variant="contained"
              color="primary"
              size="medium"
            >
              Login
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
