import { View } from "@tarojs/components";
import { AtButton } from "taro-ui";

import styles from "./index.module.styl";

function ViewDetailWrapper(props) {
  return (
    <View className={styles.container}>
      <View className={styles.header}>
        <View className={styles.workfolwBtn}>
          <AtButton type="primary" size="small">
            流程
          </AtButton>
        </View>
      </View>
      <View>{props.children}</View>
      <View className={styles.footer}>
        <AtButton size="small">抄送</AtButton>
        <AtButton size="small">撤销</AtButton>
        <AtButton type="primary" size="small">
          拒绝
        </AtButton>
        <AtButton type="primary" size="small">
          同意
        </AtButton>
      </View>
    </View>
  );
}

export default ViewDetailWrapper;
