import { Employees } from './../data-model/emp.model';
import { createAction, props } from '@ngrx/store';
import {Update} from '@ngrx/entity';


export const loadEmployees = createAction(
  '[Emp List] Load Courses via Service',
);

export const EmployeesLoaded = createAction(
  '[Emp Effect] Courses Loaded Successfully',
  props<{employees: Employees[]}>()
);

export const createEmployee = createAction(
  '[Emp Course Component] Create Course',
  props<{employee: Employees}>()
);

export const deleteEmployee = createAction(
  '[Emp List Operations] Delete Course',
  props<{empId: string}>()
);

export const updateEmployee = createAction(
  '[Emp List Operations] Update Course',
  props<{update: Update<Employees>}>()
);

export const employeeActionTypes = {
   loadEmployees,
   EmployeesLoaded,
   createEmployee,
   deleteEmployee,
   updateEmployee
};

