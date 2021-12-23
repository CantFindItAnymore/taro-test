import { useState, useEffect } from "react";
import Taro from "@tarojs/taro";

import { View } from "@tarojs/components";
import { AtTabs, AtTabsPane } from "taro-ui";
import Tabs from "../../components/Tabs";
import styles from "./index.module.styl";
import WaitResolve from "./components/WaitResolve";
import Resolved from "./components/Resolved";
import CCme from "./components/CCme";
import Started from "./components/Started";

const tabList = [
  { title: "待办" },
  { title: "已办" },
  { title: "抄送我" },
  { title: "已发起" }
];

const Index = () => {
  const [current, setCurrent] = useState();

  useEffect(() => {
    _getParams();
  }, []);

  // 获取入参并切换tab
  const _getParams = () => {
    const { type = 0 } = Taro.getCurrentInstance().router.params;
    console.log(type);

    setCurrent(Number(type));
  };

  return (
    <View className={styles.container}>
      <AtTabs
        swipeable={false}
        current={current}
        tabList={tabList}
        onClick={e => {
          setCurrent(e);
        }}
      >
        <AtTabsPane current={current} index={0}>
          {current === 0 && <WaitResolve />}
        </AtTabsPane>
        <AtTabsPane current={current} index={1}>
          {current === 1 && <Resolved />}
        </AtTabsPane>
        <AtTabsPane current={current} index={2}>
          {current === 2 && <CCme />}
        </AtTabsPane>
        <AtTabsPane current={current} index={3}>
          {current === 3 && <Started />}
        </AtTabsPane>
      </AtTabs>
      <Tabs />
    </View>
  );
};

export default Index;
