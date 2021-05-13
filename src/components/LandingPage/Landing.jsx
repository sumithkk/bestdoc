import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Tabs, Tab, Content } from "../Tab/tab";
import { getRequest } from "../../actions/request";
import Form from "../Form/Form";
import Requests from "../Requests/Requests";
import styled from "styled-components";
import { Loader } from "../Loader/loader";

const ContainerFluid = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  margin: 0 auto;
  background: #fff;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  background: #fff;
  position: relative;
  @media (min-width: 1024px) {
    width: 1024px;
    max-width: 1024px;
  }
`;

const Landing = () => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(0);
  const { isLoading } = useSelector((state) => state.app);
  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();

  const handleClick = (e) => {
    const index = parseInt(e.target.id, 0);
    if (index !== active) {
      setActive(index);
    }
  };

  useEffect(() => {
    if (active === 1) {
      dispatch(getRequest());
    }
  }, [active, dispatch]);

  if (!user) {
    history.push(`/auth`);
  }

  return (
    <ContainerFluid>
      <Container>
        <Tabs>
          <Tab onClick={(e) => handleClick(e)} active={active === 0} id={0}>
            New Request
          </Tab>

          <Tab onClick={(e) => handleClick(e)} active={active === 1} id={1}>
            All Requests
          </Tab>
        </Tabs>
        <>
          {isLoading && (
            <Loader>
              <div className="loaderWrap">
                <div></div>
                <div></div>
              </div>
            </Loader>
          )}
          <Content active={active === 0}>
            <Form />
          </Content>
          <Content active={active === 1}>
            <Requests />
          </Content>
        </>
      </Container>
    </ContainerFluid>
  );
};

export default Landing;
