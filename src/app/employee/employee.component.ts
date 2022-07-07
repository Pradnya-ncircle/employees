import { Component, Inject, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from '../services/http.service';

import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';
import { AppState } from '../store/store-index';
import { Store } from '@ngrx/store';
import { Employees } from '../data-model/emp.model';
import { Observable } from 'rxjs';
import { getAllEmployees } from '../store/emp.selectors';
import { loadEmployees } from '../store/emp.actions';


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
    this.httpService.getAllEmployees().subscribe(res=>{
      this.empDetails = res;
      console.log(this.empDetails)
    })
    this.store.dispatch(loadEmployees());
   
    this.employees$ = this.store.select(getAllEmployees);

  }

  openDialog(action:any, obj:any) {
       obj.action = action
     const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px',
      height : '580px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
        console.log(result)
        if(result.event == 'add'){
          console.log(result.data)
          this.addFormValue = result.form
        }
      }
  );  
}


  addEmp(){
    
  }
}
