import store from "@/store";

/**
 * @name 声明一个常量准备将props内的部分内容储存起来
 */
const STORE = {};

const appStore = props => {
  console.log(props)
  /**
   * @name 监听应用间通信，并存入store
   */
  props.onGlobalStateChange?.(
    (value, prev) => {
      console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev)
      store.dispatch('appstore/setUser', value.user)
    },
    true
  );
  STORE.setGlobalState = props?.setGlobalState;
};

/**
 * @name 全局setState方法，修改的内容将通知所有微应用
 * @param {Object} data 按照你设定的内容格式数据 
 */
const setState = (data) => {
  STORE.setGlobalState?.({
    ...data
  })
}

export {
  setState
}
export default appStore;

