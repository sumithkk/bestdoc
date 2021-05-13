import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Typography, Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { signin } from "../../actions/auth";
import useStyles from "./styles";
import Input from "./Input";
import { Loader } from "../Loader/loader";

const initialState = { username: "", password: "" };

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { isLoading } = useSelector((state) => state.app);

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(signin(form, history));
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

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
