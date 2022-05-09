import ProjectDocService from './doc';
import ProjectService from './project';
import ProjectDocTreeService from './doctree';
import ProjectContactService from './contact';
import ProjectContactsService from './contacts';
import ProjectUserService from './users';
import ProjectEquipmentService from './equipment';
import ProjectEquipmentsService from './equipments';

export default {
  project: {
    doc: new ProjectDocService(),
    project: new ProjectService(),
    doctree: new ProjectDocTreeService(),
    contact: new ProjectContactService(),
    contacts: new ProjectContactsService(),
    prjuser: new ProjectUserService(),
    equipment: new ProjectEquipmentService(),
    equipments: new ProjectEquipmentsService(),
  }
};
