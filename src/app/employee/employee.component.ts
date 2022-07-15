import { Component, Inject, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from '../services/http.service';

import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';
import { AppState } from '../store/store-index';
import { Store } from '@ngrx/store';
import { Employees } from '../data-model/emp.model';
import { map, Observable } from 'rxjs';
import { getAllEmployees } from '../store/emp.selectors';
import { employeeActionTypes, loadEmployees } from '../store/emp.actions';
import * as moment from 'moment';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  basic = false
  empDetails : any;
  closeResult!: string;
  form!: FormGroup;
  addFormValue = [{}];
  experience :number | undefined;


  employees$!: Observable<Employees[]>;

  employeeToBeUpdated!: Employees;

  isUpdateActivated = false;

  constructor(private httpService : HttpService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private store : Store<AppState>

    ) {
    }

  ngOnInit(): void {
    this.store.dispatch(loadEmployees());
   
    this.employees$ = this.store.select(getAllEmployees)
   

  }

openDialog(action:any, obj:any) {
     const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px',
      height : '580px',
      data: {
        action,
        obj
      }
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
        if(result.event == 'Add'){
          console.log(result.data)
          this.addFormValue = result.form
        }
      }
  );  
}

updateEmp(emp:any){
  this.openDialog('Update', emp)
}

deleteEmp(id: number) {
  this.store.dispatch(employeeActionTypes.deleteEmployee({id}));
}
}
