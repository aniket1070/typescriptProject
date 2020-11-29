import { Component } from './base-component';
import * as Validation from '../util/validation';
import { autoBind } from '../decorator/decorator';
import { projectState } from '../state/project-status';


//   <reference path="./base-component.ts" />
//   <reference path="../decorator/decorator.ts" />
//   <reference path="../util/validation.ts" />
//   <reference path="../state/project-status.ts" />

// namespace App{
    export class ProjectInput extends Component<HTMLDivElement,HTMLFormElement>{
        // template HTMLFormElement;
        titleInputElement: HTMLInputElement;
        descriptionInputElement: HTMLInputElement;
        peopleInputElement: HTMLInputElement; 
    
        constructor(){
            super('project-input','app',true,'user-input');
            this.titleInputElement = this.element.querySelector('#title')as HTMLInputElement;
            this.descriptionInputElement = this.element.querySelector('#description')as HTMLInputElement;
            this.peopleInputElement = this.element.querySelector('#people')as HTMLInputElement;
    
            // this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
            // this.hostElement = document.getElementById('app')! as HTMLDivElement;
            // const importedNode = document.importNode(this.templateElement.content, true);
            // this.element = importedNode.firstElementChild as HTMLFormElement;
            // this.element.id = 'user-input';
            this.configure();
            // this.attach();
        }
        configure() {
            this.element.addEventListener("submit", this.submitHandler);    
        }
        renderContent(){}
        private gatherUserInput(): [string, string, number] | void{
            const enteredTitle = this.titleInputElement.value;
            const enteredDescription = this.descriptionInputElement.value;
            const enteredPeople = this.peopleInputElement.value;
            const titleValidatable: Validation.Validatable = {
                value: enteredTitle,
                required: true,
            };
            const descriptionValidatable: Validation.Validatable = {
                value: enteredDescription,
                minLength: 5,
                required: true,
            };
            const peopleValidatable: Validation.Validatable = {
                value: +enteredPeople,
                required: true,
                min:1,
                max: 5,
            };
            
            if (
                Validation.validate(titleValidatable) && 
                Validation.validate(descriptionValidatable) &&
                Validation.validate(peopleValidatable)) {
                // enteredTitle.trim().length === 0 || enteredDescription.trim().length===0|| enteredPeople.trim().length===0){
            alert('Invalid Input, Please try after some Time'); 
            return ;           
            } else {
                return [enteredTitle, enteredDescription, +enteredPeople];
            }
        }
    
        private clearInput() {
            this.titleInputElement.value ='';
            this.descriptionInputElement.value = '';
            this.peopleInputElement.value = ''
        }
        @autoBind
        private submitHandler(event:Event){
            event.preventDefault();
            console.log(this.titleInputElement.value);
            const userInput =  this.gatherUserInput();
            if(Array.isArray(userInput)){
                const [title, desc, people] = userInput;
                console.log(title, desc, people);
                projectState.addProject(title,desc,people);
                this.clearInput();
            }
        }
    
        
        // private attach() {
        //     this.hostElement.insertAdjacentElement('afterbegin', this.element);
        // }
    }
// } 