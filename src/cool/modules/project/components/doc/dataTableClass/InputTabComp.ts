import BaseTabComp, { TabCompOption } from './BaseTabComp'

export default class InputTabComp extends BaseTabComp {
  constructor(name: string, options: TabCompOption) {
    super(name, options)
    this.tag = 'el-input'
  }
}
