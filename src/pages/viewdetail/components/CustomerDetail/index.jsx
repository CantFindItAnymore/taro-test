import { useState, useEffect } from "react";
import Taro from "@tarojs/taro";

import { View, Image } from "@tarojs/components";
import { AtTabs, AtTabsPane, AtList, AtListItem, AtTag } from "taro-ui";
import ImageBox from "../../../../components/ImageBox";
import styles from "./index.module.styl";

const tabList = [
  { title: "主体信息" },
  { title: "客户集团" },
  { title: "联系人" },
  { title: "负责人" },
  { title: "客户授信" },
  { title: "客户账期" },
  { title: "客户政策" },
  { title: "风控确认" },
  { title: "内控复核" }
];

const CustomerDetail = props => {
  const { data, code } = props;
  console.log("客户", data);
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
              <AtListItem
                title="主体名称"
                note={data[current].value.company.name}
              />
              <AtListItem
                title="客户集团"
                note={data[current].value.customerName}
              />
              <AtListItem
                title="主体简称"
                note={data[current].value.company.shortName}
              />
              <AtListItem
                title="纳税人资质"
                note={data[current].value.company.taxpayerTypeName}
              />
              <AtListItem
                title="纳税人识别码"
                note={data[current].value.company.taxpayerNumber}
              />
              <AtListItem
                title="法人名称"
                note={data[current].value.company.legalPerson}
              />
              <AtListItem
                title="开户行"
                note={data[current].value.company.depositBank}
              />
              <AtListItem
                title="开户名称"
                note={data[current].value.company.accountName}
              />
              <AtListItem
                title="银行账号"
                note={data[current].value.company.accountNumber}
              />

              <AtListItem
                title="公司创立时间"
                note={data[current].value.company.foundYearName}
              />
              <AtListItem
                title="公司注册资金"
                note={data[current].value.company.registeredCapitalName}
              />
              <AtListItem
                title="资金来源"
                note={data[current].value.company.capitalSourceName}
              />
              <AtListItem
                title="公司组织形式"
                note={data[current].value.company.organizationFormsName}
              />
              <AtListItem
                title="实际办公面积"
                note={data[current].value.company.officeAreaName}
              />
              <AtListItem
                title="员工人数"
                note={data[current].value.company.employeeCountName}
              />
              <AtListItem
                title="和我司有过纠纷和诉讼"
                note={data[current].value.company.legalDisputeName}
              />
              <AtListItem
                title="法人身份证"
                note={
                  <ImageBox
                    imgs={data[current].value?.company?.idCardUrls?.split(",")}
                  />
                }
              />
              <AtListItem
                title="营业执照"
                note={
                  <ImageBox
                    imgs={data[
                      current
                    ].value?.company?.businessLicenseUrls?.split(",")}
                  />
                }
              />
              {/* 板块信息 */}
              <AtListItem
                title="联系人"
                note={data[current].value.companyPlate?.contactName}
              />
              <AtListItem
                title="主题关联证明"
                note={
                  <ImageBox
                    imgs={data[
                      current
                    ].value?.companyPlate?.relationshipProofUrls?.split(",")}
                  />
                }
              />
              <AtListItem
                title="其他资质证明"
                note={
                  <ImageBox
                    imgs={data[
                      current
                    ].value?.companyPlate?.otherProofUrls?.split(",")}
                  />
                }
              />
            </AtList>
          )}
        </AtTabsPane>
        <AtTabsPane current={current} index={1}>
          {current === 1 && (
            <AtList>
              <AtListItem
                title="客户编号"
                note={data[current].value?.customer?.code}
              />
              <AtListItem
                title="客户集团"
                note={data[current].value?.customer?.name}
              />
              <AtListItem
                title="和我司合作年限"
                note={data[current].value.customer?.cooperationDurationName}
              />
              <AtListItem
                title="同行业评价"
                note={data[current].value.customer?.cooperationDurationName}
              />
              <AtListItem
                title="是否有优质产品和稳定收入"
                note={data[current].value.customer?.qualityProductName}
              />
              <AtListItem
                title="所属行业"
                note={data[current].value.customerPlate?.industryName}
              />
              <AtListItem
                title="客户类型"
                note={data[current].value.customerPlate?.customerTypeName}
              />
              <AtListItem
                title="授权方式"
                note={data[current].value.customerPlate?.accreditTypeName}
              />
              <AtListItem
                title="主营产品"
                note={data[current].value.customerPlate?.products}
              />

              <AtListItem
                title="邮寄地址"
                note={data[current].value.customerPlate?.postalAddress}
              />
              <AtListItem
                title="月流水"
                note={data[current].value.customerPlate?.postalAddress}
              />
              <AtListItem
                title="合作账期"
                note={data[current].value.customerPlate?.cooperationPaymentName}
              />
              <AtListItem
                title="优势或独代媒体签框架数量"
                note={data[current].value.customerPlate?.cooperationPaymentName}
              />
              <AtListItem
                title="公司可把控的高层关系"
                note={
                  data[current].value.customerPlate?.leadershipRelationshipName
                }
              />
              <AtListItem
                title="总经理客户评分"
                note={data[current].customerPlate?.managerScoreName}
              />
              <AtListItem
                title="以往付款态度"
                note={data[current].value.customerPlate?.paymentAttitudeName}
              />
              <AtListItem
                title="预计年投放量"
                note={data[current].value.customerPlate?.predictLaunchName}
              />
              <AtListItem
                title="客户说明"
                note={data[current].value.customerPlate?.predictLaunchName}
              />
            </AtList>
          )}
        </AtTabsPane>
        <AtTabsPane current={current} index={2}>
          {current === 2 && (
            <AtList>
              <AtListItem title="联系人" note={data[current].value?.name} />
              <AtListItem title="电话" note={data[current].value?.phone} />
              <AtListItem title="电子邮箱" note={data[current].value?.email} />
              <AtListItem title="微信号" note={data[current].value?.wxNumber} />
              <AtListItem
                title="授权证明"
                note={
                  <ImageBox imgs={data[current].value?.authUrls?.split(",")} />
                }
              />
              <AtListItem
                title="证明有效期"
                note={
                  data[current].value?.startTime && data[current].value?.endTime
                    ? `${data[current].value?.startTime}-${data[current].value?.endTime}`
                    : ""
                }
              />
            </AtList>
          )}
        </AtTabsPane>
        <AtTabsPane current={current} index={3}>
          {current === 3 && (
            <AtList>
              <AtListItem
                title="事业版块"
                note={data[current].value.company.name}
              />
              <AtListItem
                title="负责人"
                note={data[current].value.customerName}
              />
              <AtListItem
                title="负责人部门"
                note={data[current].value.company.shortName}
              />
              <AtListItem
                title="销售"
                note={data[current].value.company.taxpayerTypeName}
              />
            </AtList>
          )}
        </AtTabsPane>
        <AtTabsPane current={current} index={4}>
          {current === 4 && (
            <AtList>
              <AtListItem
                title="客户评分"
                note={data[current].value.company.name}
              />
              <AtListItem
                title="客户评级"
                note={data[current].value.customerName}
              />
              <AtListItem
                title="授信额度上限"
                note={data[current].value.company.shortName}
              />
              <AtListItem
                title="共享集团授信"
                note={data[current].value.company.taxpayerTypeName}
              />
              <AtListItem
                title="申请授信额度"
                note={data[current].value.company.taxpayerNumber}
              />
              <AtListItem
                title="资格认证方式"
                note={data[current].value.company.legalPerson}
              />
              <AtListItem
                title="担保证明"
                note={data[current].value.company.depositBank}
              />
              <AtListItem
                title="剩余授信额度"
                note={data[current].value.company.accountName}
              />
            </AtList>
          )}
        </AtTabsPane>
        <AtTabsPane current={current} index={5}>
          {current === 5 && (
            <AtList>
              <AtListItem
                title="客户编号"
                note={data[current].value.company.name}
              />
              <AtListItem
                title="客户集团"
                note={data[current].value.customerName}
              />
              <AtListItem
                title="和我司合作年限"
                note={data[current].value.company.shortName}
              />
              <AtListItem
                title="同行业评价"
                note={data[current].value.company.taxpayerTypeName}
              />
              <AtListItem
                title="是否有优质产品和稳定收入"
                note={data[current].value.company.taxpayerNumber}
              />
              <AtListItem
                title="所属行业"
                note={data[current].value.company.legalPerson}
              />
              <AtListItem
                title="客户类型"
                note={data[current].value.company.depositBank}
              />
              <AtListItem
                title="授权方式"
                note={data[current].value.company.accountName}
              />
              <AtListItem
                title="主营产品"
                note={data[current].value.company.accountNumber}
              />

              <AtListItem
                title="邮寄地址"
                note={data[current].value.company.foundYearName}
              />
              <AtListItem
                title="月流水"
                note={data[current].value.company.registeredCapitalName}
              />
              <AtListItem
                title="合作账期"
                note={data[current].value.company.capitalSourceName}
              />
              <AtListItem
                title="优势或独代媒体签框架数量"
                note={data[current].value.company.organizationFormsName}
              />
              <AtListItem
                title="公司可把控的高层关系"
                note={data[current].value.company.officeAreaName}
              />
              <AtListItem
                title="总经理客户评分"
                note={data[current].value.company.employeeCountName}
              />
              <AtListItem
                title="以往付款态度"
                note={data[current].value.company.legalDisputeName}
              />
              <AtListItem
                title="预计年投放量"
                note={data[current].value.companyPlate?.contactName}
              />
              <AtListItem
                title="客户说明"
                note={data[current].value.companyPlate?.contactName}
              />
            </AtList>
          )}
        </AtTabsPane>
        <AtTabsPane current={current} index={6}>
          {current === 6 && (
            <AtList>
              <AtListItem
                title="客户编号"
                note={data[current].value.company.name}
              />
              <AtListItem
                title="客户集团"
                note={data[current].value.customerName}
              />
              <AtListItem
                title="和我司合作年限"
                note={data[current].value.company.shortName}
              />
              <AtListItem
                title="同行业评价"
                note={data[current].value.company.taxpayerTypeName}
              />
              <AtListItem
                title="是否有优质产品和稳定收入"
                note={data[current].value.company.taxpayerNumber}
              />
              <AtListItem
                title="所属行业"
                note={data[current].value.company.legalPerson}
              />
              <AtListItem
                title="客户类型"
                note={data[current].value.company.depositBank}
              />
              <AtListItem
                title="授权方式"
                note={data[current].value.company.accountName}
              />
              <AtListItem
                title="主营产品"
                note={data[current].value.company.accountNumber}
              />

              <AtListItem
                title="邮寄地址"
                note={data[current].value.company.foundYearName}
              />
              <AtListItem
                title="月流水"
                note={data[current].value.company.registeredCapitalName}
              />
              <AtListItem
                title="合作账期"
                note={data[current].value.company.capitalSourceName}
              />
              <AtListItem
                title="优势或独代媒体签框架数量"
                note={data[current].value.company.organizationFormsName}
              />
              <AtListItem
                title="公司可把控的高层关系"
                note={data[current].value.company.officeAreaName}
              />
              <AtListItem
                title="总经理客户评分"
                note={data[current].value.company.employeeCountName}
              />
              <AtListItem
                title="以往付款态度"
                note={data[current].value.company.legalDisputeName}
              />
              <AtListItem
                title="预计年投放量"
                note={data[current].value.companyPlate?.contactName}
              />
              <AtListItem
                title="客户说明"
                note={data[current].value.companyPlate?.contactName}
              />
            </AtList>
          )}
        </AtTabsPane>
        <AtTabsPane current={current} index={7}>
          {current === 7 && (
            <AtList>
              <AtListItem
                title="资金来源"
                note={data[current].value.company.name}
              />
              <AtListItem
                title="公司注册资本（实缴）"
                note={data[current].value.customerName}
              />
              <AtListItem
                title="公司注册形式"
                note={data[current].value.company.shortName}
              />
              <AtListItem
                title="客户集团核实结果"
                note={data[current].value.company.taxpayerTypeName}
              />
              <AtListItem
                title="和我公司有过纠纷和诉讼"
                note={data[current].value.company.taxpayerNumber}
              />
              <AtListItem
                title="是否有外部高风险诉讼"
                note={data[current].value.company.legalPerson}
              />
              <AtListItem
                title="集团信息确认说明"
                note={data[current].value.company.depositBank}
              />
              <AtListItem
                title="审批意见"
                note={data[current].value.company.accountName}
              />
            </AtList>
          )}
        </AtTabsPane>
        <AtTabsPane current={current} index={8}>
          {current === 8 && (
            <AtList>
              <AtTag type="primary">系统数据</AtTag>
              <AtListItem
                title="客户总授信金额"
                note={data[current]?.value?.customerCreditAmountSystem
                  ?.toString()
                  ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              />
              <AtListItem
                title="已下单金额"
                note={data[current]?.value?.orderAmountSystem
                  ?.toString()
                  ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              />
              <AtListItem
                title="应收金额"
                note={data[current]?.value?.receivableAmountSystem
                  ?.toString()
                  ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              />
              <AtListItem
                title="逾期应收金额"
                note={data[current]?.value?.outstandingAmountSystem
                  ?.toString()
                  ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              />

              <AtTag type="primary">内控数据</AtTag>

              <AtListItem
                title="客户总授信金额"
                note={data[current]?.value?.customerCreditAmount
                  ?.toString()
                  ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              />
              <AtListItem
                title="已下单金额"
                note={data[current]?.value?.orderAmount
                  ?.toString()
                  ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              />
              <AtListItem
                title="应收金额"
                note={data[current]?.value?.receivableAmount
                  ?.toString()
                  ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              />
              <AtListItem
                title="逾期应收金额"
                note={data[current]?.value?.outstandingAmount
                  ?.toString()
                  ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              />
            </AtList>
          )}
        </AtTabsPane>
      </AtTabs>
    </View>
  );
};

export default CustomerDetail;
