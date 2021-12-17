import { Image, View, Text } from "@tarojs/components";
import { AtDivider, AtList, AtListItem } from "taro-ui";

import Tabs from "../../components/Tabs";
import "./index.styl";

import banner from "../../assets/banner.jpeg";

const Index = () => {
  return (
    <View className="container">
      <Image src={banner} className="banner" />
      <View className="work">
        <Text className="title">工作协同</Text>
        <AtDivider height="40" />
        <View className="nav">
          <View className="left">待办事项</View>
          <View className="right">
            <View className="top">今日已办</View>
            <View className="bot">逾期事项</View>
          </View>
        </View>
      </View>
      <View className="list">
        <AtList>
          <AtListItem
            thumb="http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png"
            title="标题文字"
            arrow="right"
          />
          <AtListItem
            thumb="http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png"
            title="标题文字"
            arrow="right"
          />
          <AtListItem
            thumb="http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png"
            title="标题文字"
            arrow="right"
          />
          <AtListItem
            thumb="http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png"
            title="禁用状态"
            arrow="right"
          />
        </AtList>
      </View>
      <Tabs />
    </View>
  );
};

export default Index;
