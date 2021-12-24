import { useState, useEffect } from "react";

import Taro from "@tarojs/taro";

import { View, Image } from "@tarojs/components";

import styles from "./index.module.styl";

function ImageBox({ imgs = [] }) {
  return (
    <View className={styles.container}>
      {imgs.map(url => (
        <Image
          className={styles.img}
          src={url}
          key={url}
          style={{ height: "100rpx", width: "100rpx" }}
        />
      ))}
    </View>
  );
}

export default ImageBox;
