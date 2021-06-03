import React from "react";
import { Link } from "dva/router";
import { connect } from "dva";
import { Button } from "antd";

const Hello = ({ dispatch, hello }) => {
  function addCount() {
    dispatch({
      type: "hello/add",
    });
  }
  return (
    <div style={{ textAlign: "center" }}>
      <p>{hello.count}</p>
      <Button onClick={addCount}>测试数量++</Button>
      <div>
        <Link to="/">返回</Link>
      </div>
    </div>
  );
};

export default connect(({ hello }) => ({
  hello,
}))(Hello);
