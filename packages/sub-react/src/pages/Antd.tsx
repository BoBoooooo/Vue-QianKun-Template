import React, { useState, useContext } from 'react';
import { ConfigProvider, DatePicker, message } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { AppContext } from './App';

const Antd = () => {
  const [date, setDate] = useState(null);
  const { content } = useContext(AppContext);
  const handleChange = value => {
    message.info(`您选择的日期是: ${value ? value : '未选择'}`);
    setDate(value);
  };
  return (
    <ConfigProvider locale={zhCN}>
      <div>
        <h2>嵌套子组件示例</h2>
        <DatePicker onChange={handleChange} />
        <div style={{ marginTop: 16 }}>当前日期：{JSON.stringify(date)}</div>
        <p>跨组件通信 useContext : {content}</p>
      </div>
    </ConfigProvider>
  );
};

export default Antd;
