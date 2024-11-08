import { Component, forwardRef, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-ag-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './ag-input.component.html',
  styleUrl: './ag-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AgInputComponent)
    }
  ]
})
export class AgInputComponent implements ControlValueAccessor{
  type = input<'text' | 'password'>('text')
  placeholder = input<string>()
  disabled = signal<boolean>(false)
  onChange: any
  onTouched: any
  value: string | null = null

  writeValue(val: string | null){
    console.log(val)
    this.value = val
  }
  registerOnChange (fn: any): void{
    this.onChange = fn
  }
  registerOnTouched (fn: any): void{
    this.onTouched = fn
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled)
  }
  onModelChange (val: string | null): void {
    this.onChange(val)
  }
}
