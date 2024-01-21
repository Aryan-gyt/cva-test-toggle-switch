import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { NgForm, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-toggle-switch',
  templateUrl: './toggle-switch.component.html',
  styleUrl: './toggle-switch.component.css',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ToggleSwitchComponent),
    multi: true
  }]
})

export class ToggleSwitchComponent implements OnInit, ControlValueAccessor {

  @Input() disabled = false;
  @Input() state: boolean | undefined;
  @Output() stateChange = new EventEmitter<boolean | undefined>();

  constructor() { }

  ngOnInit(): void {
  }
  handleFormSubmit(form: NgForm): void {
    // value will print the JavaScript Object of the Form Values.
    console.log(form.value);
  }

  toggle() {
    if (!this.disabled) {
      if (this.state === undefined) {
        this.state = true;
      } else if (this.state === true) {
        this.state = false;
      } else {
        this.state = undefined;
      }

      this.stateChange.emit(this.state);
      this.onChange(this.state)
      this.onTouched();
    }
  }


  onChange: any = () => {
    console.log('changed')
  };
  onTouched: any = () => {
    console.log('touched')

  };

  writeValue(value: boolean | undefined): void {
    this.state = value;
    console.log("value" + value)
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
