import "taro-ui/dist/style/index.scss"; // 引入组件样式 - 方式一
import "./app.styl";

const App = props => {
  return <div>{props.children}</div>;
};

export default App;
