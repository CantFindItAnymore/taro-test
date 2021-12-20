import { useState } from "react";
import { View, Text } from "@tarojs/components";
import { AtTabs, AtTabsPane } from "taro-ui";
import Tabs from "../../components/Tabs";
import "./index.styl";

const tabList = [
  { title: "待办" },
  { title: "已办" },
  { title: "抄送我" },
  { title: "已发起" }
];

const Index = () => {
  const [current, setCurrent] = useState(0);

  return (
    <View className="container">
      <AtTabs
        current={current}
        tabList={tabList}
        onClick={e => {
          setCurrent(e);
        }}
      >
        <AtTabsPane current={current} index={0}>
          <View className="tab">标签页一的内容</View>
        </AtTabsPane>
        <AtTabsPane current={current} index={1}>
          <View className="tab">标签页二的内容</View>
        </AtTabsPane>
        <AtTabsPane current={current} index={2}>
          <View className="tab">标签页三的内容</View>
        </AtTabsPane>
        <AtTabsPane current={current} index={3}>
          <View className="tab">标签页4的内容</View>
        </AtTabsPane>
      </AtTabs>
      <Tabs />
    </View>
  );
};

export default Index;
