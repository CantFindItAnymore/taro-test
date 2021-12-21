import { useState, useEffect } from "react";
import { View, ScrollView } from "@tarojs/components";
import { AtTabs, AtTabsPane } from "taro-ui";
import Tabs from "../../components/Tabs";
import styles from "./index.module.styl";
import ReviewItem from "../../components/ReviewItem";
import Empty from "../../components/Empty";
import WaitResolve from "./components/WaitResolve";
import { ReviewModel } from "../../../api/models/review";

const Review = new ReviewModel();

const tabList = [
  { title: "待办" },
  { title: "已办" },
  { title: "抄送我" },
  { title: "已发起" }
];

const Index = () => {
  const [current, setCurrent] = useState(0);

  const [resolvedList, setResolvedList] = useState([]); // 已办
  const [CCmeList, setCCmeList] = useState([]); // 抄送我
  const [startedList, setStartedList] = useState([]); // 已发起

  // 【api】获取已办
  const _getResolvedList = () => {
    Review.getResolvedList({
      endTime: "",
      eventNumber: "",
      pageNum: 1,
      pageSize: 10,
      processDefinitionKey: "",
      startTime: "",
      state: ""
    }).then(res => {
      setResolvedList(res.list);
    });
  };

  // 【api】获取抄送我
  const _getCCmeList = () => {
    Review.getCCmeList({
      endTime: "",
      eventNumber: "",
      pageNum: 1,
      pageSize: 10,
      processDefinitionKey: "",
      startTime: "",
      state: ""
    }).then(res => {
      setCCmeList(res.list);
    });
  };

  // 【api】获取已发起
  const _getStartedList = () => {
    Review.getStartedList({
      endTime: "",
      eventNumber: "",
      pageNum: 1,
      pageSize: 10,
      processDefinitionKey: "",
      startTime: "",
      state: ""
    }).then(res => {
      setStartedList(res.list);
    });
  };

  // 滚动触底事件
  const scrollToLower = () => {
    console.log("bbbottom");
  };

  return (
    <View className={styles.container}>
      <AtTabs
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
          <ScrollView
            scrollY
            scrollWithAnimation
            onScrollToLower={scrollToLower}
            className={styles.tab}
          >
            {resolvedList?.map(item => (
              <ReviewItem item={item} key={item.taskId} />
            )) || <Empty title="暂无已办数据" />}
          </ScrollView>
        </AtTabsPane>
        <AtTabsPane current={current} index={2}>
          <ScrollView
            scrollY
            scrollWithAnimation
            onScrollToLower={scrollToLower}
            className={styles.tab}
          >
            {CCmeList?.map(item => (
              <ReviewItem item={item} key={item.taskId} />
            )) || <Empty title="暂无抄送我数据" />}
          </ScrollView>
        </AtTabsPane>
        <AtTabsPane current={current} index={3}>
          <ScrollView
            scrollY
            scrollWithAnimation
            onScrollToLower={scrollToLower}
            className={styles.tab}
          >
            {startedList?.map(item => (
              <ReviewItem item={item} key={item.taskId} />
            ))}{" "}
            || <Empty title="暂无已发起数据" />
          </ScrollView>
        </AtTabsPane>
      </AtTabs>
      <Tabs />
    </View>
  );
};

export default Index;
