import { View, Text, Button } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useState, useEffect } from "react";
import {
  AtButton,
  AtDrawer,
  AtModal,
  AtModalHeader,
  AtModalAction,
  AtModalContent,
  AtTextarea
} from "taro-ui";
import WorkFlow from "../WorkFlow";
import styles from "./index.module.styl";

import { WorkflowModel } from "../../../api/models/workflow";

const Workflow = new WorkflowModel();

function ViewDetailWrapper(props) {
  const { detail } = props;

  console.log("wwwwwww-----detail", detail);

  const [treeShow, setTreeShow] = useState(false);
  const [commentShow, setCommentShow] = useState(false);
  const [activeType, setActiveType] = useState("");
  const [comments, setComments] = useState("");

  // 写 审批意见
  const createComments = type => {
    setCommentShow(true);
    setActiveType(type);
  };

  // 抄送 | 撤回 | 拒绝 | 通过
  const operate = () => {
    if (!comments) {
      Taro.showToast({
        title: "请填写审批意见",
        icon: "none",
        duration: 2000
      });
      return;
    }
    switch (activeType) {
      case "back":
        Workflow.approve({
          ccList: [],
          approval: "WITHDRAW",
          approvalComments: "",
          taskId: "",
          templateId: "withdraw",
          templateData: "",
          processInstanceId: detail.processInstanceId ?? ""
        }).then(() => {
          Taro.showToast({
            title: "审批驳回",
            icon: "none",
            duration: 2000
          });
          setTimeout(() => {
            Taro.redirectTo({
              url: "/pages/review/index?type=" + 1
            });
          }, 2000);
        });
        break;
      case "refuse":
        Workflow.approve({
          ccList: [],
          approval: "REJECT",
          approvalComments: comments,
          taskId: detail.todoNode?.taskList[0]?.taskId,
          templateId: "normal",
          templateData: comments,
          processInstanceId: detail.processInstanceId ?? ""
        }).then(() => {
          Taro.showToast({
            title: "审批拒绝",
            icon: "none",
            duration: 2000
          });
          setTimeout(() => {
            Taro.redirectTo({
              url: "/pages/review/index?type=" + 1
            });
          }, 2000);
        });
        break;
      case "pass":
        Workflow.approve({
          ccList: [],
          approval: "PASS",
          approvalComments: comments,
          taskId: detail.todoNode?.taskList[0]?.taskId,
          templateId: "normal",
          templateData: comments,
          processInstanceId: detail.processInstanceId ?? ""
        }).then(() => {
          Taro.showToast({
            title: "审批通过",
            icon: "none",
            duration: 2000
          });
          setTimeout(() => {
            Taro.redirectTo({
              url: "/pages/review/index?type=" + 1
            });
          }, 2000);
        });
        break;

      default:
        break;
    }
  };

  return (
    <View className={styles.container}>
      <View className={styles.header}>
        <View className={styles.workfolwBtn}>
          <AtButton
            type="primary"
            size="small"
            onClick={() => {
              setTreeShow(true);
            }}
          >
            流程
          </AtButton>
        </View>
      </View>
      <View className={styles.content}>{props.children}</View>
      <View className={styles.footer}>
        {detail?.todoNode?.taskList[0]?.templateId === "normal" ? (
          <View className={styles.btn}>
            <AtButton
              size="small"
              onClick={() => {
                // operate("CC");
              }}
            >
              抄送
            </AtButton>
            <AtButton
              size="small"
              onClick={() => {
                createComments("back");
              }}
            >
              撤销
            </AtButton>
            <AtButton
              type="primary"
              size="small"
              onClick={() => {
                createComments("refuse");
              }}
            >
              拒绝
            </AtButton>
            <AtButton
              type="primary"
              size="small"
              onClick={() => {
                createComments("pass");
              }}
            >
              同意
            </AtButton>
          </View>
        ) : (
          <Text>请到PC端操作</Text>
        )}
      </View>
      {/* 审批意见 */}
      {commentShow && (
        <AtModal closeOnClickOverlay={false} isOpened={commentShow}>
          <AtModalHeader>审批意见</AtModalHeader>
          <AtModalContent>
            <AtTextarea
              autoFocus
              value={comments}
              onChange={e => {
                setComments(e);
              }}
              cursorSpacing={180}
              height={200}
            />
          </AtModalContent>
          <AtModalAction>
            <Button
              onClick={() => {
                setCommentShow(false);
              }}
            >
              取消
            </Button>{" "}
            <Button
              onClick={() => {
                operate();
              }}
            >
              确定
            </Button>
          </AtModalAction>
        </AtModal>
      )}
      {/* 流程树 */}
      {treeShow && (
        <AtDrawer
          show={treeShow}
          mask
          right
          width={340}
          onClose={() => {
            setTreeShow(false);
          }}
        >
          <WorkFlow nodeList={detail.nodeList} />
        </AtDrawer>
      )}
    </View>
  );
}

export default ViewDetailWrapper;
