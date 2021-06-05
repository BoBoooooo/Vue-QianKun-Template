import './public-path';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import dva from 'dva';
import { createBrowserHistory } from 'history';
import 'antd/dist/antd.css';

let app;
function render() {
  app = dva({
    history: createBrowserHistory({
      // 此处需要定义router baseName
      basename: window.__POWERED_BY_QIANKUN__ ? '/app/sub-react' : '/',
    }),
  });

  // app.use({});

  app.model(require('./models/App.ts').default);

  app.router(require('./router').default);

  app.start('#root');

  // https://github.com/dvajs/dva/issues/2335
  window.g_app = app;
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}
/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  console.log('react app bootstraped');
}
/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props) {
  render();
  // 获取全局dva store实例
  const store = window.g_app._store;
  // 需要初始化子应用的app model,初始值即为当前基座getGlobalState的全局状态
  // 并且在基座更新时同步更新model中的数据
  props.onGlobalStateChange((newState, prev) => {
    console.log('sub-react change', JSON.stringify(newState), JSON.stringify(prev));
    store.dispatch({
      type: 'app/setGlobalState',
      payload: {
        ...newState,
        global: {
          ...props,
        },
      },
    });
  }, true);
}
/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount() {
  ReactDOM.unmountComponentAtNode(document.getElementById('root') as HTMLElement);
}
/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update(props) {
  console.log('update props', props);
}
