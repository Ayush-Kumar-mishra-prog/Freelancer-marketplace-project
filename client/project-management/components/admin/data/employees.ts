import { dummyEmployeeData, type Employee } from './dummyEmployee';

export type { Employee, EmployeeRole } from './dummyEmployee';

export type EmployeeValues = Omit<Employee, 'id'>;

export interface EmployeeIssue {
  path: (keyof EmployeeValues)[];
  message: string;
}

const STORAGE_KEY = 'admin-employees';

function readEmployees(): Employee[] {
  if (typeof window === 'undefined') {
    return [];
  }
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return dummyEmployeeData.map((employee) => ({ ...employee }));
  }
  return JSON.parse(stored) as Employee[];
}

function writeEmployees(employees: Employee[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
}

export function validate(values: Partial<EmployeeValues>) {
  const issues: EmployeeIssue[] = [];

  if (!values.name?.trim()) {
    issues.push({ path: ['name'], message: 'Name is required.' });
  }
  if (values.age === undefined || !Number.isFinite(Number(values.age)) || Number(values.age) < 18) {
    issues.push({ path: ['age'], message: 'Age must be at least 18.' });
  }
  if (!values.joinDate || Number.isNaN(Date.parse(values.joinDate))) {
    issues.push({ path: ['joinDate'], message: 'A valid join date is required.' });
  }
  if (!values.role) {
    issues.push({ path: ['role'], message: 'Department is required.' });
  }
  if (typeof values.isFullTime !== 'boolean') {
    issues.push({ path: ['isFullTime'], message: 'Select an employment type.' });
  }

  return { issues: issues.length > 0 ? issues : undefined };
}

export async function getMany({
  page,
  pageSize,
  search = '',
}: {
  page: number;
  pageSize: number;
  search?: string;
}) {
  const matchingEmployees = readEmployees().filter((employee) =>
    employee.name.toLowerCase().includes(search.trim().toLowerCase()),
  );
  const start = page * pageSize;
  return {
    items: matchingEmployees.slice(start, start + pageSize),
    itemCount: matchingEmployees.length,
  };
}

export async function getOne(id: number) {
  const employee = readEmployees().find((item) => item.id === id);
  if (!employee) {
    throw new Error(`Employee ${id} was not found.`);
  }
  return employee;
}

export async function createOne(values: EmployeeValues) {
  const employees = readEmployees();
  const nextId = employees.reduce((maxId, employee) => Math.max(maxId, employee.id), 0) + 1;
  const employee = { ...values, id: nextId };
  writeEmployees([...employees, employee]);
  return employee;
}

export async function updateOne(id: number, values: Partial<EmployeeValues>) {
  const employees = readEmployees();
  const index = employees.findIndex((employee) => employee.id === id);
  if (index < 0) {
    throw new Error(`Employee ${id} was not found.`);
  }
  const employee = { ...employees[index], ...values };
  employees[index] = employee;
  writeEmployees(employees);
  return employee;
}

export async function deleteOne(id: number) {
  const employees = readEmployees();
  const updatedEmployees = employees.filter((employee) => employee.id !== id);
  if (updatedEmployees.length === employees.length) {
    throw new Error(`Employee ${id} was not found.`);
  }
  writeEmployees(updatedEmployees);
}
