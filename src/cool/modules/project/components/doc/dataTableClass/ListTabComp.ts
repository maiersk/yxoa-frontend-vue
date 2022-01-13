import BaseTabComp from './BaseTabComp'

export default class ListTabComp extends BaseTabComp {
  create() {
    return this.h(this.tag, this.option, {
      default() {
        return [
          this.child
        ]
      }
    })
  }
}
