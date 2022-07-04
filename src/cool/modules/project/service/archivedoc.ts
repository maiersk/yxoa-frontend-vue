import { BaseService, Service, Permission } from "/@/cool";

@Service("project/archivedoc")
class ProjectArchiveDocService extends BaseService {
  
  @Permission("list")
	list(archiveId: any) {
		return this.request({
			url: '/list',
			method: "POST",
      data: { archiveId }
		});
	}

  @Permission("copy")
	copy(data: any) {
		return this.request({
			url: '/copy',
			method: "POST",
      data
		});
	}
  
  @Permission("order")
	order(data: any) {
		return this.request({
			url: '/order',
			method: "POST",
      data
		});
	}
}

export default ProjectArchiveDocService;
