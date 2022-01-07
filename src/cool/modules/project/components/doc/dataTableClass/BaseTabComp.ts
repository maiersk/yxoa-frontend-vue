import { ElInput } from 'element-plus';
import { h } from 'vue';

export declare interface TabCompOption {
  tag: Object
  type: string
  value: string
  rules: Array<any>
  option: any
  child: Array<any>
  props: object
  source: string
}

export default class BaseTabComp {
  h: any
  name: string
  tag: Object
  type: string
  value: string
  rules: Array<any>
  option: any
  child: Array<any>

  constructor(name: string, options: TabCompOption) {
    this.h = h
    this.name = name
    this.tag = options?.tag ?? ElInput
    this.type = options?.type ?? 'string'
    this.value = options?.value ?? ''
    this.rules = options?.rules ?? []
    this.option = options.option ?? {}
    this.child = options?.child ?? []
  }

  props(other: Array<any>) {
    this.option.props = {
      ...this.option.props,
      ...other
    }
  }

  combinationOption() {
    this.option = {
      ...this.option,
      native: true,
      on: {
        input: (event: any) => {
          const value = event && event.target ? event.target.value : event
          // this.emitter.emit('input', value)
        }
      }
    }
  }

  handleRules() {

  }

  create() {
    this.combinationOption()
    return this.h(this.tag, this.option, this.child)
  }
}
