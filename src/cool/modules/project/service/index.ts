import ProjectDocService from './doc';
import ProjectService from './project';
import ProjectDocTreeService from './doctree';
import ProjectContactService from './contacts';
import ProjectUserService from './prjuser';
import ProjectEquipmentService from './equipment';
import ProjectEquipmentListService from './equipments';

export default {
  project: {
    doc: new ProjectDocService(),
    project: new ProjectService(),
    doctree: new ProjectDocTreeService(),
    contacts: new ProjectContactService(),
    prjuser: new ProjectUserService(),
    equipment: new ProjectEquipmentService(),
    equipments: new ProjectEquipmentListService(),
  }
};
