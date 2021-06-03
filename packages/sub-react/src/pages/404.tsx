import React from "react";
import { Link } from "dva/router";

const NotFound = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <div>
        <Link to="/">返回</Link>
      </div>
    </div>
  );
};

export default NotFound;
