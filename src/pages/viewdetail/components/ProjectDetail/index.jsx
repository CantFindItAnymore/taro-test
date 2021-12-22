import { useState, useEffect } from "react";
import Taro from "@tarojs/taro";

import { View } from "@tarojs/components";
import { AtTabs, AtTabsPane } from "taro-ui";
import styles from "./index.module.styl";

const tabList = [
  { title: "基本信息" },
  { title: "集团信息" },
  { title: "客户授信" },
  { title: "客户账期" },
  { title: "客户政策" },
  { title: "风控确认" },
  { title: "内控复核" }
];

const Index = () => {
  const [current, setCurrent] = useState(0);

  return (
    <View className={styles.container}>
      <AtTabs
        scroll
        current={current}
        tabList={tabList}
        onClick={e => {
          setCurrent(e);
        }}
      >
        <AtTabsPane current={current} index={0}>
          {current === 0 && 0}
        </AtTabsPane>
        <AtTabsPane current={current} index={1}>
          {current === 1 && 1}
        </AtTabsPane>
        <AtTabsPane current={current} index={2}>
          {current === 2 && 2}
        </AtTabsPane>
        <AtTabsPane current={current} index={3}>
          {current === 3 && 3}
        </AtTabsPane>
        <AtTabsPane current={current} index={4}>
          {current === 4 && 4}
        </AtTabsPane>
        <AtTabsPane current={current} index={5}>
          {current === 5 && 5}
        </AtTabsPane>
        <AtTabsPane current={current} index={6}>
          {current === 6 && 6}
        </AtTabsPane>
      </AtTabs>
    </View>
  );
};

export default Index;
