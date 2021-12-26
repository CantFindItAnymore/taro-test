import React, { useState, useEffect } from "react";
import RefreshBox from "../../../../components/RefreshBox";
import ReviewItem from "../../../../components/ReviewItem";
import Empty from "../../../../components/Empty";

import { ReviewModel } from "../../../../../api/models/review";

const Review = new ReviewModel();

function WaitResolve() {
  const [waitResolveList, setWaitResolveList] = useState([]); // 待办事项

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    _getWaitResolveList();
  };

  // 【api】获取待办事项
  const _getWaitResolveList = () => {
    Review.getWaitResolveList({
      pageNum: 1,
      pageSize: 100
    }).then(res => {
      setWaitResolveList(res.list);
    });
  };

  return (
    <RefreshBox height="calc(100vh - 230rpx)">
      {waitResolveList?.map(item => (
        <ReviewItem item={item} key={item.taskId} />
      )) || <Empty title="暂无待办事项数据" />}
    </RefreshBox>
  );
}

export default WaitResolve;
