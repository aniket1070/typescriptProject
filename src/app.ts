import { ProjectInput } from './component/project-input';
import { ProjectList } from './component/project-list';

//   <reference path="./model/drag-drop-interface.ts" />
//   <reference path="./model/project-model.ts" />
//   <reference path="./state/project-status.ts" />
//   <reference path="./util/validation.ts" />
//   <reference path="./decorator/decorator.ts" />
//   <reference path="./component/base-component.ts" />
//   <reference path="./component/project-item.ts" />
//   <reference path="./component/project-list.ts" />
//   <reference path="./component/project-input.ts" />

// namespace App{    
    // const prjInput = new ProjectInput(); 
    // const activeProjectList =new ProjectList('active');
    // const finishedProjectList = new ProjectList('finished');

    new ProjectInput(); 
    new ProjectList('active');
    new ProjectList('finished');
    console.log('hi')
// }