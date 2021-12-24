import { useState, useEffect } from "react";
import Taro from "@tarojs/taro";

import { View } from "@tarojs/components";
import { AtTabs, AtTabsPane, AtList, AtListItem } from "taro-ui";
import styles from "./index.module.styl";

const tabList = [{ title: "订单信息" }, { title: "项目信息" }];

const Index = props => {
  const { orderDetail } = props.viewData;
  console.log("orderDetail", orderDetail);
  const [current, setCurrent] = useState(0);

  return (
    <View className={styles.container}>
      <AtTabs
        scroll
        current={current}
        tabList={tabList}
        onClick={e => {
          setCurrent(e);
        }}
      >
        <AtTabsPane current={current} index={0}>
          {current === 0 && (
            <AtList>
              <AtListItem title="订单名称" extraText={orderDetail.name} />
              <AtListItem
                title="客户集团"
                extraText={orderDetail.customerName}
              />
              <AtListItem
                title="服务主体"
                extraText={orderDetail.serviceUnitName}
              />
              <AtListItem
                title="业务类型"
                extraText={orderDetail.businessTypeName}
              />
              <AtListItem
                title="付款方式"
                extraText={orderDetail.paymentTypeName}
              />
            </AtList>
          )}
        </AtTabsPane>
        <AtTabsPane current={current} index={1}>
          {current === 1 && (
            <AtList>
              <AtListItem title="订单名称" extraText={orderDetail.name} />
              <AtListItem
                title="客户集团"
                extraText={orderDetail.customerName}
              />
              <AtListItem
                title="服务主体"
                extraText={orderDetail.serviceUnitName}
              />
              <AtListItem
                title="业务类型"
                extraText={orderDetail.businessTypeName}
              />
              <AtListItem
                title="付款方式"
                extraText={orderDetail.paymentTypeName}
              />
            </AtList>
          )}
        </AtTabsPane>
      </AtTabs>
    </View>
  );
};

export default Index;
