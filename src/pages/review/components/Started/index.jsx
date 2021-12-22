import React, { useState, useEffect } from "react";
import RefreshBox from "../../../../components/RefreshBox";
import ReviewItem from "../../../../components/ReviewItem";
import Empty from "../../../../components/Empty";

import { ReviewModel } from "../../../../../api/models/review";

const Review = new ReviewModel();

function Started() {
  const [startedList, setStartedList] = useState([]); // 已发起

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    _getStartedList();
  };

  // 【api】获取已发起
  const _getStartedList = () => {
    Review.getStartedList({
      endTime: "",
      eventNumber: "",
      pageNum: 1,
      pageSize: 10,
      processDefinitionKey: "",
      startTime: "",
      state: ""
    }).then(res => {
      setStartedList(res.list);
    });
  };

  return (
    <RefreshBox height="calc(100vh - 230rpx)">
      {startedList?.map(item => (
        <ReviewItem item={item} key={item.taskId} />
      )) || <Empty title="暂无已发起数据" />}
    </RefreshBox>
  );
}

export default Started;
