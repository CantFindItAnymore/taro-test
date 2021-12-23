import { HTTP } from "../http.js";

class WorkflowModel extends HTTP {
  // 审批 --通用
  approve(data) {
    return this.request({
      url: "/workflow/process/approve",
      post: "POST",
      data
    });
  }
}

export { WorkflowModel };
