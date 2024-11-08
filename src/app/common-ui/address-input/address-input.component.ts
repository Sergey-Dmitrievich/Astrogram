import { Component, forwardRef, inject, signal, EventEmitter } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AgInputComponent } from "../ag-input/ag-input.component";
import { DadataService } from '../../data';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { debounceTime, switchMap, tap } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { IDadataSuggestions } from '../../data/interfaces/dadata';

@Component({
  selector: 'app-address-input',
  standalone: true,
  imports: [AgInputComponent, FormsModule, ReactiveFormsModule, AsyncPipe, JsonPipe],
  templateUrl: './address-input.component.html',
  styleUrl: './address-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AddressInputComponent)
    }
  ]
})
export class AddressInputComponent implements ControlValueAccessor{
  innerSearchControl = new FormControl();
  dadataService = inject(DadataService)

  isDropdawnOpened = signal<boolean>(true)
  addresForm = new FormGroup({
    city: new FormControl(''),
    street: new FormControl(''),
    building: new FormControl(''),
  })


  suggestions$ = this.innerSearchControl.valueChanges
  .pipe(
    debounceTime(500),
    switchMap(val => {
      return this.dadataService.getSuggestion(val)
      .pipe(
        tap(res => {
          this.isDropdawnOpened.set(!!res.length)
        })
      )
    })
  )

  writeValue(city: string | null): void {
    this.innerSearchControl.patchValue(city, {
      emitEvent: false
    })
  }
  setDisabledState?(isDisabled: boolean): void {

  }
  registerOnChange (fn: any): void{
    this.onChange = fn
  }
  registerOnTouched (fn: any): void{
    this.onTouched = fn
  }
  onChange(value: any): void{

  }
  onTouched(){

  }
  onSuggestionPick(suggest:IDadataSuggestions){
    this.isDropdawnOpened.set(false)
    // this.innerSearchControl.patchValue(city, {
    //   emitEvent: false
    // })
    // this.onChange(city)

    this.addresForm.patchValue({
      city: suggest.data.city,
      street: suggest.data.street,
      building: suggest.data.house
    })
  }

}
