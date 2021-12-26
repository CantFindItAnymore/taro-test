import { HTTP } from "../http.js";

class ReviewModel extends HTTP {
  // 获取待办事项列表
  getWaitResolveList(data) {
    return this.request({
      url: "/workflow/workflow/page_tasks",
      // url: "",
      data,
      method: "POST"
    });
  }

  // 获取已办列表
  getResolvedList(data) {
    return this.request({
      url: "/workflow/workflow/page_tasks_done",
      data,
      method: "POST"
    });
  }

  // 获取抄送我列表
  getCCmeList(data) {
    return this.request({
      url: "/workflow/workflow/page_task_cc",
      data,
      method: "POST"
    });
  }

  // 获取已发起列表
  getStartedList(data) {
    return this.request({
      url: "/workflow/workflow/page_task_initiated",
      data,
      method: "POST"
    });
  }

  // 获取审批详情
  getDetail(data) {
    return this.request({
      url: "/workflow/workflow/detail",
      data
    });
  }

  // 获取合同详情
  getContractDetail(data) {
    return this.request({
      url: "/contract/contract/detail_new",
      data
    });
  }
}

export { ReviewModel };
