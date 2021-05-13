import React from "react";
import moment from "moment";
import styled from "styled-components";
import History from "../../../Icons/history";
import Status from "../../../Icons/status";
import Ward from "../../../Icons/ward";
import Mobile from "../../../Icons/mobile";

const Card = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding: 10px;
  border-radius: 3px;
  background: #fff;
  min-height: 100px;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  @media (max-width: 426px) {
    font-size: 0.8rem;
  }
`;
const CardTitle = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #d2d2d2;
  padding-bottom: 10px;
  margin-bottom: 10px;
  div {
    display: flex;
    align-items: center;
  }
  svg {
    margin-right: 10px;
  }
`;

const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .message {
    border: 1px solid gray;
    border-radius: 3px;
    padding: 15px;
  }
  div {
    display: flex;
    align-items: center;
  }
  .info {
    display: block;
    div {
      margin: 5px 0;
    }
  }
  svg {
    margin-right: 10px;
  }
`;

const request = ({ request }) => {
  return (
    <Card>
      <CardTitle>
        <>
          <div>{request.requestedBy.name}</div>
          <div>
            <Mobile /> {request.requestedBy.mobile}
          </div>
        </>

        <div>
          <History />
          {moment(request.createdAt).fromNow()}
        </div>
      </CardTitle>
      <CardContent>
        <div className="message">{request.request}</div>

        <div className="info">
          <div>
            <div>
              <Ward /> {request.unit.room.name}
            </div>
          </div>
          <div>
            <Status /> {request.unit.status}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default request;
