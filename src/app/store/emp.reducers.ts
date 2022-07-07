import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { Employees } from "../data-model/emp.model";
import { employeeActionTypes, EmployeesLoaded } from './emp.actions';

export interface EmpState extends EntityState<Employees> {
    employeesLoaded: boolean;
  }

  export const adapter: EntityAdapter<Employees> = createEntityAdapter<Employees>();

  export const initialState = adapter.getInitialState({
    employeesLoaded: false
  });
  
  export const employeeReducer = createReducer(
    initialState,
    
    on(employeeActionTypes.EmployeesLoaded, (state, action)=>{
        return adapter.addMany(
            action.employees,
            {...state, employeesLoaded : true}
        );
    }),

    on(employeeActionTypes.createEmployee, (state,action)=>{
        return adapter.addOne(action.employee, state);
    }),

    on(employeeActionTypes.deleteEmployee, (state, action) => {
        return adapter.removeOne(action.empId, state);
      }),

    on(employeeActionTypes.updateEmployee, (state, action) => {
        return adapter.updateOne(action.update, state);
      })
    
      
  )
  
  export const { selectAll, selectIds } = adapter.getSelectors();