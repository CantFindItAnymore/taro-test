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
    console.log(id);

    if (id) {
      Review.getDetail({ id }).then(res => {
        setDetail(res);
      });
    }
  };

  return detail?.processDefinitionKey ? (
    <ViewDetailWrapper>
      <View className={styles.container}>
        {/* 订单 */}
        {detail?.processDefinitionKey === "order_process" && <OrderDetail />}
        {/* 项目 */}
        {detail?.processDefinitionKey === "order_item_execution" && (
          <ProjectDetail />
        )}
        {/* 合同 */}
        {detail?.processDefinitionKey === "contract_save" && <ContractDetail />}
        {/* 结算 */}
        {detail?.processDefinitionKey === "customer_settlement" && (
          <SettlementDetail />
        )}
        {/* 退款 */}
        {detail?.processDefinitionKey === "customer_refund" && <RefundDetail />}
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
        ].includes(detail?.processDefinitionKey) && <CustomerDetail />}
      </View>
    </ViewDetailWrapper>
  ) : (
    <Empty />
  );
}

export default ViewDetail;
