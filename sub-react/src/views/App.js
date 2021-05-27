import React from "react";
import logo from "../assets/logo.svg";
import styles from "../styles/app.module.scss";
import { Link } from "dva/router";
import Antd from "./Antd";
function App() {
  return (
    <div className="App">
      <img src={logo} className={styles.logo} alt="logo" />
      <div>
        <Link to={"/hello"}>Hello</Link> |<Link to={"/test"}>Test</Link>
        <Antd></Antd>
      </div>
    </div>
  );
}

export default App;
