import React from "react";
import { TextField, Grid, InputAdornment, IconButton } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";

const Input = ({
  name,
  handleChange,
  label,
  half,
  autoFocus,
  type,
  handleShowPassword,
}) => (
  <Grid item xs={12} sm={half ? 6 : 12}>
    <TextField
      name={name}
      onChange={handleChange}
      variant="outlined"
      required
      fullWidth
      label={label}
      autoFocus={autoFocus}
      type={type}
      InputProps={
        name === "password"
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword}>
                    {type === "password" ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon style={{ color: "#666" }} />
                </InputAdornment>
              ),
            }
          : {
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleOutlinedIcon style={{ color: "#666" }} />
                </InputAdornment>
              ),
            }
      }
    />
  </Grid>
);

export default Input;
