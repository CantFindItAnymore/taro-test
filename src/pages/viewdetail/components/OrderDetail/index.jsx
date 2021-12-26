import { useState, useEffect } from "react";
import Taro from "@tarojs/taro";

import { View } from "@tarojs/components";
import { AtTabs, AtTabsPane, AtList, AtListItem } from "taro-ui";
import styles from "./index.module.styl";

const OrserDetail = props => {
  const { orderDetail } = props.viewData;
  console.log("orderDetail", orderDetail);
  const [current, setCurrent] = useState(0);
  const [tabList, setTabList] = useState([{ title: "订单信息" }]);

  useEffect(() => {
    const { orderItemList } = orderDetail;
    if (orderItemList) {
      orderItemList?.map((_, index) => {
        const temp = tabList;
        temp.push({
          title: "项目信息" + index + 1
        });
        setTabList(temp);
      });
    }
  }, [orderDetail]);

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
              <AtListItem title="订单名称" extraText={orderDetail?.name} />
              <AtListItem
                title="客户集团"
                extraText={orderDetail?.customerName}
              />
              <AtListItem
                title="服务主体"
                extraText={orderDetail?.serviceUnitName}
              />
              <AtListItem
                title="业务类型"
                extraText={orderDetail?.businessTypeName}
              />
              <AtListItem
                title="付款方式"
                extraText={orderDetail?.paymentTypeName}
              />
            </AtList>
          )}
        </AtTabsPane>
        {tabList.map((_, index) => {
          const { orderItemList } = orderDetail;
          return (
            <AtTabsPane current={current} index={index + 1} key={index + 1}>
              {current === index + 1 && (
                <AtList>
                  <AtListItem
                    title="项目名称"
                    extraText={orderItemList[index]?.name}
                  />
                  <AtListItem
                    title="客户主体"
                    extraText={orderItemList[index]?.companyName}
                  />
                  <AtListItem
                    title="媒体"
                    extraText={orderItemList[index]?.mediaName}
                  />
                  <AtListItem
                    title="媒体版块"
                    extraText={orderItemList[index]?.mediaPlateName}
                  />
                  <AtListItem
                    title="产品类型"
                    extraText={orderItemList[index]?.productTypeName}
                  />
                  <AtListItem
                    title="产品名称"
                    extraText={orderItemList[index]?.productName}
                  />
                  <AtListItem
                    title="付款方式"
                    extraText={orderItemList[index]?.productName}
                  />
                  <AtListItem
                    title="结算方式"
                    extraText={orderItemList[index]?.settlementTypeName}
                  />
                  <AtListItem
                    title="服务类型"
                    extraText={orderItemList[index]?.serviceTypeName}
                  />
                  <AtListItem
                    title="负责AE"
                    extraText={orderItemList[index]?.aeUserName}
                  />
                  <AtListItem
                    title="销售"
                    extraText={orderItemList[index]?.saleverUserName}
                  />
                  <AtListItem
                    title="媒介"
                    extraText={orderItemList[index]?.mediumUserName}
                  />
                  <AtListItem
                    title="媒体付款日期"
                    extraText={orderItemList[index]?.mediaPamentDate}
                  />
                  <AtListItem
                    title="媒体发票类型"
                    extraText={orderItemList[index]?.mediaInvoiceTypeName}
                  />
                  <AtListItem
                    title="媒体发票内容"
                    extraText={orderItemList[index]?.mediaInvoiceContentName}
                  />
                  <AtListItem
                    title="客户付款日期"
                    extraText={orderItemList[index]?.customerPaymentDate}
                  />
                  <AtListItem
                    title="客户发票类型"
                    extraText={orderItemList[index]?.customerInvoiceTypeName}
                  />
                  <AtListItem
                    title="客户发票内容"
                    extraText={orderItemList[index]?.customerInvoiceContentName}
                  />
                  <AtListItem
                    title="执行日期"
                    extraText={`${orderItemList[index].executionDate}
                    ${
                      orderItemList[index].executionEndDate
                        ? ` - ${orderItemList[index].executionEndDate}`
                        : null
                    }`}
                  />
                  <AtListItem
                    title="客户账期"
                    extraText={orderItemList[index]?.companyPlatePamentName}
                  />
                  <AtListItem
                    title="客户政策"
                    extraText={orderItemList[index]?.companyPlatePolicyName}
                  />
                  <AtListItem
                    title="客户政策类型"
                    extraText={orderItemList[index]?.rebateTypeName}
                  />
                  <AtListItem
                    title="客户金额"
                    extraText={orderItemList[index]?.customerMoney}
                  />
                  <AtListItem
                    title="媒体金额"
                    extraText={orderItemList[index]?.mediaMoney}
                  />
                  <AtListItem
                    title="垫款天数"
                    extraText={orderItemList[index]?.loanDays}
                  />
                  <AtListItem
                    title="截止回款日期"
                    extraText={orderItemList[index]?.paymentEndTime}
                  />
                  <AtListItem
                    title="客户返点比例"
                    extraText={`${orderItemList[index]?.rebate * 100 || 0}%`}
                  />
                  <AtListItem
                    title="金额差价"
                    extraText={
                      <p style={{ color: "red" }}>
                        ￥
                        {`${
                          orderItemList[index]?.mediaCustomerSpread === 0
                            ? orderItemList[index]?.mediaCustomerSpread
                            : "-" + orderItemList[index]?.mediaCustomerSpread
                        }`}
                      </p>
                    }
                  />
                  <AtListItem
                    title="项目说明"
                    extraText={orderItemList[index]?.description}
                  />
                  <AtListItem
                    title="关联合同"
                    extraText={orderItemList[index]?.contractName}
                  />
                </AtList>
              )}
            </AtTabsPane>
          );
        })}
      </AtTabs>
    </View>
  );
};

export default OrserDetail;
