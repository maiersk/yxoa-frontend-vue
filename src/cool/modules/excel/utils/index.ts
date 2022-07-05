import { decode, encode } from "js-base64";
import { export_json_to_excel } from "./export2excel";

function currentDate() {
	const d: Date = new Date();

	return {
		year: d.getFullYear(),
		month: d.getMonth() + 1,
		day: d.getDate(),
		hour: d.getHours(),
		minu: d.getMinutes(),
		sec: d.getSeconds()
	};
}

const mixin: any = {
	a: 'E02', e: 'I23', i: 'M03', m: 'Q08', q: 'U09', u: 'Y10', y: 'B11',
	b: 'F01', f: 'J24', j: 'N05', n: 'R12', r: 'V13', v: 'Z14', z: 'C15',
	c: 'G04', g: 'K25', k: 'O07', o: 'S16', s: 'W17', w: 'D18', '=': '#',
	d: 'H06', h: 'L26', l: 'P19', p: 'T20', t: 'X21', x: 'A22', '+': '$'
}

export function customEncode(str: string) {
	let code = encode(str);
	Object.keys(mixin).forEach((key) => {
		if (code.indexOf(key) !== -1) {
			// code = code.replace(new RegExp(key, "g"), mixin[key]);
			code = code.split(key).join(mixin[key]);
		}
	})
	return code;
}

export function customDecode(code: string) {
	let res = code;
	Object.keys(mixin).forEach(k => {
		if (code.indexOf(mixin[k]) !== -1) {
			// res = res.replace(new RegExp(mixin[k]), k);
			res = res.split(mixin[k]).join(k)
		}
	})
	return decode(res);
}

export { export_json_to_excel, currentDate };
