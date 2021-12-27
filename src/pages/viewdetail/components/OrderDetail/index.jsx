import { useState, useEffect } from "react";
import Taro from "@tarojs/taro";

import { View } from "@tarojs/components";
import { AtTabs, AtTabsPane, AtList, AtListItem } from "taro-ui";
import styles from "./index.module.styl";

const OrserDetail = props => {
  const orderDetail = props.viewData;
  console.log("orderDetail", orderDetail);
  const [current, setCurrent] = useState(0);

  let tabList = [{ title: "订单信息" }];

  const { orderItemList } = orderDetail;
  console.log("orderItemList", orderItemList);
  if (orderItemList) {
    orderItemList?.map((_, index) => {
      const temp = tabList;
      temp.push({
        title: "项目信息" + (Number(index) + 1)
      });
      console.log(66, temp);
      tabList = temp;
    });
  }

  // const temp_tab = JSON.parse(JSON.stringify(tabList));
  // console.log(99, temp_tab, temp_tab.length);

  return (
    tabList.length > 1 && (
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
                <AtListItem title="订单名称" note={orderDetail?.name} />
                <AtListItem title="客户集团" note={orderDetail?.customerName} />
                <AtListItem
                  title="服务主体"
                  note={orderDetail?.serviceUnitName}
                />
                <AtListItem
                  title="业务类型"
                  note={orderDetail?.businessTypeName}
                />
                <AtListItem
                  title="付款方式"
                  note={orderDetail?.paymentTypeName}
                />
              </AtList>
            )}
          </AtTabsPane>
          {tabList.map((_, index) => {
            // const { orderItem } = orderItemList;
            if (!orderItemList) {
              return;
            }
            return (
              <AtTabsPane current={current} index={index + 1} key={index + 1}>
                {current === index + 1 && (
                  <AtList>
                    <AtListItem
                      title="项目名称"
                      note={orderItemList[index]?.orderItem?.name}
                    />
                    <AtListItem
                      title="客户主体"
                      note={orderItemList[index]?.orderItem?.companyName}
                    />
                    <AtListItem
                      title="媒体"
                      note={orderItemList[index]?.orderItem?.mediaName}
                    />
                    <AtListItem
                      title="媒体版块"
                      note={orderItemList[index]?.orderItem?.mediaPlateName}
                    />
                    <AtListItem
                      title="产品类型"
                      note={orderItemList[index]?.orderItem?.productTypeName}
                    />
                    <AtListItem
                      title="产品名称"
                      note={orderItemList[index]?.orderItem?.productName}
                    />
                    <AtListItem
                      title="付款方式"
                      note={orderItemList[index]?.orderItem?.productName}
                    />
                    <AtListItem
                      title="结算方式"
                      note={orderItemList[index]?.orderItem?.settlementTypeName}
                    />
                    <AtListItem
                      title="服务类型"
                      note={orderItemList[index]?.orderItem?.serviceTypeName}
                    />
                    <AtListItem
                      title="负责AE"
                      note={orderItemList[index]?.orderItem?.aeUserName}
                    />
                    <AtListItem
                      title="销售"
                      note={orderItemList[index]?.orderItem?.saleverUserName}
                    />
                    <AtListItem
                      title="媒介"
                      note={orderItemList[index]?.orderItem?.mediumUserName}
                    />
                    <AtListItem
                      title="媒体付款日期"
                      note={orderItemList[index]?.orderItem?.mediaPamentDate}
                    />
                    <AtListItem
                      title="媒体发票类型"
                      note={
                        orderItemList[index]?.orderItem?.mediaInvoiceTypeName
                      }
                    />
                    <AtListItem
                      title="媒体发票内容"
                      note={
                        orderItemList[index]?.orderItem?.mediaInvoiceContentName
                      }
                    />
                    <AtListItem
                      title="客户付款日期"
                      note={
                        orderItemList[index]?.orderItem?.customerPaymentDate
                      }
                    />
                    <AtListItem
                      title="客户发票类型"
                      note={
                        orderItemList[index]?.orderItem?.customerInvoiceTypeName
                      }
                    />
                    <AtListItem
                      title="客户发票内容"
                      note={
                        orderItemList[index]?.orderItem
                          ?.customerInvoiceContentName
                      }
                    />
                    <AtListItem
                      title="执行日期"
                      note={`${orderItemList[index]?.orderItem.executionDate}
                    ${
                      orderItemList[index]?.orderItem.executionEndDate
                        ? ` - ${orderItemList[index]?.orderItem.executionEndDate}`
                        : null
                    }`}
                    />
                    <AtListItem
                      title="客户账期"
                      note={
                        orderItemList[index]?.orderItem?.companyPlatePamentName
                      }
                    />
                    <AtListItem
                      title="客户政策"
                      note={
                        orderItemList[index]?.orderItem?.companyPlatePolicyName
                      }
                    />
                    <AtListItem
                      title="客户政策类型"
                      note={orderItemList[index]?.orderItem?.rebateTypeName}
                    />
                    <AtListItem
                      title="客户金额"
                      note={orderItemList[index]?.orderItem?.customerMoney}
                    />
                    <AtListItem
                      title="媒体金额"
                      note={orderItemList[index]?.orderItem?.mediaMoney}
                    />
                    <AtListItem
                      title="垫款天数"
                      note={orderItemList[index]?.orderItem?.loanDays}
                    />
                    <AtListItem
                      title="截止回款日期"
                      note={orderItemList[index]?.orderItem?.paymentEndTime}
                    />
                    <AtListItem
                      title="客户返点比例"
                      note={`${orderItemList[index]?.orderItem?.rebate * 100 ||
                        0}%`}
                    />
                    <AtListItem
                      title="金额差价"
                      note={
                        <p style={{ color: "red" }}>
                          ￥
                          {`${
                            orderItemList[index]?.orderItem
                              ?.mediaCustomerSpread === 0
                              ? orderItemList[index]?.orderItem
                                  ?.mediaCustomerSpread
                              : "-" +
                                orderItemList[index]?.orderItem
                                  ?.mediaCustomerSpread
                          }`}
                        </p>
                      }
                    />
                    <AtListItem
                      title="项目说明"
                      note={orderItemList[index]?.orderItem?.description}
                    />
                    <AtListItem
                      title="关联合同"
                      note={orderItemList[index]?.orderItem?.contractName}
                    />
                  </AtList>
                )}
              </AtTabsPane>
            );
          })}
        </AtTabs>
      </View>
    )
  );
};

export default OrserDetail;
