import React from "react";
import { Link } from "dva/router";
import { connect } from "dva";

const Test = ({ hello, app }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <p>全局姓名为: {app.user.name}</p>
      <p>当前为test页面 计数器值为 {hello.count}</p>
      <Link to="/">返回</Link>
    </div>
  );
};

export default connect(({ hello, app }) => ({
  hello,
  app,
}))(Test);
