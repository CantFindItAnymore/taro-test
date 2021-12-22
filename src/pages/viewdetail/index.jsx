import { useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import styles from "./index.module.styl";

import { ReviewModel } from "../../../api/models/review";

const Review = new ReviewModel();

function ViewDetail() {
  const [detail, setDetail] = useState({});

  useEffect(() => {
    _getParams();
  }, []);

  // 获取入参并获取详情
  const _getParams = () => {
    const { id } = Taro.getCurrentInstance().router.params;
    console.log(id);

    if (id) {
      Review.getDetail({ id }).then(res => {
        setDetail(res);
      });
    }
  };

  return (
    <View className={styles.container}>
      <View className={styles.footer}>123</View>
    </View>
  );
}

export default ViewDetail;
