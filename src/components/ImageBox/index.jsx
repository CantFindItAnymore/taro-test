import { useState, useEffect } from "react";

import Taro from "@tarojs/taro";

import { View, Image } from "@tarojs/components";

import styles from "./index.module.styl";

function ImageBox({ imgs = [] }) {
  const preview = url => {
    Taro.previewImage({
      current: url, // 当前显示图片的http链接
      urls: imgs, // 需要预览的图片http链接列表
      fail(err) {
        console.log(err);
      }
    });
  };

  return (
    <View className={styles.container}>
      {imgs.map(url => (
        <Image
          className={styles.img}
          src={url}
          key={url}
          style={{ height: "100rpx", width: "100rpx" }}
          onClick={() => {
            preview(url);
          }}
        />
      ))}
    </View>
  );
}

export default ImageBox;
