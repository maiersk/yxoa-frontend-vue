import { BaseService, Service, Permission } from "/@/cool";

@Service("project/project")
class ProjectService extends BaseService {
  @Permission("adduser")
  addUser(data: any) {
    return this.request({
      url: "/adduser",
      method: "POST",
      data
    })
  }

  @Permission("deluser")
  delUser(data: any) {
    return this.request({
      url: "/deluser",
      method: "POST",
      data
    })
  }

  @Permission("getbyuser")
  getByUser(userId: number) {
    return this.request({
      url: `/adduser?userId=${userId}`,
      method: "GET"
    })
  }

  @Permission("getusers")
  getUsers(projectId: number) {
    return this.request({
      url: `/addusers?projectId=${projectId}`,
      method: "GET"
    })
  }
}

export default ProjectService;
