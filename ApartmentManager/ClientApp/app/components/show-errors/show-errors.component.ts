﻿import { Component, Input } from '@angular/core';
import { AbstractControlDirective, AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

@Component({
    selector: 'show-errors',
    template: `
   <ul *ngIf="shouldShowErrors()" class="validation-errors">
     <li style="color: red">{{getError()}}</li>
   </ul>
 `,
})

export class ShowErrorsComponent {
    private static readonly errorMessages: any = {
        'required': (params: any) => '##FIELD## can\'t be blank',
        'minlength': (params: any) => '##FIELD## should be minimum ' + params.requiredLength + ' characters',
        'maxlength': (params: any) => '##FIELD## should not be greater then ' + params.requiredLength + ' characters',
        'pattern': (params: any) => 'Should be a valid',
        'email': (params: any) => "Should be vaild email.",
    };

    @Input()
    private control: any;/*AbstractControlDirective | AbstractControl;*/
    shouldShowErrors(): boolean {
        return this.control &&
            this.control.errors &&
            (this.control.dirty || this.control.touched);
    }

    listOfErrors(): string[] {
        return Object.keys(this.control.errors)
            .map(field => this.getMessage(field, this.control.errors[field], this.control));
    }

    getError(): string {
        console.log("show", this.control.errors);
        var errors = Object.keys(this.control.errors)
            .map(field => this.getMessage(field, this.control.errors[field], this.control));
        return errors[0];
    }
    msg: any;
    private getMessage(type: string, params: any, control: any) {
        var fname = this.getControlName(control);
        if (fname != null) {
            fname = fname.replace("_", " ").replace(" id", "").toLowerCase();
            fname = fname.replace(/\b\w/g, l => l.toUpperCase())
        }
        this.msg = ShowErrorsComponent.errorMessages[type](params);
        return this.msg.replace("##FIELD##", fname);
    }

    getControlName(c: AbstractControl): string | null {
        const formGroup: any = c.parent.controls;
        return Object.keys(formGroup).find(name => c === formGroup[name]) || null;
    }
}


