import { ElInput } from 'element-plus';
import { h } from 'vue';
import mitt from 'mitt';

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
  emitter: any

  constructor(name: string, options: TabCompOption) {
    this.h = h
    this.name = name
    this.tag = options?.tag ?? ElInput
    this.type = options?.type ?? 'string'
    this.value = options?.value ?? ''
    this.rules = options?.rules ?? []
    this.option = options.option ?? {}
    this.child = options?.child ?? []
    this.emitter = mitt()
  }

  combinationOption(other: Object) {
    this.option = {
      ...this.option,
      ...other,
      native: true,
      oninput: (event: any) => {
        const value = event && event.target ? event.target.value : event
        console.log('emit', value)
        this.emitter.emit('input', value)
      }
    }
  }

  on(tag: string, func: Function) {
    this.emitter.on(tag, func)
  }

  handleRules() {

  }

  create(option: Object) {
    this.combinationOption(option)
    return this.h(this.tag, this.option, {
      default() {
        return [this.child]
      }
    })
  }
}
