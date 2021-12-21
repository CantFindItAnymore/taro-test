import { View, ScrollView } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import styles from "./index.module.styl";

function Empty(props) {
  const { title = "暂无数据" } = props;
  return (
    <View className={styles.container}>
      <AtIcon value="clock" size="30" color="#000"></AtIcon>
      <View style={{ marginTop: "40rpx" }}>{title}</View>
    </View>
  );
}

export default Empty;
