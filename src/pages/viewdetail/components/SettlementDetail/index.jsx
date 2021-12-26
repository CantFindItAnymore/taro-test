import { useState, useEffect } from "react";

import { View, Text } from "@tarojs/components";
import { AtTabs, AtTabsPane, AtList, AtListItem, AtCard } from "taro-ui";
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
      case "jiesuanxinxi":
        return getInfo(value);
      case "xiangmuliebiao":
        return getProject(value);
      case "fapiaoxinxi":
        return getReceipt(value);
      case "gaizhangxinxi":
        return getStamp(value);
      case "kuaidixinxi":
        return getExpress(value);
      case "guidangxinxi":
        return getFile(value);
      default:
        return <span>暂无相关数据信息</span>;
    }
  };
  // 归档信息
  const getFile = value => (
    <AtList>
      <AtListItem title="归档人" note={value?.archiveUserName} />
      <AtListItem title="归档时间" note={value?.archiveTime} />
      <AtListItem title="归档说明" note={value?.archiveDescription} />
      <AtListItem
        title="账单扫描件"
        note={<ImageBox imgs={value?.archiveFileUrls?.split(",")} />}
      />
    </AtList>
  );
  // 快递信息
  const getExpress = value =>
    value?.map((item, index) => (
      <AtCard
        className={styles.card}
        key={index}
        // extra="额外信息"
        title={item.logisticsOrderNo}
      >
        <View>
          <View>快递公司:{item?.logisticsCompanyName}</View>
          <View>快递单号:{item?.logisticsOrderNo}</View>
          <View>
            快递单据:
            <ImageBox imgs={item?.logisticsOrderFileUrl?.split(",")} />
          </View>
        </View>
      </AtCard>
    ));
  // 发票信息
  const getReceipt = value => (
    <AtList>
      <AtListItem title="往来单位" note={value?.customerName} />
      <AtListItem title="往来单位主体" note={value?.invoiceTitleName} />
      <AtListItem title="发票类型" note={value?.invoiceTypeName} />
      <AtListItem
        title="发票金额"
        note={`￥${value?.invoiceMoney
          ?.toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? 0}`}
      />
      <AtListItem title="发票内容" note={value?.invoiceContentName} />
      <AtListItem title="接收人" note={value?.recipient} />
      <AtListItem title="联系电话" note={value?.telephone} />
      <AtListItem title="邮寄地址" note={value?.address} />
      <AtListItem
        title="电子发票"
        note={<ImageBox imgs={value?.invoiceFileUrls?.split(",")} />}
      />
      <AtListItem title="说明" note={value?.description} />
    </AtList>
  );
  // 盖章信息
  const getStamp = value =>
    value?.map((item, index) => (
      <AtCard
        className={styles.card}
        key={index}
        // extra="额外信息"
        title={item.stampDescription}
      >
        <View>
          <View>操作人:{item?.stampUserName}</View>
          <View>盖章类型:{item?.stampTypeName}</View>
          <View>盖章时间:{item?.stampTime}</View>
          <View>盖章说明:{item?.stampDescription}</View>
        </View>
      </AtCard>
    ));
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
  // 结算信息
  const getInfo = value => (
    <AtList>
      <AtListItem title="服务主体" note={value?.serviceUnitName} />
      <AtListItem title="结算月份" note={value?.settlementMonthString} />
      <AtListItem title="客户名称" note={value?.customerName} />
      <AtListItem title="付款方式" note={value?.paymentTypeName} />
      <AtListItem title="结算方式" note={value?.settlementTypeName} />
      <AtListItem title="业务类型" note={value?.businessTypeName} />
      <AtListItem title="媒体" note={value?.mediaName} />
      <AtListItem title="媒体版块" note={value?.mediaSectionName} />
      <AtListItem title="账单类型" note={value?.billType} />
      <AtListItem title="结算人" note={value?.settlementUserName} />
      <AtListItem title="结算时间" note={value?.settlementTime} />
      <AtListItem title="结算单" note={value?.settlementCode} />
      <AtListItem
        title="客户实结总额"
        note={`￥${value?.totalCustomerRealSettlementMoney
          ?.toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? 0}`}
      />
      <AtListItem
        title="客户结算总额"
        note={`￥${value?.totalCustomerSettlementMoney
          ?.toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? 0}`}
      />
      <AtListItem
        title="客户应结实结差额"
        note={`￥${value?.totalCustomerRealPlanDifferenceMoney
          ?.toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? 0}`}
      />
      <AtListItem
        title="客户消耗总额"
        note={`￥${value?.totalCustomerConsumptionMoney
          ?.toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? 0}`}
      />
      <AtListItem
        title="退货总额"
        note={`￥${value?.totalRealReturnGoodsMoney
          ?.toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? 0}`}
      />
      <AtListItem
        title="项目客户总额"
        note={`￥${value?.totalOrderItemCustomerMoney
          ?.toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? 0}`}
      />
      <AtListItem
        title="项目媒体总额"
        note={`￥${value?.totalOrderItemMediaMoney
          ?.toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? 0}`}
      />
      <AtListItem title="项目数" note={value?.orderItemCount} />
      <AtListItem title="申请盖章类型" note={value?.applyStampTypeName} />
      <AtListItem title="申请盖章说明" note={value?.applyStampDescription} />
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
