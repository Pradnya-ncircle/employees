import { Employees } from './../data-model/emp.model';
import { createAction, props } from '@ngrx/store';
import {Update} from '@ngrx/entity';


export const loadEmployees = createAction(
  '[Emp List] Load Employees via Service',
);

export const EmployeesLoaded = createAction(
  '[Emp Effect] Employees Loaded Successfully',
  props<{employees: Employees[]}>()
);

export const createEmployee = createAction(
  '[Emp Course Component] Create Employee',
  props<{employee: Employees}>()
);

export const deleteEmployee = createAction(
  '[Emp List Operations] Delete Employee',
  props<{id: number}>()
);

export const updateEmployee = createAction(
  '[Emp List Operations] Update Employee',
  props<{update: Update<Employees>}>()
);

export const employeeActionTypes = {
   loadEmployees,
   EmployeesLoaded,
   createEmployee,
   deleteEmployee,
   updateEmployee
};

