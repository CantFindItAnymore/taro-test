import React, { useState, useEffect } from "react";
import RefreshBox from "../../../../components/RefreshBox";
import ReviewItem from "../../../../components/ReviewItem";
import Empty from "../../../../components/Empty";

import { ReviewModel } from "../../../../../api/models/review";

const Review = new ReviewModel();

function Resolved() {
  const [resolvedList, setResolvedList] = useState([]); // 已办
  useEffect(() => {
    init();
  }, []);

  const init = () => {
    _getResolvedList();
  };

  // 【api】获取已办
  const _getResolvedList = () => {
    Review.getResolvedList({
      endTime: "",
      eventNumber: "",
      pageNum: 1,
      pageSize: 10,
      processDefinitionKey: "",
      startTime: "",
      state: ""
    }).then(res => {
      setResolvedList(res.list);
    });
  };

  return (
    <RefreshBox height="calc(100vh - 230rpx)">
      {resolvedList?.map(item => (
        <ReviewItem item={item} key={item.taskId} showTag />
      )) || <Empty title="暂无已办数据" />}
    </RefreshBox>
  );
}

export default Resolved;
