import ProjectDocService from './doc';
import ProjectDocTreeService from './doctree';
import ProjectDocCategoryService from './doccategory';
import ProjectService from './project';
import ProjectContactService from './contact';
import ProjectContactsService from './contacts';
import ProjectUserService from './users';
import ProjectEquipmentService from './equipment';
import ProjectEquipmentsService from './equipments';
import ProjectArchiveService from './archive';

export default {
  project: {
    doc: new ProjectDocService(),
    doctree: new ProjectDocTreeService(),
    doccategory: new ProjectDocCategoryService(),
    project: new ProjectService(),
    archive: new ProjectArchiveService(),
    contact: new ProjectContactService(),
    contacts: new ProjectContactsService(),
    users: new ProjectUserService(),
    equipment: new ProjectEquipmentService(),
    equipments: new ProjectEquipmentsService(),
  }
};
