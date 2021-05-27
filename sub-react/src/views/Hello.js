import React from "react";
import { Link } from "dva/router";

function Hello() {
  return (
    <div style={{ textAlign: "center" }}>
      <p>Hello</p>
      <Link to={"/"}>返回</Link>
    </div>
  );
}

export default Hello;
