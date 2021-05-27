import React, { useState } from "react";
import logo from "../assets/logo.svg";
import styles from "../styles/app.module.scss";
import { Link } from "dva/router";
import Antd from "./Antd";
import { connect } from "dva";
import { Input, Button, message, Row, Col } from "antd";

const App = ({ app }) => {
  const changeState = (e) => {
    setName(e.target.value);
  };
  const [name, setName] = useState(app.user.name);
  const changeGlobalState = () => {
    app.global.setGlobalState({
      user: {
        name,
      },
    });
    message.success("更新全局姓名成功");
  };
  return (
    <div className={styles.App}>
      <Row>
        <Col span={8}>
          <img src={logo} className={styles.logo} alt="logo" />
          <h2>点击下方切换路由</h2>
          <Link to={"/hello"}>Hello</Link> |<Link to={"/test"}>Test</Link>
        </Col>
        <Col span={8}>
          <h3>基座中全局姓名为{app.user.name}</h3>
          <Input
            style={{ width: "50%", display: "inline-block" }}
            onChange={changeState}
          ></Input>
          <Button type="ghost" onClick={changeGlobalState}>
            更新全局姓名
          </Button>
        </Col>
        <Col span={8}>
          <Antd></Antd>
        </Col>
      </Row>
    </div>
  );
};

export default connect(({ app }) => ({
  app,
}))(App);
