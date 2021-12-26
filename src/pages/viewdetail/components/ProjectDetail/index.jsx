import { useState, useEffect } from "react";

import { View, Text } from "@tarojs/components";
import { AtTabs, AtTabsPane, AtList, AtListItem, AtCard } from "taro-ui";
import { subtract, format } from "mathjs";
import styles from "./index.module.styl";
import ImageBox from "../../../../components/ImageBox";

const Index = props => {
  const [current, setCurrent] = useState(0);
  const { data, code } = props;
  console.log(data);
  const tabList = data
    ?.filter(item => item.type)
    ?.map(item => ({
      title: item?.key
    }));
  // 根据传入得tabs数组来判断显示不同得内容
  const getTabs = (type, value) => {
    switch (type) {
      case "xiangmuxinxi":
        return getInfo(value);
      case "dingdanxinxi":
        return getOrder(value);
      case "kehuqueren":
        return getConfirm(value);
      case "xiangmuzhixing":
        return getExecute(value);
      case "jiesuanmingxi":
        return getSellttle(value);
      case "renlinghuikuan":
        return getBack(value);
      case "guidangxinxi":
        return getFile(value);
      case "tuikuanxinxi":
        return getReturn(value);
      default:
        return <span>暂无相关数据信息</span>;
    }
  };
  // 退款信息
  const getReturn = value => {
    return (
      <View>
        <View>
          客户可退款金额:
          {`￥${value?.customerPlanRefundMoney
            ?.toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? 0}`}
        </View>
        <View>
          <View>退款记录</View>
          {value?.orderItemCustomerRefunds?.map((item, index) => (
            <AtCard
              className={styles.card}
              key={index}
              // extra="额外信息"
              title={item.orderItemCode}
            >
              <View>
                <View>退款单号:{item?.orderItemCode}</View>
                <View>申请人:{item?.refundUserName}</View>
                <View>申请时间:{item?.refundTime}</View>
                <View>
                  申请退款金额:
                  {`￥${item?.customerApplicationRefundMoney
                    ?.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? 0}`}
                </View>

                <View>
                  {" "}
                  实际退款金额:
                  {`￥${item?.customerRealRefundMoney
                    ?.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? 0}`}
                </View>
              </View>
            </AtCard>
          ))}
        </View>
      </View>
    );
  };
  // 归档信息
  const getFile = value => (
    <AtList>
      <AtListItem title="归档人" note={value?.archiveUserName} />
      <AtListItem title="归档时间" note={value?.archiveTime} />
      <AtListItem title="归档说明" note={value?.archiveDescription} />
    </AtList>
  );
  // 认领回款
  const getBack = value => {
    return (
      <View>
        <View>
          客户已回款总额:
          {`￥${value?.totalReceiveMoney
            ?.toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? 0}`}
        </View>
        <View>
          <View>认领记录</View>
          {value?.orderItemReceiveList?.map((item, index) => (
            <AtCard
              className={styles.card}
              key={index}
              // extra="额外信息"
              title={item.companyName}
            >
              <View>
                <View>认领时间:{item?.operatorTime}</View>
                <View>认领人:{item?.operatorUserName}</View>
                <View>
                  认领金额:
                  {`￥${item?.receiveAmount
                    ?.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? 0}`}
                </View>
                <View>回款主体:{item?.companyName}</View>
                <View>认领说明:{item?.description}</View>
                <View>认领状态:{item?.unconfirmed ? "未确认" : "-"}</View>
              </View>
            </AtCard>
          ))}
        </View>
      </View>
    );
  };

  // 结算明细
  const getSellttle = value => {
    return (
      <View>
        <View>
          <View>结算总计</View>
          <AtList>
            <AtListItem
              title="客户金额"
              note={`￥${value?.orderItemSettlementCount?.customerMoney
                ?.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? "0"}`}
            />
            <AtListItem
              title="媒体金额"
              note={`￥${value?.orderItemSettlementCount?.mediaMoney
                ?.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? "0"}`}
            />
            <AtListItem
              title="返点类型"
              note={value?.orderItemSettlementCount?.rebateTypeName}
            />
            <AtListItem
              title="返点比例"
              note={
                value?.orderItemSettlementCount?.rebate
                  ? value?.orderItemSettlementCount?.rebate * 100 + "%"
                  : "-"
              }
            />
            <AtListItem
              title="充值金额"
              note={`￥${value?.orderItemSettlementCount?.rechargeAmount
                ?.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? 0}`}
            />
            <AtListItem
              title="充值金额"
              note={`￥${value?.orderItemSettlementCount?.rechargeAmount
                ?.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? 0}`}
            />
            <AtListItem
              title="客户已回款总额"
              note={`￥${value?.orderItemSettlementCount?.orderItemReceiveReceiveAmount
                ?.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? 0}`}
            />
            <AtListItem
              title="客户已消耗总额"
              note={`￥${value?.orderItemSettlementCount?.customerConsumptionMoney
                ?.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? 0}`}
            />
            <AtListItem
              title="客户已结算总额"
              note={`￥${value?.orderItemSettlementCount?.customerRealSettlementMoney
                ?.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? 0}`}
            />
            <AtListItem
              title="客户已退款总额"
              note={`￥${value?.orderItemSettlementCount?.customerRealRefundMoney
                ?.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? 0}`}
            />
          </AtList>
        </View>
        <View>
          <View>客户结算</View>
          <AtList>
            <AtListItem
              title="客户结算编号"
              note={value?.orderItemSettlementCustomerCount[0]?.settlementCode}
            />
            <AtListItem
              title="客户结算人"
              note={
                value?.orderItemSettlementCustomerCount[0]?.settlementUserName
              }
            />
            <AtListItem
              title="客户结算时间"
              note={value?.orderItemSettlementCustomerCount[0]?.settlementTime}
            />
            <AtListItem
              title="客户应结金额"
              note={`￥${value?.orderItemSettlementCustomerCount[0]?.customerPlanSettlementMoney
                ?.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? 0}`}
            />
            <AtListItem
              title="客户实结金额"
              note={`￥${value?.orderItemSettlementCustomerCount[0]?.customerRealSettlementMoney
                ?.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? 0}`}
            />
            <AtListItem
              title="应结实结差额"
              note={`￥${value?.orderItemSettlementCustomerCount[0]?.customerRealPlanDifferenceMoney
                ?.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? 0}`}
            />
            <AtListItem
              title="发票类型"
              note={value?.orderItemSettlementCustomerCount[0]?.invoiceTypeName}
            />
            <AtListItem
              title="发票内容"
              note={
                value?.orderItemSettlementCustomerCount[0]?.invoiceContentName
              }
            />
            <AtListItem
              title="发票文件"
              note={
                <ImageBox
                  imgs={value?.orderItemSettlementCustomerCount[0]?.invoiceFileUrls?.split(
                    ","
                  )}
                />
              }
            />
          </AtList>
        </View>
        <View>
          <View>媒体结算</View>
          {value?.orderItemStatementDetails?.map((item, index) => (
            <AtCard
              className={styles.card}
              key={index}
              // extra="额外信息"
              title={item.orderItemCode}
            >
              <View>
                <View>结算单编号:{item?.orderItemCode}</View>
                <View>
                  客户消耗金额:
                  {`￥${item?.customerConsumptionMoney
                    ?.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? 0}`}
                </View>
                <View>
                  客户结算总额:
                  {`￥${item?.customerSettlementMoney
                    ?.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? 0}`}
                </View>
                <View>
                  客户应结金额:
                  {`￥${item?.customerRealSettlementMoney
                    ?.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? 0}`}
                </View>
                <View>
                  客户可退款金额:
                  {`￥${item?.customerReturnGoodsMoney
                    ?.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? 0}`}
                </View>
                <View>结算月份:{item?.settlementMonth}</View>
              </View>
            </AtCard>
          ))}
        </View>
      </View>
    );
  };

  // 项目列表
  const getProject = value =>
    value?.map(item => (
      <AtCard
        className={styles.card}
        key={item.orderItemCode}
        // extra="额外信息"
        title={item.orderItemName}
      >
        <View>
          <View>项目编号:{item?.orderItemCode}</View>
          <View>项目名称:{item?.orderItemName}</View>
          <View>付款方式:{item?.paymentTypeName}</View>
          <View>执行日期:{item?.executionDate}</View>
          <View>结算方式:{item?.settlementTypeName}</View>
          <View>
            客户实结总额:
            {`￥${item?.customerRealSettlementMoney
              ?.toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? 0}`}
          </View>
          <View>
            客户结算总额:
            {`￥${item?.customerSettlementMoney
              ?.toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? 0}`}
          </View>
          <View>
            应结实结差额:
            {`￥${item?.customerRealPlanDifferenceMoney
              ?.toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? 0}`}
          </View>
          <View>
            客户消耗总额:
            {`￥${item?.customerConsumptionMoney
              ?.toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? 0}`}
          </View>
          <View>
            退货金额:
            {`￥${item?.customerRealReturnGoodsMoney
              ?.toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? 0}`}
          </View>
          <View>
            项目客户总额:
            {`￥${item?.orderItemCustomerMoney
              ?.toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? 0}`}
          </View>
          <View>
            项目媒体总额:
            {`￥${item?.orderItemMediaMoney
              ?.toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? 0}`}
          </View>
          <View>业务类型:{item?.businessTypeName}</View>
        </View>
      </AtCard>
    ));
  // 项目执行
  const getExecute = value => (
    <AtList>
      <AtListItem title="执行人" note={value?.operatorUserName} />
      <AtListItem title="执行时间" note={value?.executionTime} />
      <AtListItem title="执行操作" note={value?.executionTypeName} />
      <AtListItem
        title="充值金额"
        note={`￥${value?.rechargeAmount
          ?.toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? 0}`}
      />
      {value?.executionTypeCode === "xiangmuzhixingcaozuozhanghuchongzhi" && (
        <AtListItem title="充值账户" note={value?.accountName} />
      )}
      {value?.executionTypeCode === "xiangmuzhixingcaozuopinpaitoufang" && (
        <AtListItem title="投放时间" note={value?.adScheduleTime} />
      )}
      {value?.executionTypeCode === "xiangmuzhixingcaozuosucaizhizuo" && (
        <AtListItem title="交付时间" note={value?.materialDeliveryTime} />
      )}
      <AtListItem title="执行说明" note={value?.description} />
      <AtListItem
        title="执行截图"
        note={<ImageBox imgs={value?.executionImage?.split(",")} />}
      />
    </AtList>
  );
  // 客户确认信息
  const getConfirm = value => (
    <AtList>
      <AtListItem title="确认人" note={value?.operatorUserName} />
      <AtListItem title="客户意见" note={value?.customerFeedbackName} />
      <AtListItem title="操作时间" note={value?.operatorTime} />
      <AtListItem title="确认说明" note={value?.description} />
      <AtListItem
        title="确认截图"
        note={<ImageBox imgs={value?.confirmImage?.split(",")} />}
      />
      <AtListItem title="客户确认时间" note={value?.confirmTime} />
    </AtList>
  );
  // 订单信息
  const getOrder = value => (
    <AtList>
      <AtListItem title="订单编号" note={value?.code} />
      <AtListItem title="订单名称" note={value?.name} />
      <AtListItem title="订单类型" note={value?.orderTypeName} />
      <AtListItem title="服务主体" note={value?.serviceUnitName} />
      <AtListItem title="客户集团" note={value?.customerName} />
      <AtListItem title="业务类型" note={value?.businessTypeName} />
      <AtListItem title="付款方式" note={value?.paymentTypeName} />
      <AtListItem title="下单人" note={value?.orderUserName} />
      <AtListItem title="下单时间" note={value?.orderTime} />
    </AtList>
  );
  // 项目信息
  const getInfo = value => (
    <AtList>
      <AtListItem title="项目名称" note={value?.name} />
      <AtListItem title="客户主体" note={value?.companyName} />
      <AtListItem title="媒体名称" note={value?.mediaName} />
      <AtListItem title="媒体版块" note={value?.mediaPlateName} />
      <AtListItem title="产品类型" note={value?.productTypeName} />
      <AtListItem title="产品名称" note={value?.productName} />
      <AtListItem title="付款方式" note={value?.paymentTypeName} />
      <AtListItem title="结算方式" note={value?.settlementTypeName} />
      <AtListItem title="服务类型" note={value?.serviceTypeName} />
      <AtListItem title="负责AE" note={value?.aeUserName} />
      <AtListItem title="销售" note={value?.saleverUserName} />
      <AtListItem title="媒介" note={value?.mediumUserName} />
      <AtListItem title="媒体付款日期" note={value?.mediaPamentDate} />
      <AtListItem title="媒体发票类型" note={value?.mediaInvoiceTypeName} />
      <AtListItem title="媒体发票内容" note={value?.mediaInvoiceContentName} />
      <AtListItem title="客户付款日期" note={value?.customerPaymentDate} />
      <AtListItem title="客户发票类型" note={value?.customerInvoiceTypeName} />
      <AtListItem
        title="客户发票内容"
        note={value?.customerInvoiceContentName}
      />
      <AtListItem title="客户账期" note={value?.companyPlatePamentName} />
      <AtListItem
        title="垫款天数"
        note={`${value.maxLoanDays ?? 0}天 (${value.maxLoanDays ?? 0}天)`}
      />
      <AtListItem
        title="执行日期"
        note={`${
          value?.executionEndDate
            ? value?.executionDate + " ~ " + value?.executionEndDate
            : value?.executionDate
            ? value?.executionDate
            : "-"
        }`}
      />
      <AtListItem title="客户政策" note={value?.companyPlatePolicyName} />
      <AtListItem title="政策类型" note={value?.rebateTypeName} />
      <AtListItem
        title="政策比例"
        note={value?.rebate ? value?.rebate * 100 + "%" : "-"}
      />
      <AtListItem
        title="客户金额"
        note={`￥${value?.customerMoney
          ?.toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? 0}`}
      />
      <AtListItem
        title="媒体金额"
        note={`￥${value?.mediaMoney
          ?.toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? 0}`}
      />
      <AtListItem
        title="差价"
        note={`${
          value?.mediaMoney && value?.customerMoney
            ? value?.customerMoney - value?.mediaMoney >= 0
              ? "￥" +
                format(subtract(value?.customerMoney, value?.mediaMoney), {
                  precision: 14
                })
                  ?.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : "￥" +
                format(subtract(value?.customerMoney, value?.mediaMoney), {
                  precision: 14
                })
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : "￥0"
        }`}
      />
      <AtListItem title="项目说明" note={value?.description} />
      <AtListItem title="关联合同" note={value?.contractName} />
      <AtListItem title="回款截止日期" note={value?.maxPaymentEndTime} />
    </AtList>
  );
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
        {data?.map((item, index) =>
          item.type ? (
            <AtTabsPane current={item.current} index={item.current}>
              {getTabs(item.type, item.value)}
            </AtTabsPane>
          ) : null
        )}
      </AtTabs>
    </View>
  );
};

export default Index;
