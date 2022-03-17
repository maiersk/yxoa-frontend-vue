import ProjectDocService from './doc';
import ProjectService from './project';
import ProjectDocTreeService from './doctree';

export default {
  project: {
    doc: new ProjectDocService(),
    project: new ProjectService(),
    doctree: new ProjectDocTreeService(),
  }
};
