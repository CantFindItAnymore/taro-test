import { useState, useEffect } from "react";
import Taro from "@tarojs/taro";

import { View, Text } from "@tarojs/components";
import { AtDivider, AtList, AtListItem } from "taro-ui";

import Tabs from "../../components/Tabs";
import styles from "./index.module.styl";
// import banner from "../../assets/snow.jpg";

import { CommonModel } from "../../../api/models/common";

import { HomeModel } from "../../../api/models/home";

const Common = new CommonModel();

const Home = new HomeModel();

const Index = () => {
  const [count, setCount] = useState({
    todoTaskNum: 0,
    todayDoneTaskNum: 0,
    withinTimeLimitTaskNum: 0
  });
  const [list, setList] = useState([]);

  useEffect(() => {
    // login();
    init();
  }, []);

  // 登录
  const login = () => {
    Taro.login({
      success: function({ code, errMsg }) {
        if (code) {
          Common.login({
            code
          }).then(res => {
            console.log("登陆成功信息", res);
          });
        } else {
          console.log("登录失败！" + errMsg);
        }
      }
    });
  };

  const init = () => {
    _getCount();
    _getList();
  };

  // 获取数量
  const _getCount = () => {
    Home.getCount().then(res => {
      setCount(res);
    });
  };

  // 获取列表
  const _getList = () => {
    Home.getList({
      pageNum: 1,
      pageSize: 10
    }).then(res => {
      setList(res.list);
    });
  };

  return (
    <View className={styles.container}>
      <View className={styles.banner} />
      <View className={styles.work}>
        <Text className={styles.title}>工作协同</Text>
        <AtDivider height="40" />
        <View className={styles.nav}>
          <View
            className={styles.left}
            onClick={() => {
              Taro.navigateTo({
                url: "/pages/review/index"
              });
            }}
          >
            待办事项{`(${count?.todoTaskNum})`}
          </View>
          <View className={styles.right}>
            <View
              className={styles.top}
              onClick={() => {
                Taro.navigateTo({
                  url: "/pages/review/index?type=1"
                });
              }}
            >
              今日已办
              {`(${count?.todayDoneTaskNum})`}
            </View>
            <View
              className={styles.bot}
              onClick={() => {
                Taro.navigateTo({
                  url: "/pages/review/index"
                });
              }}
            >
              逾期事项
              {`(${count?.withinTimeLimitTaskNum})`}
            </View>
          </View>
        </View>
      </View>
      <View className={styles.list}>
        <AtList>
          {list.map(item => {
            return (
              <AtListItem
                onClick={() => {
                  Taro.navigateTo({
                    url: "/pages/viewdetail/index?id=" + item.taskId
                  });
                }}
                key={item.taskId}
                title={item.processInstanceName}
                note={`发起人：${item.authenticatedUserName} 发起时间：${item.createTime}`}
                arrow="right"
              />
            );
          })}
        </AtList>
      </View>
      <Tabs />
    </View>
  );
};

export default Index;
