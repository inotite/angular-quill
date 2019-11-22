import { Injectable } from '@angular/core';
import {IElement, IContainer, ISection } from '../models/website.model';
declare global {
    interface Array<T> {
        move(from: number, to: number): Array<T>;
    }
}

declare let $: any
@Injectable()
export class ElementService {
    /** This method will add a css class 'active' to the page element upon click */
    setActive(event: any): any {
        if (event !== null && event !== undefined) {
            event.stopPropagation();
            var element = $(event.target).closest('.evov-element');
            if (element.hasClass('evov-element')) {
                $('.evov-element').removeClass('active');
                element.addClass('active');
                return element;
            }
        }
    }
    /** This method will remove the css class 'active' from the currently active element */
    setUnactive(event: any) {
        event.stopPropagation();
        $('.evov-element').removeClass('active');
    }
    /** Set viewport size: 1=Desktop 2=Tablet 3=Mobile */
    setViewport(display: number) {
        switch (display) {
            case 1:
                $('#viewport', window.parent.document.body).css('width', '100%');
                break;
            case 2:
                $('#viewport', window.parent.document.body).css('width', '1023px');
                break;
            case 3:
                $('#viewport', window.parent.document.body).css('width', '768px');
                break;
        }

    }
    /**This method is used to filter out elements with isDelete = true */
    filterElement<T>(element:T){
        return element['isDelete'] === false;
    }
    /** This method is to sort a list of elements by index*/
    sortElement<T, K extends keyof T>(obj1: T, obj2: T) {
        if (obj1['index'] > obj2['index']) {
            return 1;
        }
        else if (obj1['index'] === obj2['index']) {
            return 0;
        }
        else {
            return -1;
        }
    }
    newElement(type:string, container:IContainer):IContainer{
        var index = container.elements.length + 1;
        switch(type){
            
            case "h2":
            var element:IElement= {id:0,containerId:container.id,content:'Title...',index:index,type:type,isDelete:false, desktopWidth:12, tabletWidth:12,mobileWidth:12, styles:"{}"}
            container.elements.push(element);    
            break;
            case "text":
                var element:IElement = {id:0,containerId:container.id,content:'Text...',index:index,type:type,isDelete:false, desktopWidth:12, tabletWidth:12,mobileWidth:12, styles:"{}"}
                container.elements.push(element);
                break;
            case "image":
                var element:IElement = {id:0,containerId:container.id,content:'https://localhost:44304/images/image_placeholder.svg',index:index,type:type,isDelete:false, desktopWidth:12, tabletWidth:12,mobileWidth:12, styles:"{}"}
                container.elements.push(element);
                break;
                case "appointment":
                var element:IElement = {id:0,containerId:container.id,content:'',index:index,type:type,isDelete:false, desktopWidth:12, tabletWidth:12,mobileWidth:12, styles:"{}"}
                container.elements.push(element);

                break;
        }
        return container;
    }
    newContainer(section:ISection):ISection{
        var index = section.containers.length;
        let newContainer: IContainer = { id: null, 
            sectionId: section.id, 
            index: section.containers.length + 1, 
            isDelete: false, 
            desktopWidth: 12, 
            mobileWidth: 12, 
            tabletWidth: 12, 
            elements:[],styles:null }; 

        section.containers.push(newContainer);

        return section;
    }
    updateStyle(event:any, property:string, styles:string):string{
        var s = JSON.parse(styles);
        if(event === "transparent"){
            delete s[`${property}`];
        }
        else if(!isNaN(event.value)){
            if(event.value == undefined || event.value === null || event.value<1){
                delete s[`${property}`];
            }
            else{
                s[`${property}`] = event.value + 'px';
            }
            
        }
        else{
            s[`${property}`] = event;
        }
        return JSON.stringify(s);
    }
    moveUp<T>(list:T[], element:T, activeElement:any):T[]{

        let result:T[] = list.move(list.indexOf(element), list.indexOf(element) - 1);
        

        for(var i =0; i < result.length;i++){
            result[i]['index'] = i;
        }
        this.setActive(activeElement);
        return result;
    }
    moveDown<T>(list:T[], element:T, activeElement:any):T[]{
        let result:T[] = list.move(list.indexOf(element), list.indexOf(element) + 1);
        for(var i =0; i < result.length;i++){
            result[i]['index'] = i;
        }
        this.setActive(activeElement);
        return result;
    }
}

/** This helper is to reorder page elements */
Array.prototype.move = function (from: number, to: number) {
    this.splice(to, 0, this.splice(from, 1)[0]);
    return this;
}