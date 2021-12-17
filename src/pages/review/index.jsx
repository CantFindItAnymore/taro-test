// import { useState } from "react";
import { View, Text } from "@tarojs/components";
import Tabs from "../../components/Tabs";
import "./index.styl";

const Index = () => {
  return (
    <View className="container">
      <View className="banner">
        <Text>审批</Text>
      </View>
      <Tabs />
    </View>
  );
};

export default Index;
