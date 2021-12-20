// import { useState } from "react";
import { useState } from "react";

import { View, Text } from "@tarojs/components";
import { AtTabs, AtTabsPane } from "taro-ui";

import "./index.styl";

const tabList = [{ title: "基本信息" }, { title: "修改密码" }];

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
    </View>
  );
};

export default Index;
