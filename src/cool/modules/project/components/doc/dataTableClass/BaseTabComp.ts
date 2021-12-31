import { h } from 'vue';
import EventEmitter from 'events'

export declare interface TabCompOption {
  tag: string
  type: string
  value: string
  rules: Array<any>
  option: any
  child: Array<any>
  props: object
  source: string
}

export default class BaseTabComp extends EventEmitter {
  h: any
  name: string
  tag: string
  type: string
  value: string
  rules: Array<any>
  option: any
  child: Array<any>

  constructor(name: string, options: TabCompOption) {
    super()

    this.h = h
    this.name = name
    this.tag = options?.tag ?? 'input '
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
          this.emit('input', value)
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
