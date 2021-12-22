import { HTTP } from "../http.js";

class HomeModel extends HTTP {
  // 获取数量
  getCount() {
    return this.request({
      url: "/workflow/workflow/task/statistical",
      method: "POST"
    });
  }

  // 获取待办列表
  getList(data) {
    return this.request({
      url: "/workflow/workflow/page_tasks",
      method: "POST",
      data
    });
  }
}

export { HomeModel };
