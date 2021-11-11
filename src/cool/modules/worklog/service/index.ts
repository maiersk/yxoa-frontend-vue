import WorkLogService from "./wlog";
import WorkLogCategoryService from "./category";

export default {
  worklog: {
    wlog: new WorkLogService(),
    category: new WorkLogCategoryService()
  }
}
