import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormRecord, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Feature, MockService } from '../experimental/mock.service';
import { NameValidatorService } from './name-validator.service';

  enum ReceiverType {
    PERSON = 'PERSON',
    LEGAL = 'LEGAL'
  }

  interface Address {
    city?: string
    street?: string
    building?: number
    apartment?: number
  }

  function getAddressForm(initialValue: Address = {}) {
    return new FormGroup({
      city: new FormControl<string>(initialValue.city ?? ''),
      street: new FormControl<string>(initialValue.street ?? ''),
      building: new FormControl<number | null>(initialValue.building ?? null),
      apartment: new FormControl<number | null>(initialValue.apartment ?? null)
    });
  }

  function validateStarWith(FormBiddenLetter: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value.startsWith(FormBiddenLetter) ? {error:{message: `${FormBiddenLetter} - это плохо`} } : null
    }
  }

  function vivod (pr: any) {
    return (control: AbstractControl) => {
      const prr = control.get(pr)
      console.log(prr)
  }}


  function validateDateRange({fromControlName, toControlName}: {fromControlName: string, toControlName: string}) {
    return (control: AbstractControl) => {
      const fromControl = control.get(fromControlName)
      const toControl = control.get(toControlName)

      if (!fromControl || !toControl) return null

      const fromDate = new Date(fromControl.value)
      const toDate = new Date(toControl.value)

      if(fromDate && toDate && fromDate > toDate){
        return  {error: {message: 'Дата начала не может быть больше даты конца'}}
      }

      return null
    }
  }

  // const validateStarWith: ValidatorFn = (control: AbstractControl) => {
  //   return control.value.startsWith('Я') ? {ErrorName: 'Я - последняя буква алфавита!'} : null
  // }

  @Component({
    selector: 'tt-forms-experiment',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './forms-experimental.component.html',
    styleUrl: './forms-experimental.component.scss'
  })
  export class FormsExperimentalComponent {
    #fb = inject(FormBuilder);

    ReceiverType = ReceiverType;

    nameValidator = inject(NameValidatorService)
    features: Feature[] = []
    mockService = inject(MockService)

    form = new FormGroup({
      type: new FormControl<ReceiverType>(ReceiverType.PERSON),
      name: new FormControl<string>('', {
        validators: [Validators.required],
        asyncValidators: [this.nameValidator.validate.bind(this.nameValidator)],
        updateOn: 'blur'
      }),
      inn: new FormControl<string>(''),
      lastName: new FormControl<string>('ЗНАЧЕНИЕ'),
      addresses: new FormArray([getAddressForm()]),
      feature: new FormRecord({}),
      dataRange: new FormGroup({
        from: new FormControl<string>(''),
        to: new FormControl<string>(''),
      }, validateDateRange({fromControlName: 'from', toControlName: 'to'}))
    });

    // form = this.#fb.group({
    //   type: this.#fb.control<ReceiverType>(ReceiverType.PERSON),
    //   name: this.#fb.nonNullable.control<string>('Lucas'),
    //   inn: this.#fb.control<string>('fsdfsdfsd'),
    //   lastName: this.#fb.control<string>('dsfasdf'),
    //   addresses: new FormArray([getAddressForm()]),
    //   features: new FormRecord({})
    // });

    constructor() {
      this.mockService.getAddresses()
      .pipe(takeUntilDestroyed())
      .subscribe(addrs => {
        // while(this.form.controls.addresses.controls.length > 0){
        // this.form.controls.addresses.removeAt(0)
        this.form.controls.addresses.clear()

      for(const adrs of addrs) {
        this.form.controls.addresses.push(getAddressForm(adrs))

      }
      // this.form.controls.addresses.setControl(1, getAddressForm(addrs[0]))
      // console.log(this.form.controls.addresses.at(0).value)
      // this.form.controls.addresses.disable()
      })


      this.mockService.getFeatures()
      .pipe(takeUntilDestroyed())
      .subscribe(features => {
        this.features = features
        console.log(this.form.controls.feature)

        for (const feature of features) {
          this.form.controls.feature.addControl(feature.code, new FormControl(feature.value)
          )
        }
      })





      this.form.controls.type.valueChanges
        .pipe(takeUntilDestroyed())
        .subscribe(val => {
          this.form.controls.inn.clearValidators();

          if (val === ReceiverType.LEGAL) {
            this.form.controls.inn.setValidators(
              [Validators.required, Validators.minLength(10), Validators.maxLength(10)]
            )
          }
        })
    }

    onSubmit(event: SubmitEvent) {
      this.form.reset();
        this.form.markAllAsTouched()
        this.form.updateValueAndValidity()
        if (this.form.invalid) return
    }

    addAddress() {
      this.form.controls.addresses.insert(0, getAddressForm())
    }

    deleteAddres(index: number) {
      this.form.controls.addresses.removeAt(index)
    }

    sort = () => 0

  }
