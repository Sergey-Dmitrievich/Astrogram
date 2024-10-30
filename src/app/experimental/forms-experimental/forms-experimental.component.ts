import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, 
  FormGroup, 
  ReactiveFormsModule, Validators } from '@angular/forms';

enum ReceiverType{
  PERSON = 'PERSON',
  LEGAL = 'LEGAL'
}
 function getForm() {
  return new FormGroup({
  type: new FormControl<ReceiverType>(ReceiverType.PERSON),
  name: new FormControl<string>('НИКИТОС', Validators.required),
  inn: new FormControl<string>(''),
  lastName: new FormControl<string>('')
  })}
@Component({
  selector: 'app-forms-experimental',
  standalone: true,
  imports: [ReactiveFormsModule], 
  templateUrl: './forms-experimental.component.html',
  styleUrl: './forms-experimental.component.scss'
})
export class FormsExperimentalComponent {
  ReceiverType = ReceiverType
  
  fb = inject(FormBuilder)

  //form = this.fb.group({
    //type: this.fb.control<ReceiverType>(ReceiverType.PERSON),
    //name: this.fb.nonNullable.control<string>('НИКИТОС'),
    //inn: this.fb.control<string>(''),
    //lastName: this.fb.nonNullable.control<string>('')
  //})

 

  form = new FormGroup({
    type: new FormControl<ReceiverType>(ReceiverType.PERSON),
    name: new FormControl<string>('НИКИТОС', Validators.required),
    inn: new FormControl<string>(''),
    lastName: new FormControl<string>('')
  })

  constructor() {
    this.form.controls.type.valueChanges
    .pipe(takeUntilDestroyed())
    .subscribe(val => {
      this.form.controls.inn.clearValidators()

      if( val === ReceiverType.LEGAL) {
        this.form.controls.inn.setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10)])
      }
    })
    this.form.valueChanges.subscribe(val => console.log(val))
  }

  onSubmit(event: SubmitEvent) {
    this.form.markAllAsTouched()
    this.form.updateValueAndValidity()
    if(this.form.invalid) return

    console.log(this.form.valid, this.form.value)
  }
}
