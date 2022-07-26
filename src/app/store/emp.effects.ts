import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as moment from "moment";
import { concatMap, map, switchMap, tap } from "rxjs";
import { HttpService } from "../services/http.service";
import { employeeActionTypes } from "./emp.actions";
import { selectAll } from "./emp.reducers";


@Injectable()
export class EmployeeEffects {

    constructor(private empService: HttpService, private actions$: Actions, private datePipe : DatePipe) { }

        loadEmployees$ = createEffect(() =>
            this.actions$.pipe(
            ofType(employeeActionTypes.loadEmployees),
            switchMap(() => this.empService.getAllEmployees().pipe(map((emp: any)=>{
                return emp.map((item : any)=>{
                    let date : any = this.datePipe.transform(item.dateOfJoining, 'MM/dd/yyyy')
                    console.log(date)
                    const momentDate = new Date(date)
                    item.experience =  moment().diff(momentDate, 'years');
                    console.log(moment().diff(momentDate, 'years'))
                    return item
                })
            }))),
            map(employees => employeeActionTypes.EmployeesLoaded({employees}))
            ),
        );

        createEmployee$ = createEffect(() =>
            this.actions$.pipe(
                ofType(employeeActionTypes.createEmployee),
                concatMap((action) => this.empService.createEmployee(action.employee)),
            ),
            {dispatch: false}
        );   

        deleteCourse$ = createEffect(() =>
            this.actions$.pipe(
            ofType(employeeActionTypes.deleteEmployee),
            concatMap((action) => this.empService.deleteEmployee(action.id))
            ),
            {dispatch: false}
        );

        updateEmployee$ = createEffect(() =>
            this.actions$.pipe(
            ofType(employeeActionTypes.updateEmployee),
            concatMap((action) => this.empService.updateEmployee(action.update.id, action.update.changes))
            ),
            {dispatch: false}
        );

}