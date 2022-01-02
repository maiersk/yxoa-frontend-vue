import InputTabComp from './InputTabComp'
import SelectTabComp from './SelectTabComp'
import ListTabComp from './ListTabComp'

interface ComponentsIndex {
  [index: string]: any
}

const components: ComponentsIndex = {
  input: InputTabComp,
  select: SelectTabComp,
  list: ListTabComp
  // title: TitleTabComp
}

export default components
