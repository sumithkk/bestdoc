import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Loader } from "../Loader/loader";
import Request from "./Request/Request";
import useStyles from "./styles";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 25px;
  @media (max-width: 426px) {
    font-size: 1rem;
    grid-template-columns: auto;
  }
`;

const Requests = () => {
  const { request, isLoading } = useSelector((state) => state.requests);
  const classes = useStyles();

  if (!request?.length && !isLoading) {
    return "No Requests";
  }
  return !request?.length || isLoading ? (
    <Loader>
      <div></div>
      <div></div>
    </Loader>
  ) : (
    <Container
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {request?.map((req) => (
        <Request key={req.id} request={req} />
      ))}
    </Container>
  );
};

export default Requests;
