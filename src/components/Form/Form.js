import React, { useState, useEffect } from "react";
import { TextField, Button, CircularProgress } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { createRequest } from "../../actions/request";
import useStyles from "./styles";
import { useDebounce, useForm, validate } from "../../helpers/customHooks";
import { Autocomplete } from "@material-ui/lab";

const FieldWrap = styled.div`
  width: 100%;
  display: flex;

  @media (max-width: 426px) {
    flex-direction: column;
  }
`;
const ButtonWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;
  small {
    color: #666;
    margin-bottom: 15px;
  }
  @media (max-width: 426px) {
    flex-direction: column;
    Button {
      width: 100%;
    }
  }
`;

const Form = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const { values, errors, handleChange, handleSubmit, setValues } = useForm(
    submitForm,
    validate
  );

  // handle search
  useEffect(() => {
    // let active = true;
    (async () => {
      if (debouncedSearchTerm) {
        setLoading(true);
        searchCharacters(debouncedSearchTerm).then((results) => {
          if (results) {
            setLoading(false);
            setOpen(true);
            setOptions(results);
          }
        });
      } else {
        setOpen(false);
        setOptions([]);
      }
    })();

    // return () => {
    //   active = false;
    // };
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  // API search function
  function searchCharacters(search) {
    return fetch(
      `https://apiconcierge.dev.bestdocapp.in/api/v1/bed/search?searchKey=${search}&locationId=KWmND96o17`,
      {
        method: "GET",
      }
    )
      .then((r) => r.json())
      .then((r) => {
        return r;
      })
      .catch((error) => {
        console.error(error);
        return [];
      });
  }

  // Clear form
  const clear = () => {
    setValues({
      unitId: "",
      requestedMobile: "",
      service: "",
      notes: "",
    });
    setSearchTerm("");
  };

  // Function Submit
  function submitForm() {
    if (values.unitId === "") {
      setErr("Please choose from search dropdown");
      return;
    }
    dispatch(createRequest({ ...values, createdBy: user.id }, history));
    clear();
  }

  // Handle dropdown selection
  const setOption = (val) => {
    options.filter((a) => {
      if (a.name === val) {
        setValues({ ...values, unitId: a.id });
      }
      return true;
    });
  };
  console.log(values.unitId);
  return (
    <div style={{ position: "relative" }}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
      >
        <FieldWrap>
          <Autocomplete
            id="Room"
            style={{ width: "100%", marginRight: "25px" }}
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            onChange={(e) => setOption(e.target.innerHTML)}
            getOptionLabel={(option) => option.name}
            options={options}
            loading={loading}
            renderInput={(params) => (
              <TextField
                pattern="[1-9]{1}[0-9]{9}"
                error={err === "" ? false : true}
                helperText={err}
                {...params}
                label="Room/Ward-Unit Number"
                variant="outlined"
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />
          <TextField
            name="requestedMobile"
            variant="outlined"
            label="Requester's Phone Number"
            fullWidth
            error={
              errors.requestedMobile || errors.requestedMobile === ""
                ? true
                : false
            }
            helperText={errors.requestedMobile}
            rows={1}
            value={values.requestedMobile}
            onChange={handleChange}
          />
        </FieldWrap>
        <TextField
          name="service"
          variant="outlined"
          label="Service"
          fullWidth
          error={errors.service || errors.service === "" ? true : false}
          helperText={errors.service}
          value={values.service}
          onChange={handleChange}
        />
        <TextField
          name="notes"
          variant="outlined"
          label="Request Notes"
          fullWidth
          multiline
          rows={4}
          value={values.notes}
          onChange={handleChange}
        />
        <ButtonWrap>
          <small>*indicates required field</small>
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="medium"
            type="button"
            onClick={handleSubmit}
            disabled={
              values.unitId === "" ||
              values.requestedMobile === "" ||
              values.service === ""
            }
          >
            Create Request
          </Button>
        </ButtonWrap>
      </form>
    </div>
  );
};

export default Form;
