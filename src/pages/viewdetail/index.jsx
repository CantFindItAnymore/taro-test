import { useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";

import styles from "./index.module.styl";

import { ReviewModel } from "../../../api/models/review";
import ViewDetailWrapper from "../../components/ViewDetailWrapper";
import OrderDetail from "./components/OrderDetail";
import ProjectDetail from "./components/ProjectDetail";
import ContractDetail from "./components/ContractDetail";
import SettlementDetail from "./components/SettlementDetail";
import RefundDetail from "./components/RefundDetail";
import CustomerDetail from "./components/CustomerDetail";
import Empty from "../../components/Empty";

const Review = new ReviewModel();

function ViewDetail() {
  const [detail, setDetail] = useState({});

  useEffect(() => {
    _getParams();
  }, []);

  // 获取入参并获取详情
  const _getParams = () => {
    const { id } = Taro.getCurrentInstance().router.params;
    console.log("传入的id", id);

    if (id) {
      Review.getDetail({ id }).then(res => {
        setDetail(res);
      });
    }
  };

  console.log(0, detail);
  const viewData = detail?.formData ? JSON.parse(detail.formData) : {};

  console.log("viewData", viewData);

  return detail?.processDefinitionKey ? (
    <ViewDetailWrapper detail={detail}>
      <View className={styles.container}>
        {/* 订单 */}
        {detail?.processDefinitionKey === "order_process" && (
          <OrderDetail viewData={viewData} />
        )}
        {/* 项目 */}
        {detail?.processDefinitionKey === "order_item_execution" && (
          <ProjectDetail
            code={viewData?.code}
            data={[
              {
                key: "项目信息",
                type: viewData?.orderItem ? "xiangmuxinxi" : null,
                current: 0,
                value: viewData?.orderItem
              },
              {
                key: "订单信息",
                type: viewData?.order ? "dingdanxinxi" : null,
                current: 1,
                value: viewData?.order
              },
              {
                key: "客户确认",
                type: viewData?.orderItemCustomerConfirm ? "kehuqueren" : null,
                current: 4,
                value: viewData?.orderItemCustomerConfirm
              },
              {
                key: "项目执行",
                type: viewData?.orderItemExecution ? "xiangmuzhixing" : null,
                current: 4,
                value: viewData?.orderItemExecution
              },
              {
                key: "结算明细",
                type: viewData?.orderItemSettlement ? "jiesuanmingxi" : null,
                current: 5,
                value: viewData?.orderItemSettlement
              },
              {
                key: "认领回款",
                type: viewData?.orderItemReceive ? "renlinghuikuan" : null,
                current: 6,
                value: viewData?.orderItemReceive
              },
              {
                key: "归档信息",
                type: viewData?.orderItemArchive ? "guidangxinxi" : null,
                current: 6,
                value: viewData?.orderItemArchive
              },
              {
                key: "退款信息",
                type: viewData?.orderItemRefund ? "tuikuanxinxi" : null,
                current: 6,
                value: viewData?.orderItemRefund
              }
            ]}
          />
        )}
        {/* 合同 */}
        {detail?.processDefinitionKey === "contract_save" && (
          <ContractDetail code={viewData?.code} data={detail} />
        )}
        {/* 结算 */}
        {detail?.processDefinitionKey === "customer_settlement" && (
          <SettlementDetail
            code={viewData?.code}
            data={[
              {
                key: "结算信息",
                type: viewData?.settlement ? "jiesuanxinxi" : null,
                current: 0,
                value: viewData?.settlement
              },
              {
                key: "项目列表",
                type: viewData?.orderItems ? "xiangmuliebiao" : null,
                current: 1,
                value: viewData?.orderItems
              },
              {
                key: "发票信息",
                type: viewData?.invoice ? "fapiaoxinxi" : null,
                current: 4,
                value: viewData?.invoice
              },
              {
                key: "盖章信息",
                type: viewData?.stampList ? "gaizhangxinxi" : null,
                current: 4,
                value: viewData?.stampList
              },
              {
                key: "快递信息",
                type: viewData?.expressList ? "kuaidixinxi" : null,
                current: 5,
                value: viewData?.expressList
              },
              {
                key: "归档信息",
                type: viewData?.archive ? "guidangxinxi" : null,
                current: 6,
                value: viewData?.archive
              }
            ]}
          />
        )}
        {/* 退款 */}
        {detail?.processDefinitionKey === "customer_refund" && (
          <RefundDetail
            code={viewData?.code}
            data={[
              {
                key: "申请信息",
                type: viewData?.customerRefundDetail ? "shenqingxinxi" : null,
                current: 0,
                value: viewData?.customerRefundDetail
              },
              {
                key: "项目列表",
                type: viewData?.orderItemCustomerRefundDetail
                  ? "xiangmuliebiao"
                  : null,
                current: 1,
                value: viewData?.orderItemCustomerRefundDetail
              },
              {
                key: "媒介确认",
                type: viewData?.customerRefundMediumConfirmDetail
                  ? "meijiequeren"
                  : null,
                current: 2,
                value: viewData?.customerRefundMediumConfirmDetail
              },
              {
                key: "财务付款",
                type: viewData?.customerRefundPaymentDetail
                  ? "caiwufukuan"
                  : null,
                current: 3,
                value: viewData?.customerRefundPaymentDetail
              },
              {
                key: "发票信息",
                type: viewData?.customerRefundInvoiceDetail
                  ? "fapiaoxinxi"
                  : null,
                current: 4,
                value: viewData?.customerRefundInvoiceDetail
              },
              {
                key: "快递信息",
                type: viewData?.customerRefundExpressDetail
                  ? "kuaidixinxi"
                  : null,
                current: 5,
                value: viewData?.customerRefundExpressDetail
              },
              {
                key: "归档信息",
                type: viewData?.customerRefundArchiveDetail
                  ? "guidangxinxi"
                  : null,
                current: 6,
                value: viewData?.customerRefundArchiveDetail
              }
            ]}
          />
        )}
        {/* 客户相关 */}
        {[
          "customer_body_archive",
          "credit_change",
          "add_customer_policy",
          "customer_info_change",
          "payment_change",
          "principal_change",
          "company_info_change",
          "contact_change"
        ].includes(detail?.processDefinitionKey) && (
          <CustomerDetail
            code={viewData?.code}
            data={[
              {
                key: "主体信息",
                value: viewData?.companyDetail
              },
              {
                key: "客户集团",
                value: viewData?.customerDetail
              },
              {
                key: "联系人",
                value: viewData?.contactDetail
              },
              {
                key: "负责人",
                value: viewData?.principal
              },
              {
                key: "客户授信",
                value: viewData?.credit
              },
              {
                key: "客户账期",
                value: viewData?.pamentList
              },
              {
                key: "客户政策",
                value: viewData?.policyList
              },
              {
                key: "风控确认",
                value: viewData?.companyPlateRisk
              },
              {
                key: "内控复核",
                value: viewData?.companyPlateInternal
              }
            ]}
          />
        )}
      </View>
    </ViewDetailWrapper>
  ) : (
    <Empty />
  );
}

export default ViewDetail;
