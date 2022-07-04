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

export function changeNumToHan(num: number) {
  var arr1: Array<string> = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  var arr2 = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万', '十', '百', '千', '亿']
  if (!num || isNaN(num)) return '零'
  var english = num.toString().split('')
  var result = ''
  for (var i = 0; i < english.length; i++) {
    var des_i = english.length - 1 - i// 倒序排列设值
    result = arr2[i] + result
    var arr1_index: any = english[des_i]
    result = arr1[arr1_index] + result
  }
  result = result.replace(/零(千|百|十)/g, '零').replace(/十零/g, '十') // 将【零千、零百】换成【零】 【十零】换成【十】
  result = result.replace(/零+/g, '零') // 合并中间多个零为一个零
  result = result.replace(/零亿/g, '亿').replace(/零万/g, '万') // 将【零亿】换成【亿】【零万】换成【万】
  result = result.replace(/亿万/g, '亿') // 将【亿万】换成【亿】
  result = result.replace(/零+$/, '') // 移除末尾的零
  // 将【一十】换成【十】
  result = result.replace(/^一十/g, '十')
  return result
}
