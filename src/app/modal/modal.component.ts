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
  existingIds!: number;
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store : Store<AppState>
    
  ) { 
    console.log(data)
    this.localdata = {...data}
    this.action = this.localdata.action
  }

  ngOnInit(): void {
    this.form =new FormGroup({
        id : new FormControl(null),
        firstName : new FormControl(null, Validators.required),
        lastName : new FormControl(null, Validators.required),
        designation : new FormControl(null, Validators.required),
        dateOfBirth : new FormControl(null, Validators.required),
        dateOfJoining : new FormControl(null, Validators.required),
        extras : new FormControl(null, Validators.required),
        experience : new FormControl(null)
    });

    this.store.select(getAllEmployees).subscribe((res:any)=>{
        this.existingIds = res.length
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
      form.value.dateOfBirth =  moment(form.value.dateOfBirth).utc().format('MM/DD/YYYY')
      form.value.dateOfJoining =  moment(form.value.dateOfJoining).utc().format('MM/DD/YYYY')
      form.value.id = this.existingIds + 1
        const employee : Employees = form.value
        console.log(employee)
        this.store.dispatch(employeeActionTypes.createEmployee({employee}))
      }
      else{

      }

      this.dialogRef.close({
        event : this.action,
        data : this.localdata,
        form : form.value
      });
  }
}
