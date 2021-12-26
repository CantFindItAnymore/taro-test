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
      case "shenqingxinxi":
        return getInfo(value);
      case "xiangmuliebiao":
        return getProject(value);
      case "meijiequeren":
        return getConfirm(value);
      case "caiwufukuan":
        return getFinance(value);
      case "fapiaoxinxi":
        return getReceipt(value);
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
      <AtListItem title="归档时间" note={value?.createdTime} />
      <AtListItem title="归档说明" note={value?.archiveDescription} />
    </AtList>
  );
  // 快递信息
  const getExpress = value => (
    <AtList>
      <AtListItem title="快递公司" note={value?.logisticsCompanyName} />
      <AtListItem title="快递单号" note={value?.logisticsOrderNo} />
      <AtListItem
        title="快递单据"
        note={<ImageBox imgs={value?.logisticsOrderFileUrl?.split(",")} />}
      />
    </AtList>
  );
  // 发票信息
  const getReceipt = value => (
    <AtList>
      <AtListItem title="往来单位" note={value?.customerName} />
      <AtListItem title="往来单位主体" note={value?.companyName} />
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
      <AtListItem title="说明" note={value?.invoiceDescription} />
    </AtList>
  );
  // 财务付款
  const getFinance = value => (
    <AtList>
      <AtListItem title="付款方式" note={value?.refundTypeName} />
      <AtListItem
        title="付款金额"
        note={`￥${value?.refundMoney
          ?.toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? 0}`}
      />
      <AtListItem title="服务主体" note={value?.serviceUnitName} />
      <AtListItem title="转账日期" note={value?.payDate} />
      <AtListItem title="科目类别" note={value?.sujectTypeName} />
      <AtListItem title="科目名称" note={value?.subjectName} />
      <AtListItem title="付款账户" note={value?.payAccountName} />
      <AtListItem title="往来单位" note={value?.refundReceiptName} />
      <AtListItem title="往来单位主体" note={value?.refundAccountName} />
      <AtListItem title="往来单位银行" note={value?.refundBank} />
      <AtListItem title="往来单位账户" note={value?.refundAccountName} />
      <AtListItem title="往来单位账号" note={value?.refundAccountNumber} />
      <AtListItem title="付款说明" note={value?.refundDescription} />
    </AtList>
  );
  // 媒介确认
  const getConfirm = value => (
    <AtList>
      <AtListItem title="客户集团" note={value?.customerName} />
      <AtListItem
        title="本月消耗金额"
        note={`￥${value?.totalMonthCustomerConsumptionMoney
          ?.toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? 0}`}
      />

      <AtListItem
        title="实际可退款总额"
        note={`￥${value?.customerPlanRefundMoney
          ?.toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? 0}`}
      />
      <AtListItem title="确认人" note={value?.confirmUserName} />
      <AtListItem title="确认时间" note={value?.confirmTime} />
      <AtListItem title="确认说明" note={value?.mediumDescription} />
    </AtList>
  );
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
          <View>结算方式:{item?.settlementTypeName}</View>
          <View>
            退款金额:
            {`￥${item?.customerApplicationRefundMoney
              ?.toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? 0}`}
          </View>
          <View>
            客户可退款金额:
            {`￥${item?.customerPlanRefundMoney
              ?.toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? 0}`}
          </View>
          <View>
            客户已回款总额:
            {`￥${item?.receiveAmount
              ?.toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? 0}`}
          </View>
        </View>
      </AtCard>
    ));
  // 申请信息
  const getInfo = value => (
    <AtList>
      <AtListItem title="服务主体" note={value?.serviceUnitName} />
      <AtListItem title="执行月份" note={value?.executionDate} />
      <AtListItem title="客户名称" note={value?.customerName} />
      <AtListItem title="媒体名称" note={value?.mediaName} />
      <AtListItem title="媒体版块" note={value?.mediaSectionName} />
      <AtListItem title="付款方式" note={value?.paymentTypeName} />
      <AtListItem title="结算方式" note={value?.settlementTypeName} />
      <AtListItem title="业务类型" note={value?.businessTypeName} />
      <AtListItem title="申请退款项目数" note={value?.orderItemCount} />

      <AtListItem
        title="申请退款总额"
        note={`￥${value?.customerApplicationRefundMoneys
          ?.toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? 0}`}
      />
      <AtListItem
        title="客户可退款总额"
        note={`￥${value?.customerPlanRefundMoneys
          ?.toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? 0}`}
      />
      <AtListItem
        title="实际可退款总额"
        note={`￥${value?.totalRealReturnMoney
          ?.toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? 0}`}
      />
      <AtListItem
        title="客户已回款总额"
        note={`￥${value?.receiveAmounts
          ?.toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? 0}`}
      />
      <AtListItem title="申请人" note={value?.createdBy} />
      <AtListItem title="申请时间" note={value?.createdTime} />
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
