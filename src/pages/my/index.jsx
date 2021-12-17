// import { useState } from "react";
import Taro from "@tarojs/taro";
import { Image, View, Text } from "@tarojs/components";
import { AtList, AtListItem } from "taro-ui";
import Tabs from "../../components/Tabs";
import "./index.styl";

import head from "../../assets/head.png";

const Index = () => {
  return (
    <View className="container">
      <View className="banner">
        <Image src={head} className="banner-head" />
        <Text>123</Text>
      </View>
      <View className="list">
        <AtList hasBorder={false}>
          <AtListItem
            iconInfo={{ size: 25, color: "#78A4FA", value: "settings" }}
            title="个人设置"
            arrow="right"
            hasBorder={false}
            onClick={() => {
              Taro.navigateTo({
                url: "/pages/setting/index"
              });
            }}
          />
          {/* <AtListItem
            iconInfo={{ size: 25, color: "#78A4FA", value: "bell" }}
            title="消息通知"
            arrow="right"
            hasBorder={false}
          /> */}
        </AtList>
      </View>
      <Tabs />
    </View>
  );
};

export default Index;
