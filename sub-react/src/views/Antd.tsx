import React, { useState } from "react";
import { ConfigProvider, DatePicker, message } from "antd";
import zhCN from "antd/lib/locale/zh_CN";

const Antd = () => {
  const [date, setDate] = useState(null);
  const handleChange = (value) => {
    message.info(`您选择的日期是: ${value ? value : "未选择"}`);
    setDate(value);
  };
  return (
    <ConfigProvider locale={zhCN}>
      <div>
        <h2>嵌套子组件示例</h2>
        <DatePicker onChange={handleChange} />
        <div style={{ marginTop: 16 }}>当前日期：{JSON.stringify(date)}</div>
      </div>
    </ConfigProvider>
  );
};

export default Antd;
