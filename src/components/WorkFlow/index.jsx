import React, { useState, useEffect } from "react";
import { View, Text } from "@tarojs/components";

import { AtTimeline, AtTag, AtAvatar } from "taro-ui";
import styles from "./index.module.styl";

const auditTypeDict = {
  REJECT: "驳回",
  PASS: "通过",
  TODO: "待办",
  WITHDRAW: "撤回",
  RETURN: "退回"
};

function WorkFlow(props) {
  const { nodeList } = props;

  console.log("nodeList", nodeList);

  const [list, setList] = useState([]);

  useEffect(() => {
    const temp = [];
    nodeList?.map(item => {
      temp.push({
        title: item.nodeName,
        content: [
          <View
            className={styles.tag}
            key={item?.taskList[0].taskId}
            style={{ marginTop: "20rpx" }}
          >
            {item?.taskList?.map((_, index) => (
              <View key={index}>
                <AtTag size="small" style={{ margin: "10rpx 0" }}>
                  {_?.assigneeName}
                </AtTag>
                <Text style={{ marginLeft: "10rpx" }}>{_.endTime}</Text>

                <AtTag
                  type="primary"
                  size="small"
                  style={{ marginLeft: "10rpx" }}
                >
                  {auditTypeDict[_.state]}
                </AtTag>

                <View style={{ margin: "20rpx 0" }}>
                  {_.commentList?.map(x => (
                    <Text key={x.message}>{`${x.message}`}</Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
        ]
      });
    });

    setList(temp);
  }, [nodeList]);

  return (
    <View className={styles.container}>
      <AtTimeline items={list}></AtTimeline>
    </View>
  );
}

export default WorkFlow;
