import { BaseService, Permission, Service } from "/@/core";

@Service("worklog/category")
class WorkLogCategoryService extends BaseService {
  @Permission('wlogcategory')
  wlogs(data: any) {
    return this.request({
      url: '/categorywlogs',
      method: 'GET'
    })
  }
}

export default WorkLogCategoryService;
