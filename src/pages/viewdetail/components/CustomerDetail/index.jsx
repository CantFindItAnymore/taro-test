import { useState, useEffect } from "react";
import Taro from "@tarojs/taro";

import { View, Image, Text } from "@tarojs/components";
import { AtTabs, AtTabsPane, AtList, AtListItem, AtTag } from "taro-ui";
import ImageBox from "../../../../components/ImageBox";
import styles from "./index.module.styl";

// const tabList = [
//   { title: "主体信息" },
//   { title: "客户集团" },
//   { title: "联系人" },
//   { title: "负责人" },
//   { title: "客户授信" },
//   { title: "客户账期" },
//   { title: "客户政策" },
//   { title: "风控确认" },
//   { title: "内控复核" }
// ];

const CustomerDetail = props => {
  const { data, code } = props;
  console.log("客户", data);

  const [current, setCurrent] = useState(0);

  const treatedData = data.filter(_ => _.value !== undefined);
  const treatedTabList = [];
  treatedData.map(_ => {
    treatedTabList.push({ title: _.key });
  });

  console.log("客户tab", treatedData, treatedTabList);

  return (
    <View className={styles.container}>
      <AtTabs
        scroll
        current={current}
        tabList={treatedTabList}
        onClick={e => {
          setCurrent(e);
        }}
      >
        {treatedData.map((_, index) => {
          const { key } = _;

          switch (key) {
            case "主体信息":
              return (
                <AtTabsPane current={index} index={index}>
                  {current === index && (
                    <AtList>
                      <AtListItem
                        title="主体名称"
                        note={treatedData[current].value.company.name}
                      />
                      <AtListItem
                        title="客户集团"
                        note={treatedData[current].value.customerName}
                      />
                      <AtListItem
                        title="主体简称"
                        note={treatedData[current].value.company.shortName}
                      />
                      <AtListItem
                        title="纳税人资质"
                        note={
                          treatedData[current].value.company.taxpayerTypeName
                        }
                      />
                      <AtListItem
                        title="纳税人识别码"
                        note={treatedData[current].value.company.taxpayerNumber}
                      />
                      <AtListItem
                        title="法人名称"
                        note={treatedData[current].value.company.legalPerson}
                      />
                      <AtListItem
                        title="开户行"
                        note={treatedData[current].value.company.depositBank}
                      />
                      <AtListItem
                        title="开户名称"
                        note={treatedData[current].value.company.accountName}
                      />
                      <AtListItem
                        title="银行账号"
                        note={treatedData[current].value.company.accountNumber}
                      />

                      <AtListItem
                        title="公司创立时间"
                        note={treatedData[current].value.company.foundYearName}
                      />
                      <AtListItem
                        title="公司注册资金"
                        note={
                          treatedData[current].value.company
                            .registeredCapitalName
                        }
                      />
                      <AtListItem
                        title="资金来源"
                        note={
                          treatedData[current].value.company.capitalSourceName
                        }
                      />
                      <AtListItem
                        title="公司组织形式"
                        note={
                          treatedData[current].value.company
                            .organizationFormsName
                        }
                      />
                      <AtListItem
                        title="实际办公面积"
                        note={treatedData[current].value.company.officeAreaName}
                      />
                      <AtListItem
                        title="员工人数"
                        note={
                          treatedData[current].value.company.employeeCountName
                        }
                      />
                      <AtListItem
                        title="和我司有过纠纷和诉讼"
                        note={
                          treatedData[current].value.company.legalDisputeName
                        }
                      />
                      <AtListItem
                        title="法人身份证"
                        note={
                          <ImageBox
                            imgs={treatedData[
                              current
                            ].value?.company?.idCardUrls?.split(",")}
                          />
                        }
                      />
                      <AtListItem
                        title="营业执照"
                        note={
                          <ImageBox
                            imgs={treatedData[
                              current
                            ].value?.company?.businessLicenseUrls?.split(",")}
                          />
                        }
                      />
                      {/* 板块信息 */}
                      <AtListItem
                        title="联系人"
                        note={
                          treatedData[current].value.companyPlate?.contactName
                        }
                      />
                      <AtListItem
                        title="主题关联证明"
                        note={
                          <ImageBox
                            imgs={treatedData[
                              current
                            ].value?.companyPlate?.relationshipProofUrls?.split(
                              ","
                            )}
                          />
                        }
                      />
                      <AtListItem
                        title="其他资质证明"
                        note={
                          <ImageBox
                            imgs={treatedData[
                              current
                            ].value?.companyPlate?.otherProofUrls?.split(",")}
                          />
                        }
                      />
                    </AtList>
                  )}
                </AtTabsPane>
              );
              break;
            case "客户集团":
              return (
                <AtTabsPane current={index} index={index}>
                  {current === index && (
                    <AtList>
                      <AtListItem
                        title="客户编号"
                        note={treatedData[current].value?.customer?.code}
                      />
                      <AtListItem
                        title="客户集团"
                        note={treatedData[current].value?.customer?.name}
                      />
                      <AtListItem
                        title="和我司合作年限"
                        note={
                          treatedData[current].value?.customer
                            ?.cooperationDurationName
                        }
                      />
                      <AtListItem
                        title="同行业评价"
                        note={
                          treatedData[current].value?.customer
                            ?.cooperationDurationName
                        }
                      />
                      <AtListItem
                        title="是否有优质产品和稳定收入"
                        note={
                          treatedData[current].value?.customer
                            ?.qualityProductName
                        }
                      />
                      <AtListItem
                        title="所属行业"
                        note={
                          treatedData[current].value?.customerPlate
                            ?.industryName
                        }
                      />
                      <AtListItem
                        title="客户类型"
                        note={
                          treatedData[current].value?.customerPlate
                            ?.customerTypeName
                        }
                      />
                      <AtListItem
                        title="授权方式"
                        note={
                          treatedData[current].value?.customerPlate
                            ?.accreditTypeName
                        }
                      />
                      <AtListItem
                        title="主营产品"
                        note={
                          treatedData[current].value?.customerPlate?.products
                        }
                      />

                      <AtListItem
                        title="邮寄地址"
                        note={
                          treatedData[current].value?.customerPlate
                            ?.postalAddress
                        }
                      />
                      <AtListItem
                        title="月流水"
                        note={
                          treatedData[current].value?.customerPlate
                            ?.postalAddress
                        }
                      />
                      <AtListItem
                        title="合作账期"
                        note={
                          treatedData[current].value?.customerPlate
                            ?.cooperationPaymentName
                        }
                      />
                      <AtListItem
                        title="优势或独代媒体签框架数量"
                        note={
                          treatedData[current].value?.customerPlate
                            ?.cooperationPaymentName
                        }
                      />
                      <AtListItem
                        title="公司可把控的高层关系"
                        note={
                          treatedData[current].value?.customerPlate
                            ?.leadershipRelationshipName
                        }
                      />
                      <AtListItem
                        title="总经理客户评分"
                        note={
                          treatedData[current]?.customerPlate?.managerScoreName
                        }
                      />
                      <AtListItem
                        title="以往付款态度"
                        note={
                          treatedData[current].value?.customerPlate
                            ?.paymentAttitudeName
                        }
                      />
                      <AtListItem
                        title="预计年投放量"
                        note={
                          treatedData[current].value?.customerPlate
                            ?.predictLaunchName
                        }
                      />
                      <AtListItem
                        title="客户说明"
                        note={
                          treatedData[current].value?.customerPlate
                            ?.predictLaunchName
                        }
                      />
                    </AtList>
                  )}
                </AtTabsPane>
              );
              break;
            case "联系人":
              return (
                <AtTabsPane current={index} index={index}>
                  {current === index && (
                    <AtList>
                      <AtListItem
                        title="联系人"
                        note={treatedData[current].value?.name}
                      />
                      <AtListItem
                        title="电话"
                        note={treatedData[current].value?.phone}
                      />
                      <AtListItem
                        title="电子邮箱"
                        note={treatedData[current].value?.email}
                      />
                      <AtListItem
                        title="微信号"
                        note={treatedData[current].value?.wxNumber}
                      />
                      <AtListItem
                        title="授权证明"
                        note={
                          <ImageBox
                            imgs={treatedData[current].value?.authUrls?.split(
                              ","
                            )}
                          />
                        }
                      />
                      <AtListItem
                        title="证明有效期"
                        note={
                          treatedData[current].value?.startTime &&
                          treatedData[current].value?.endTime
                            ? `${treatedData[current].value?.startTime}-${treatedData[current].value?.endTime}`
                            : ""
                        }
                      />
                    </AtList>
                  )}
                </AtTabsPane>
              );
              break;
            case "负责人":
              return (
                <AtTabsPane current={index} index={index}>
                  {current === index && (
                    <AtList>
                      <AtListItem
                        title="事业版块"
                        note={treatedData[current].value?.plateCode}
                      />
                      <AtListItem
                        title="负责人"
                        note={treatedData[current].value?.principalUserName}
                      />
                      <AtListItem
                        title="负责人部门"
                        note={
                          treatedData[current].value?.principalOrganizationName
                        }
                      />
                      <AtListItem
                        title="销售"
                        note={treatedData[current].value?.salerUserName}
                      />
                    </AtList>
                  )}
                </AtTabsPane>
              );
              break;
            case "客户授信":
              return (
                <AtTabsPane current={index} index={index}>
                  {current === index && (
                    <AtList>
                      <AtListItem
                        title="客户评分"
                        note={treatedData[current].value?.customerScore}
                      />
                      <AtListItem
                        title="客户评级"
                        note={treatedData[current].value?.customerGrade}
                      />
                      <AtListItem
                        title="授信额度上限"
                        note={treatedData[current].value?.creditLimit
                          ?.toString()
                          ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      />
                      <AtListItem
                        title="共享集团授信"
                        note={
                          treatedData[current].value?.useCustomerCredit
                            ? "是"
                            : "否"
                        }
                      />
                      <AtListItem
                        title="申请授信额度"
                        note={treatedData[current].value?.applyCredit
                          ?.toString()
                          ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      />
                      <AtListItem
                        title="资格认证方式"
                        note={treatedData[current].value?.validationMethodName}
                      />
                      <AtListItem
                        title="担保证明"
                        note={
                          <ImageBox
                            imgs={treatedData[
                              current
                            ].value?.guaranteeProofUrls?.split(",")}
                          />
                        }
                      />
                      <AtListItem
                        title="剩余授信额度"
                        note={treatedData[current].value?.remainCredit
                          ?.toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      />
                    </AtList>
                  )}
                </AtTabsPane>
              );
              break;
            case "客户账期":
              return (
                <AtTabsPane current={index} index={index}>
                  {current === index &&
                    treatedData[current].value?.map(x => {
                      return (
                        <View key={x.id} className={styles.item}>
                          <Text>媒体:{x.mediaName}</Text>
                          <Text>媒体版块:{x.mediaSectionName}</Text>
                          <Text>业务类型:{x.businessTypeName}</Text>
                          <Text>客户账期:{x.customerPaymentValue}</Text>
                          <Text>缓冲账期:{x.bufferPaymentValue}</Text>
                          <Text>
                            有效期:{x.startDate} - {x.endDate}
                          </Text>
                        </View>
                      );
                    })}
                </AtTabsPane>
              );
              break;
            case "客户政策":
              return (
                <AtTabsPane current={index} index={index}>
                  {current === index &&
                    treatedData[current].value?.map(x => {
                      return (
                        <View key={x.id} className={styles.item}>
                          <Text>媒体:{x.mediaName}</Text>
                          <Text>运营方式:{x.operationName}</Text>
                          <Text>政策标签:{x.policyLableName}</Text>
                          <Text>返点:{`${x.rebate * 100}%`}</Text>
                          <Text>有效开始日期:{x.startDate}</Text>
                          <Text>有效结束日期:{x.endDate}</Text>
                          <Text>创建时间:{x.createdTime}</Text>
                        </View>
                      );
                    })}
                </AtTabsPane>
              );
              break;
            case "风控确认":
              return (
                <AtTabsPane current={index} index={index}>
                  {current === index && (
                    <AtList>
                      <AtListItem
                        title="资金来源"
                        note={treatedData[current].value?.capitalSourceName}
                      />
                      <AtListItem
                        title="公司注册资本（实缴）"
                        note={treatedData[current].value?.registeredCapitalName
                          ?.toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      />
                      <AtListItem
                        title="公司组织形式"
                        note={treatedData[current].value?.organizationFormsName}
                      />
                      <AtListItem
                        title="客户集团核实结果"
                        note={
                          treatedData[current].value?.customerCapitalOpinion
                        }
                      />
                      <AtListItem
                        title="和我公司有过纠纷和诉讼"
                        note={treatedData[current].value?.legalDisputeName}
                      />
                      <AtListItem
                        title="是否有外部高风险诉讼"
                        note={treatedData[current].value?.highRiskName}
                      />
                      <AtListItem
                        title="集团信息确认说明"
                        note={
                          treatedData[current].value?.customerInfoConfirmOpinion
                        }
                      />
                      <AtListItem
                        title="审批意见"
                        note={treatedData[current].value?.approvalOpinion}
                      />
                    </AtList>
                  )}
                </AtTabsPane>
              );
              break;
            case "内控复核":
              return (
                <AtTabsPane current={index} index={index}>
                  {current === index && (
                    <AtList>
                      <AtTag type="primary">系统数据</AtTag>
                      <AtListItem
                        title="客户总授信金额"
                        note={treatedData[
                          current
                        ]?.value?.customerCreditAmountSystem
                          ?.toString()
                          ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      />
                      <AtListItem
                        title="已下单金额"
                        note={treatedData[current]?.value?.orderAmountSystem
                          ?.toString()
                          ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      />
                      <AtListItem
                        title="应收金额"
                        note={treatedData[
                          current
                        ]?.value?.receivableAmountSystem
                          ?.toString()
                          ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      />
                      <AtListItem
                        title="逾期应收金额"
                        note={treatedData[
                          current
                        ]?.value?.outstandingAmountSystem
                          ?.toString()
                          ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      />

                      <AtTag type="primary">内控数据</AtTag>

                      <AtListItem
                        title="客户总授信金额"
                        note={treatedData[current]?.value?.customerCreditAmount
                          ?.toString()
                          ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      />
                      <AtListItem
                        title="已下单金额"
                        note={treatedData[current]?.value?.orderAmount
                          ?.toString()
                          ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      />
                      <AtListItem
                        title="应收金额"
                        note={treatedData[current]?.value?.receivableAmount
                          ?.toString()
                          ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      />
                      <AtListItem
                        title="逾期应收金额"
                        note={treatedData[current]?.value?.outstandingAmount
                          ?.toString()
                          ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      />
                    </AtList>
                  )}
                </AtTabsPane>
              );
              break;

            default:
              break;
          }
        })}
      </AtTabs>
    </View>
  );
};

export default CustomerDetail;
