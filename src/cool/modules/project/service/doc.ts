import { BaseService, Service, Permission } from "/@/cool";

@Service("project/doc")
class ProjectDocService extends BaseService {
  @Permission("generate")
  async generate(id: number, data: any) {
    return this.request({
      url: `/generate?id=${id}`,
      method: 'POST',
      data
    })
  }

  @Permission("move")
  async move(data: any) {
    return this.request({
      url: `/move`,
      method: 'POST',
      data
    })
  }
}

export default ProjectDocService;
