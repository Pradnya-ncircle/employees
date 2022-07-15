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

    constructor(private empService: HttpService, private actions$: Actions) { }

        loadEmployees$ = createEffect(() =>
            this.actions$.pipe(
            ofType(employeeActionTypes.loadEmployees),
            switchMap(() => this.empService.getAllEmployees().pipe(map((emp: any)=>{
                return emp.map((item : any)=>{
                    const momentDate = new Date(item.dateOfJoining)
                    item.experience =  moment().diff(momentDate, 'years');
                    console.log(item)
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
                // tap(() => this.router.navigateByUrl('/courses'))
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