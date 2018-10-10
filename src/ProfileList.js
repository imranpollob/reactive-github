import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "reactstrap";
const ProfileList = props => (
  <Row>
    {props.profileListData.map((data, index) => (
      <Col sm="2" style={{ textAlign: "center" }}>
        <Link to={`/${data.login}/repo`}>
          <img src={data.avatar_url} height="100" />
          <p>{data.login}</p>
        </Link>
      </Col>
    ))}
  </Row>
);

export default ProfileList;
