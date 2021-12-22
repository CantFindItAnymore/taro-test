import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { useState, useEffect } from "react";
import { AtCard } from "taro-ui";
import styles from "./index.module.styl";

const ReviewItem = props => {
  const { item } = props;

  return (
    <AtCard
      className={styles.container}
      note={`审批时间：${item.createTime}`}
      extra="额外信息"
      title={item.processDefinitionName}
      onClick={() => {
        Taro.navigateTo({
          url: "/pages/viewdetail/index?id=" + item.taskId
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
