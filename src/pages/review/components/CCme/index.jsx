import React, { useState, useEffect } from "react";
import RefreshBox from "../../../../components/RefreshBox";
import ReviewItem from "../../../../components/ReviewItem";
import Empty from "../../../../components/Empty";

import { ReviewModel } from "../../../../../api/models/review";

const Review = new ReviewModel();

function CCme() {
  const [CCmeList, setCCmeList] = useState([]); // 抄送我
  useEffect(() => {
    init();
  }, []);

  const init = () => {
    _getCCmeList();
  };

  // 【api】获取抄送我
  const _getCCmeList = () => {
    Review.getCCmeList({
      endTime: "",
      eventNumber: "",
      pageNum: 1,
      pageSize: 500,
      processDefinitionKey: "",
      startTime: "",
      state: ""
    }).then(res => {
      setCCmeList(res.list);
    });
  };

  return (
    <RefreshBox height="calc(100vh - 230rpx)">
      {CCmeList?.map(item => <ReviewItem item={item} key={item.taskId} />) || (
        <Empty title="暂无抄送我数据" />
      )}
    </RefreshBox>
  );
}

export default CCme;
