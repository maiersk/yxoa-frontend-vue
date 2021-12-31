import request from "/@/service/request";
import BaseTabComp, { TabCompOption } from './BaseTabComp'

export default class SelectTabComp extends BaseTabComp {
  source: string
  datalist: Array<any>

  constructor(name: string, options: TabCompOption) {
    super(name, options)
    this.tag = 'el-select'
    this.source = options?.source ?? '/'
    this.datalist = []
  }

  async getData() {
    const res = await request({
      url: this.source,
      method: 'get'
    })

    if (res?.data ?? undefined) {
      console.log(res.data)
      this.datalist = res.data
    }
    return Promise.resolve()
  }

  create() {
    this.combinationOption()

    return this.h(this.tag, {
      ...this.option
    }, [
      this.datalist.map((item) => {
        return this.h('el-option', {
          props: {
            label: item.name,
            value: item.id
          }
        })
      })
    ])
  }
}
