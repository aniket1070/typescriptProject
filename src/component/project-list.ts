import { DragTarget } from '../model/drag-drop-interface';
import { Component } from '../component/base-component';
import { Project, ProjectStatus } from '../model/project-model';
import { autoBind } from '../decorator/decorator';
import { projectState } from '../state/project-status';
import { ProjectItem } from '../component/project-item';

//   <reference path="./base-component.ts" />
//   <reference path="../decorator/decorator.ts" />
//   <reference path="../model/drag-drop-nterface.ts" />
//   <reference path="../model/project-model.ts" />
//   <reference path="../state/project-status.ts" />
 
// namespace App {
    export class ProjectList extends Component<HTMLDivElement,HTMLElement> implements DragTarget{
        //  // hostElement: HTMLDivElement;
        assignProject:Project[];
        // element: HTMLElement; 
        constructor(private type: 'active' | 'finished') {
            super('project-list','app', false,`${type}-projects`);
            // this.templateElement = document.getElementById('project-list')! as HTMLTemplateElement;
            // this.hostElement = document.getElementById('app')! as HTMLDivElement;
            this.assignProject =[];
            // const importedNode = document.importNode(this.templateElement.content, true);
            // this.element = importedNode.firstElementChild as HTMLElement;
            // this.element.id = `${this.type}-projects`;
            
            // this.attach();
            this.configure()
            this.renderContent();
        }
        @autoBind
        dragOverHandler(event: DragEvent){
            if(event.dataTransfer && event.dataTransfer.types[0]==='text/plain'){
                event.preventDefault();
                const listEl =this.element.querySelector('ul')!;
                listEl.classList.add('droppable');
            }
    
        }
        @autoBind
        dropHandler(event: DragEvent){
            const prjId = (event.dataTransfer!.getData('text/plain'));
            projectState.moveProject(prjId, this.type === 'active' ? ProjectStatus.Active: ProjectStatus.Finished);
        }
        @autoBind
        dragLeaveHandler(_: DragEvent){
            const listEl = this.element.querySelector('ul')!;
            listEl.classList.remove('droppable')
        }
        configure(){
            this.element.addEventListener('dragover',this.dragOverHandler);
            this.element.addEventListener('dragleave',this.dragLeaveHandler);
            this.element.addEventListener('drop',this.dropHandler);        
            projectState.addInstance((projects: Project[])=> {
                const relevantProjects = projects.filter(prj=> {
                    if(this.type === 'active'){
                      return prj.status === ProjectStatus.Active;
                    }
                    return prj.status === ProjectStatus.Finished;
                });
                this.assignProject = relevantProjects ; 
                this.renderProjects();
            });
         }
        renderContent(){
            const listId = `${this.type}-project-list`;
            this.element.querySelector('ul')!.id =listId;
            this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + 'PROJECTS';
        }
        private renderProjects(){
            const listEl = document.getElementById(`${this.type}-project-list`)! as HTMLUListElement;
            listEl.innerHTML ='';
            for (const pjtItem of this.assignProject){
                new ProjectItem(this.element.querySelector('ul')!.id,pjtItem);
                // const listItem =  document.createElement('li');
                // listItem.textContent = pjtItem.title;
                // listEl.appendChild(listItem);
            }
        }
    
        // private attach(){
        //     this.hostElement.insertAdjacentElement('beforeend', this.element);
    
        // }
    }
// }