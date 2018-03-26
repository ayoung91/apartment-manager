import { SimpleChanges, Component } from "@angular/core";

import { Directive, OnInit, ElementRef, HostListener } from "@angular/core";
import { ControlContainer } from "@angular/forms";

@Directive({
    selector: '[phoneMask]'
})
export class PhoneMask implements OnInit {
    private value: any;  //the variable where we save the "true value"
    private element: HTMLInputElement
    constructor(private el: ElementRef, private form: ControlContainer) {
        this.element = el.nativeElement;
    }
    ngOnInit() { //It's necesary use OnInit, otherwise the first time not formtted
        this.value = this.element.value;
        if (this.element.value.length == 10) {
            this.element.value = '(' + this.element.value.substr(0, 3) + ') ' + this.element.value.substr(3, 3) + '-' + this.element.value.substr(6, 4);
        }
    }
    @HostListener('input') onChange() {  //when a change happens save the value in a variable
        this.value = this.element.value;
        this.formatValue();
    }
    @HostListener('blur') onBlur() { //when lost the focus call format function
        this.value = this.element.value;
        this.formatValue();
    }
    @HostListener('focus') onFocus() { //when get the focus recover the true value
        this.value = this.element.value;
        this.formatValue();
    }

    formatValue() { 
        if (this.element.value.length == 3 && !this.element.value.includes('(')) {
            this.element.value = '(' + this.element.value.substr(0, 3) + ') ' + this.element.value.substr(3);
        }
        else if (this.element.value.length == 10 && !this.element.value.includes('-')) {
            this.element.value = '(' + this.element.value.substr(1, 3) + ') ' + this.element.value.substr(6, 3) + '-' + this.element.value.substr(9, 4);
        }
        else {
            this.element.value = this.element.value.substr(0, 14);
        }
    }
}
