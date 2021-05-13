import styled from "styled-components";

export const Tabs = styled.div`
  overflow: hidden;
  background: #fff;
  font-family: Open Sans;
  height: 3em;
  border-bottom: 1px solid #bfbfbf;
`;

export const Tab = styled.button`
  border: none;
  padding: 0 25px;
  outline: none;
  cursor: pointer;
  position: relative;
  font-size: 1em;
  border: none;
  font-weight: bold;
  border-bottom: ${(props) =>
    props.active ? "4px solid #2D59B8" : "4px solid transparent"};
  background-color: #fff;
  color: ${(props) => (props.active ? "#444" : "gray")};
  height: 3em;
  transition: background-color 0.5s ease-in-out;

  :hover {
    background-color: white;
  }
`;
export const Content = styled.div`
  ${(props) => (props.active ? "" : "display:none")};
  padding: 15px;
  min-height: 50vh;
`;
