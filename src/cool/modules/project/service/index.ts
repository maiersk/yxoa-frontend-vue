import ProjectDocService from './doc';
import ProjectService from './project';

export default {
  project: {
    doc: new ProjectDocService(),
    project: new ProjectService()
  }
};
