import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormField  } from '@angular/material/form-field'
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { Employees } from '../data-model/emp.model';
import { employeeActionTypes } from '../store/emp.actions';
import { AppState } from '../store/store-index';
import * as uuid from 'uuid';
import { getAllEmployees } from '../store/emp.selectors';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  form!: FormGroup;
  localdata:any
  formDataFromParent : any;
  action:string;
  lastId!: number;
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store : Store<AppState>
    
  ) { 
   
    this.localdata = {...data}
    this.action = this.localdata.action
      
    console.log(data)
  }

  ngOnInit(): void {
    this.form =new FormGroup({
        id : new FormControl(null),
        firstName : new FormControl(null, Validators.required),
        lastName : new FormControl(null, Validators.required),
        designation : new FormControl(null, Validators.required),
        dateOfJoining : new FormControl(null, Validators.required),
        dateOfBirth : new FormControl(null, Validators.required),
        extraInfo : new FormControl(null, Validators.required),
        experience : new FormControl(null)
    });

    this.action === 'Update' ? this.form.setValue(this.data.obj) : ''
    this.store.select(getAllEmployees).subscribe((res:any)=>{
        this.lastId = res.length - 1 !== -1 ? res[res.length - 1]?.id : 0;
     })
  }


  onNoClick(action:string): void {
    this.localdata.action = action
    this.dialogRef.close({
      event : action,
      data : this.localdata
    });
  
  }

  onSubmit(form: FormGroup){
    
      if(this.action === 'Add'){
        form.value.id = this.lastId + 1
        const employee : Employees = form.value
        console.log(employee)
        this.store.dispatch(employeeActionTypes.createEmployee({employee}))
      }
      else{
        const update : Update<Employees> = {
          id : form.value.id,
          changes : {
            ...form.value
          }
        }
        this.store.dispatch(employeeActionTypes.updateEmployee({update}))
      }

      this.dialogRef.close({
        event : this.action,
        data : this.localdata,
        form : form.value
      });
  }
}
