import { BaseService, Service, Permission } from "/@/cool";

@Service("project/doctree")
class ProjectDocTreeService extends BaseService {

  @Permission("prjdoclist")
	prjdoclist(tableName: any) {
    console.log(tableName)
		return this.request({
			url: '/prjdoclist',
			method: "POST",
      data: { tableName }
		});
	}

  @Permission("prjdocinfo")
	prjdocinfo({tableName, id}: any) {
		return this.request({
			url: '/prjdocinfo',
			method: "POST",
      data: { tableName, id }
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
