import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
const ProfileList = props => (
  <Row>
    {props.profileListData.map((data, index) => (
      <Col sm="2">
        <Link to={`/${data.login}`}>
          <img src={data.avatar_url} height="100" />
          <p>{data.login}</p>
        </Link>
      </Col>
    ))}
  </Row>
);

export default ProfileList;
