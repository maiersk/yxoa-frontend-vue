import ProjectDocService from './doc';
import ProjectService from './project';
import ProjectDocTreeService from './docTree';

export default {
  project: {
    doc: new ProjectDocService(),
    project: new ProjectService(),
    docTree: new ProjectDocTreeService()
  }
};
