import React from "react";
import { Link } from "dva/router";

function Hello() {
  return (
    <div>
      <p>Hello</p>
      <Link to={"/"}>返回</Link> 

    </div>
    
  );
}

export default Hello;
