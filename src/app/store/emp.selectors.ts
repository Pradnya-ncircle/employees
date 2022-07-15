import { EmpState } from './emp.reducers';
import { Employees } from './../data-model/emp.model';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { selectAll, selectIds } from './emp.reducers';

export const empFeatureSelector = createFeatureSelector<EmpState>('employees');

export const getAllEmployees = createSelector(
  empFeatureSelector,
  selectAll
);

export const areEmployeesLoaded = createSelector(
    empFeatureSelector,
    state => state.employeesLoaded
);


