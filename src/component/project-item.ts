import { Draggable } from '../model/drag-drop-interface';
import { Component } from '../component/base-component';
import { Project } from '../model/project-model';
import { autoBind } from '../decorator/decorator';
//   <reference path="./base-component.ts" />
//   <reference path="../decorator/decorator.ts" />
//   <reference path="../model/drag-drop-nterface.ts" />
//   <reference path="../model/project-model.ts" />
//   <reference path="../state/project-status.ts" />
//   <reference path="./base-component.ts" />
//   <reference path="../decorator/decorator.ts" />
//   <reference path="../model/drag-drop-interface.ts" />
//   <reference path="../model/project-model.ts" />

    export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable{
        private project: Project;
        get persons() {
            if(this.project.people===1){
                return '1 person';
            } else{
                return `${this.project.people} persons`
            }
    
        }
        constructor(hostId: string, project: Project){
            super('single-project',hostId,false,project.id);
            this.project = project;    
            this.configure();
            this.renderContent(); 
        }
        @autoBind
        dragStartHandler(event: DragEvent){
            event.dataTransfer!.setData('text/plain',this.project.id);
            event.dataTransfer!.effectAllowed= 'move';
        }
        dragEndHandler(_: DragEvent){
            console.log('dragEnd')
        }
        configure(){
            this.element.addEventListener('dragstart', this.dragStartHandler);
            this.element.addEventListener('dragend', this.dragEndHandler);
        }
        renderContent(){
            this.element.querySelector('h2')!.textContent =  this.project.title;
            this.element.querySelector('h3')!.textContent =  this.persons + ' assigned';
            this.element.querySelector('p')!.textContent = this.project.description;
        }
    }
