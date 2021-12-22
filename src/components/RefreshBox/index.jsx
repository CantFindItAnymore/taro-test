import React, { useState, useEffect } from "react";
import { View, ScrollView } from "@tarojs/components";
import styles from "./index.module.styl";

function RefreshBox(props) {
  const { refresh, loadMore, height } = props;

  const [loading, setLoading] = useState(true);

  return (
    <ScrollView
      refresherEnabled
      refresherTriggered
      enableBackToTop
      refresherDefaultStyle="white"
      refresherBackground="#ccc"
      scrollY
      scrollWithAnimation
      className={styles.container}
      style={{ height }}
    >
      {props.children}
    </ScrollView>
  );
}

export default RefreshBox;
