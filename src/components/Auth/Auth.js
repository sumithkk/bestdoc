import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Typography, Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { signin } from "../../actions/auth";
import useStyles from "./styles";
import Input from "./Input";
import { Loader } from "../Loader/loader";
import { usePasswordValidation } from "../../helpers/customHooks";

const initialState = { username: "", password: "" };

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [
    validLength,
    hasNumber,
    upperCase,
    lowerCase,
    specialChar,
  ] = usePasswordValidation({
    password: form.password,
  });
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { isLoading } = useSelector((state) => state.app);

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !validLength ||
      !hasNumber ||
      !upperCase ||
      !lowerCase ||
      !specialChar
    ) {
      setError(true);
      return;
    }
    dispatch(signin(form, history));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{ background: "#fff", position: "relative" }}
    >
      {isLoading && (
        <Loader>
          <div className="loaderWrap">
            <div></div>
            <div></div>
          </div>
        </Loader>
      )}
      <div className={classes.paper} elevation={3}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Input
              name="username"
              label="Username"
              handleChange={handleChange}
              type="text"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
          </Grid>
          {error && (
            <div>
              {!validLength && (
                <div className={classes.error}>
                  password should have at-least 8 characters long.
                </div>
              )}
              {!hasNumber && (
                <div className={classes.error}>
                  password should contain at least 1 number.
                </div>
              )}
              {!upperCase && (
                <div className={classes.error}>
                  password should have at-least 1 lowercase letter.
                </div>
              )}
              {!lowerCase && (
                <div className={classes.error}>
                  password should have at-least 1 uppercase letter.
                </div>
              )}
              {!specialChar && (
                <div className={classes.error}>
                  password should have at-least 1 special character.
                </div>
              )}
            </div>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={form.username === "" || form.password === ""}
          >
            Login
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default SignUp;
