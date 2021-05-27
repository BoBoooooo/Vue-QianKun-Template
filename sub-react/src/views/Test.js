import React from "react";
import { Link } from "dva/router";

function Test() {
  return (
    <div>
      <p>Test</p>
      <Link to={"/"}>返回</Link> 

    </div>
  );
}

export default Test;
