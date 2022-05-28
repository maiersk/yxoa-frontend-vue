import { BaseService, Service, Permission } from "/@/cool";

@Service("project/doctree")
class ProjectDocTreeService extends BaseService {

  @Permission("copy")
	copy(data: any) {
		return this.request({
			url: '/copy',
			method: "POST",
      data
		});
	}

  @Permission("prjdoclist")
	prjdoclist(projectId: any) {
		return this.request({
			url: '/prjdoclist',
			method: "POST",
      data: { projectId }
		});
	}

  @Permission("prjdocinfo")
	prjdocinfo({projectId, id}: any) {
		return this.request({
			url: '/prjdocinfo',
			method: "POST",
      data: { projectId, id }
		});
	}

  @Permission("prjdocadd")
	prjdocadd(data: any) {
		return this.request({
			url: "/prjdocadd",
			method: "POST",
			data
		});
	}
  
  @Permission("prjdoccopy")
	prjdoccopy(data: any) {
		return this.request({
			url: "/prjdoccopy",
			method: "POST",
			data
		});
	}
  
  @Permission("prjdocupdate")
  prjdocupdate(data: any) {
    return this.request({
      url: "/prjdocupdate",
      method: "POST",
      data
    });
  }

  @Permission("prjdocdelete")
	prjdocdelete(data: any) {
		return this.request({
			url: "/prjdocdelete",
			method: "POST",
			data
		});
	}

  @Permission("prjdocorder")
	prjdocorder(data: any) {
		return this.request({
			url: "/prjdocorder",
			method: "POST",
			data
		});
	}
}

export default ProjectDocTreeService;
