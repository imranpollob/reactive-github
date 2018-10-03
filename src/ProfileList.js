import React from "react";
import { Link } from "react-router-dom";

const ProfileList = props => (
  <div>
    {props.profileListData.map(data => (
      <div>
        <Link to={`/${data.login}`}>
          <img src={data.avatar_url} height="100" />
          <p>{data.login}</p>
        </Link>
      </div>
    ))}
  </div>
);

export default ProfileList;
