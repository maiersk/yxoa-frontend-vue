import { BaseService, Service, Permission } from "/@/cool";

@Service("base/sys/department")
class SysDepartment extends BaseService {
	@Permission("order")
	order(data: any) {
		return this.request({
			url: "/order",
			method: "POST",
			data
		});
	}
}

export default SysDepartment;
