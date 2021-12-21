import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import { useState, useEffect } from "react";
import { AtTabBar } from "taro-ui";
import "./index.styl";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    // console.log(445, Taro.getCurrentInstance().router);
    refreshTab();
  }, []);

  const refreshTab = () => {
    const { path } = Taro.getCurrentInstance().router;

    switch (path) {
      case "/pages/home/index":
        setActiveTab(0);
        break;
      case "/pages/review/index":
        setActiveTab(1);
        break;
      case "/pages/my/index":
        setActiveTab(2);
        break;

      default:
        break;
    }
  };

  return (
    <View className="tabContainer">
      <AtTabBar
        // fixed
        tabList={[
          { title: "首页", iconType: "home" },
          { title: "审批", iconType: "mail" },
          { title: "我的", iconType: "user" }
        ]}
        current={activeTab}
        onClick={e => {
          setActiveTab(e);
          switch (e) {
            case 0:
              Taro.redirectTo({
                url: "/pages/home/index"
              });
              break;
            case 1:
              Taro.redirectTo({
                url: "/pages/review/index"
              });
              break;
            case 2:
              Taro.redirectTo({
                url: "/pages/my/index"
              });
              break;

            default:
              break;
          }
        }}
      />
    </View>
  );
};

export default Tabs;
