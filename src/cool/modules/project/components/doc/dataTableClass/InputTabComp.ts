import BaseTabComp, { TabCompOption } from './BaseTabComp'
import { ElInput } from 'element-plus'

export default class InputTabComp extends BaseTabComp {
  constructor(name: string, options: TabCompOption) {
    super(name, options)
    this.tag = ElInput
  }
}
