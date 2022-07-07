import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map, tap } from "rxjs";
import { HttpService } from "../services/http.service";
import { employeeActionTypes } from "./emp.actions";


@Injectable()
export class EmployeeEffects {

    constructor(private empService: HttpService, private actions$: Actions, private router: Router) {}

    loadEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeeActionTypes.loadEmployees),
      concatMap(() => this.empService.getAllEmployees()),
      map(employees => employeeActionTypes.EmployeesLoaded({employees}))
    )
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
  concatMap((action) => this.empService.deleteEmployee(action.empId))
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