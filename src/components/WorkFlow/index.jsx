import React, { useState, useEffect } from "react";
import { View } from "@tarojs/components";

import { AtTimeline, AtTag } from "taro-ui";
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
          item.createdDate,
          <AtTag key={item?.taskList[0].taskId} type="primary" size="small">
            {auditTypeDict[item?.taskList[0].state]}
          </AtTag>
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
