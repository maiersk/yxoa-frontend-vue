import { BaseService, Service, Permission } from "/@/cool";

@Service("base/sys/user")
class SysUser extends BaseService {
	@Permission("move")
	move(data: any) {
		return this.request({
			url: "/move",
			method: "POST",
			data
		});
	}
}

export default SysUser;
