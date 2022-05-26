import SelectUser from './selectUser.vue';
import SelectDoc from './selectDoc.vue';
import SelectTree from './selectTree.vue';
import SelectProject from './selectProject.vue';
import SelectEquipment from './selectEquipment.vue';
import SelectDocTree from './selectDocTree.vue';
import SelectDocCategory from './selectDocCategory.vue';
import SelectContact from './selectContact.vue';

import dataComp from './doc/dataForm/dataComp/';

import BuildDoc from './doc/buildDoc.vue';
import SearchKey from './search-key';

import YxTable from './yxtable/';
import YxLink from './yxlink/index.vue';

export default {
  SelectUser,
  SelectDoc,
  SelectTree,
  SelectProject,
  SelectEquipment,
  SelectDocTree,
  SelectDocCategory,
  SelectContact,

  BuildDoc,
  SearchKey,

  YxTable,
  YxLink,

  ...dataComp
};
