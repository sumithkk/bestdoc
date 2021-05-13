import styled from "styled-components";

export const Loader = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #ffffff59;
  display: flex;
  z-index: 2;
  .loaderWrap {
    display: block;
    margin: auto auto;
    position: relative;
    width: 80px;
    height: 80px;
    div {
      position: absolute;
      border: 4px solid #666;
      opacity: 1;
      border-radius: 50%;
      top: 50vh;
      animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    }
    div:nth-child(2) {
      animation-delay: -0.5s;
    }
    @keyframes lds-ripple {
      0% {
        top: 36px;
        left: 36px;
        width: 0;
        height: 0;
        opacity: 1;
      }
      100% {
        top: 0px;
        left: 0px;
        width: 72px;
        height: 72px;
        opacity: 0;
      }
    }
  }
`;
