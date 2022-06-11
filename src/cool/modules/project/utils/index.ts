export function orderBy(list: Array<any>, key: any) {
	return list.sort((a, b) => a[key] - b[key]);
}

export function deepTree(list: Array<any>) {
	const newList: Array<any> = [];
	const map: any = {};

	list.forEach((e) => (map[e.id] = e));

	list.forEach((e) => {
		const parent = map[e.parentId];

		if (parent) {
			(parent.children || (parent.children = [])).push(e);
		} else {
			newList.push(e);
		}
	});

	const fn = (list: Array<any>) => {
		list.map((e) => {
			if (e.children instanceof Array) {
				e.children = orderBy(e.children, "orderNum");

				fn(e.children);
			}
		});
	};

	fn(newList);

	const orderStr = (list: Array<any>, p_level="") => {
		let p_num: number = 0;
		list.map((node, i) => {
			(async () => {
				p_num++;
				node.orderName = `${p_level}${p_num}、${node.name}`;
				
				if (node.children) {
					let child_num = 0;
					node.children.map((child: any) => {
						(async () => {
							child_num++;
							child.orderName = `${p_num}.${child_num}、${child.name}`;

							if (child.children) {
								p_level = `${p_num}.${child_num}.`;
								orderStr(child.children, p_level);
							} else {
								p_level = "";
							}
						})();
					})
				}
			})();
		})
	}

	orderStr(newList);

	return orderBy(newList, "orderNum");
}