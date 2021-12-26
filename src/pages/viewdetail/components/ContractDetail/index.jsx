import { useState, useEffect } from "react";
import Taro from "@tarojs/taro";

import { View, Image, Text } from "@tarojs/components";
import { AtTabs, AtTabsPane, AtList, AtListItem, AtTag } from "taro-ui";
import ImageBox from "../../../../components/ImageBox";
import styles from "./index.module.styl";

const tabList = [
  { title: "合同信息" },
  { title: "联系人信息" },
  { title: "盖章信息" },
  { title: "快递信息" },
  { title: "归档信息" }
];

const ContractDetail = props => {
  const { data, code } = props;
  console.log("合同", data);
  const [current, setCurrent] = useState(0);

  const temp =
    data?.contractMain?.contractCategoryCode === "hetongzhongleimeiti"
      ? data?.contractMedium
      : data?.contractCustomer; // 联系人详情（动态）

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
                title="合同名称"
                note={data?.contractDetail?.contractMain?.contractName}
              />
              <AtListItem
                title="服务主体"
                note={data.contractDetail?.contractMain?.serviceUnitName}
              />
              <AtListItem
                title="合同种类"
                note={
                  data?.contractDetail?.contractMain?.contractCategoryCode ===
                  "hetongzhongleimeiti"
                    ? "媒体"
                    : "客户"
                }
              />
              <AtListItem title="客户集团" note={temp?.customerName} />
              <AtListItem
                title="合同类型"
                note={data.contractDetail?.contractMain?.contractTypeName}
              />
              {data?.contractDetail?.contractMain?.contractCategoryCode ===
                "hetongzhongleimeiti" && (
                <AtListItem title="媒体名称" note={temp?.mediumName} />
              )}
              <AtListItem
                title="签署主体"
                note={data?.contractDetail?.contractMain?.companyName}
              />
              <AtListItem
                title="签署日期"
                note={data?.contractDetail?.contractMain?.signingDate}
              />
              <AtListItem
                title="合同有效期"
                note={`${data.contractDetail?.contractMain?.contractValidPeriodStart}&nbsp;至&nbsp;
                  ${data.contractDetail?.contractMain?.contractValidPeriodEnd}`}
              />
              <AtListItem
                title="合同文件"
                note={
                  <ImageBox
                    imgs={data?.contractDetail?.contractFileList?.map(
                      _ => _.fileUrl
                    )}
                  />
                }
              />

              <AtListItem
                title="盖章类型"
                note={`${
                  data.contractDetail?.contractSignatureRecordsList
                    ? data.contractDetail?.contractSignatureRecordsList?.map(
                        _ => (
                          <AtTag size="small" key={_.code}>
                            {_.name}{" "}
                          </AtTag>
                        )
                      )
                    : "无需盖章"
                }`}
              />
              <AtListItem
                title="确定金额"
                note={data?.contractDetail?.contractMain?.confirmAmount
                  ?.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              />
              <AtListItem title="联系人" note={temp?.contactName} />
              <AtListItem
                title="关联合同"
                note={`${data.contractDetail?.contractAssociatedList?.map(_ => (
                  <View key={_.associatedContractNo}>
                    {_.associatedContractName}{" "}
                  </View>
                ))}`}
              />
              <AtListItem
                title="创建人"
                note={data?.contractDetail?.contractMain?.createdBy}
              />
              <AtListItem
                title="创建时间"
                note={data?.contractDetail?.contractMain?.createdTime}
              />
            </AtList>
          )}
        </AtTabsPane>
        <AtTabsPane current={current} index={1}>
          {current === 1 && (
            <AtList>
              <AtListItem title="联系人" note={temp?.contactName} />
              <AtListItem title="电话" note={temp?.phone} />
              <AtListItem title="电子邮箱" note={temp?.email} />
              <AtListItem title="微信号/QQ号" note={temp?.wxNumber} />
              <AtListItem title="通信地址" note={temp?.address} />
            </AtList>
          )}
        </AtTabsPane>
        <AtTabsPane current={current} index={2}>
          {current === 2 &&
            data?.contractDetail?.signatureRecordList?.map(_ => {
              return (
                <View key={_.id} className={styles.item}>
                  <Text>操作人:{_.signatureUserName}</Text>
                  <Text>盖章类型:{_.name}</Text>
                  <Text>盖章时间:{_.signatureTime}</Text>
                  <Text>盖章说明:{_.description}</Text>
                </View>
              );
            })}
        </AtTabsPane>
        <AtTabsPane current={current} index={3}>
          {current === 3 &&
            data?.contractDetail?.signatureRecordList?.map(_ => {
              return (
                <View key={_.id} className={styles.item}>
                  <Text>快递公司:{_.courierCompanyName}</Text>
                  <Text>快递单号:{_.courierNumber}</Text>
                  <View>快递单据:{_.courierImageUrl}</View>
                  <ImageBox imgs={_.courierImageUrl?.split(",")} />
                </View>
              );
            })}
        </AtTabsPane>
        <AtTabsPane current={current} index={4}>
          {current === 4 && (
            <AtList>
              <AtListItem
                title="归档人"
                note={data?.contractDetail?.contractMain?.archivedUserName}
              />
              <AtListItem
                title="归档日期"
                note={data?.contractDetail?.contractMain?.archivedTime}
              />
              <AtListItem
                title="归档说明"
                note={data?.contractDetail?.contractMain?.archivedDescription}
              />
              <AtListItem
                title="合同扫描件"
                note={
                  <ImageBox
                    imgs={data?.contractDetail?.contractMain?.scanImage?.split(
                      ","
                    )}
                  />
                }
              />
            </AtList>
          )}
        </AtTabsPane>
      </AtTabs>
    </View>
  );
};

export default ContractDetail;
