// import { useState } from "react";
import { useState, useEffect } from "react";
import Taro from "@tarojs/taro";

import { View, Text } from "@tarojs/components";
import {
  AtTabs,
  AtTabsPane,
  AtList,
  AtListItem,
  AtForm,
  AtButton,
  AtInput
} from "taro-ui";

import styles from "./index.module.styl";

import { SettingModel } from "../../../api/models/setting";

const Setting = new SettingModel();

const tabList = [{ title: "基本信息" }, { title: "修改密码" }];

const Index = () => {
  const [current, setCurrent] = useState(0);

  // const [userInfo, setUserInfo] = useState({});
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");

  // useEffect(() => {
  //   Setting.getUserInfo().then(res => {
  //     setUserInfo(res);
  //   });
  // }, []);

  // 编辑密码
  const handleEditPass = () => {
    if (_check()) {
      Setting.editPass({
        oldPassword: oldPass,
        newPassword: newPass
      }).then(() => {
        _showSomeThing("修改密码成功");
        setOldPass("");
        setNewPass("");
        setConfirmNewPass("");
      });
    }
  };

  // 检查参数
  const _check = () => {
    if (!oldPass) {
      _showSomeThing("请补全表单");
      return false;
    }
    if (!newPass) {
      _showSomeThing("请补全表单");
      return false;
    }
    if (!confirmNewPass) {
      _showSomeThing("请补全表单");
      return false;
    }
    if (newPass !== confirmNewPass) {
      _showSomeThing("密码和确认新密码不一致");
      return false;
    }
    return true;
  };

  const _showSomeThing = content => {
    Taro.showToast({
      title: content,
      icon: "none",
      duration: 2000
    });
  };

  return (
    <View className={styles.container}>
      <AtTabs
        current={current}
        tabList={tabList}
        onClick={e => {
          setCurrent(e);
        }}
      >
        <AtTabsPane current={current} index={0}>
          <View className={styles.tab}>
            {Taro.getStorageSync("userInfo")?.user?.id && (
              <AtList>
                <AtListItem
                  title="账户"
                  extraText={Taro.getStorageSync("userInfo")?.user?.username}
                />
                <AtListItem
                  title="姓名"
                  extraText={Taro.getStorageSync("userInfo")?.user?.name}
                />
                <AtListItem
                  title="角色"
                  extraText={Taro.getStorageSync("userInfo")?.roles[0]?.name}
                />
                <AtListItem
                  title="联系电话"
                  extraText={Taro.getStorageSync("userInfo")?.user?.phone}
                />
              </AtList>
            )}
          </View>
        </AtTabsPane>
        <AtTabsPane current={current} index={1}>
          <View className={styles.tab}>
            <AtForm>
              <AtInput
                name="oldPass"
                title="旧密码"
                type="password"
                value={oldPass}
                onChange={e => {
                  setOldPass(e);
                }}
              />
              <AtInput
                name="newPass"
                title="新密码"
                type="password"
                value={newPass}
                onChange={e => {
                  setNewPass(e);
                }}
              />
              <AtInput
                name="confirmNewPass"
                title="确认新密码"
                type="password"
                value={confirmNewPass}
                onChange={e => {
                  setConfirmNewPass(e);
                }}
              />
              <AtButton
                type="primary"
                formType="submit"
                style={{ marginTop: "200rpx" }}
                onClick={handleEditPass}
              >
                提交
              </AtButton>
            </AtForm>
          </View>
        </AtTabsPane>
      </AtTabs>
    </View>
  );
};

export default Index;
