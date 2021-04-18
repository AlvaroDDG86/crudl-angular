import { Directive, DoCheck, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCapital]'
})
export class CapitalDirective implements DoCheck {

  constructor(public ngControl: NgControl) {}

  ngDoCheck() {
    if (this.ngControl) {
      const value = this.ngControl.control?.value;
      if (isNaN(value)) {
        this.ngControl.control?.setValue(value.charAt(0).toUpperCase() + value.slice(1))
      }
    }
  }
}
