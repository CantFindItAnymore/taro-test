import { View, Text } from "@tarojs/components";
import { useState, useEffect } from "react";
import { AtButton, AtDrawer } from "taro-ui";
import WorkFlow from "../WorkFlow";
import styles from "./index.module.styl";

function ViewDetailWrapper(props) {
  const { detail } = props;

  const [treeShow, setTreeShow] = useState(false);

  return (
    <View className={styles.container}>
      <View className={styles.header}>
        <View className={styles.workfolwBtn}>
          <AtButton
            type="primary"
            size="small"
            onClick={() => {
              setTreeShow(true);
            }}
          >
            流程
          </AtButton>
        </View>
      </View>
      <View className={styles.content}>{props.children}</View>
      <View className={styles.footer}>
        {detail?.todoNode?.taskList[0]?.templateId === "mormal" ? (
          <View>
            <AtButton size="small">抄送</AtButton>
            <AtButton size="small">撤销</AtButton>
            <AtButton type="primary" size="small">
              拒绝
            </AtButton>
            <AtButton type="primary" size="small">
              同意
            </AtButton>
          </View>
        ) : (
          <Text>请到PC端操作</Text>
        )}
      </View>
      {treeShow && (
        <AtDrawer
          show={treeShow}
          mask
          right
          width={340}
          onClose={() => {
            setTreeShow(false);
          }}
        >
          <WorkFlow nodeList={detail.nodeList} />
        </AtDrawer>
      )}
    </View>
  );
}

export default ViewDetailWrapper;
