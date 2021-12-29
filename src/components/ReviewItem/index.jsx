import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { useState, useEffect } from "react";
import { AtCard, AtTag } from "taro-ui";
import styles from "./index.module.styl";

const ReviewItem = props => {
  const { item, showTag = false } = props;

  const createTag = state => {
    console.log("state", state, showTag);
    return showTag ? state : null;
  };

  return (
    <AtCard
      className={styles.container}
      note={`通知时间：${item.createTime}`}
      extra={createTag(item.state)}
      title={item.processDefinitionName}
      onClick={() => {
        const id = item.processInstanceId;
        Taro.navigateTo({
          url: "/pages/viewdetail/index?id=" + id
        });
      }}
    >
      <View className={styles.txt}>
        具体任务内容：{item.processInstanceName}
      </View>
      <View className={styles.txt}>发起人：{item.assignee}</View>
    </AtCard>
  );
};

export default ReviewItem;
