export type EmployeeRole = 'Market' | 'Finance' | 'Development';

export interface Employee {
  id: number;
  name: string;
  age: number;
  mobile?: string;
  joinDate: string;
  role: EmployeeRole;
  isFullTime: boolean;
  email:string
}

export const dummyEmployeeData: Employee[] = [
    {
        id:1,
        name:"dummyEmployee1",
        age:25,
        mobile:"1234567890",
        joinDate:"2023-01-01",
        role:"Development",
        isFullTime:true,
        email:"dummy@gmail.com"
    },
        {
        id:2,
        name:"dummyEmployee2",
        age:25,
        mobile:"1234567890",
        joinDate:"2023-01-01",
        role:"Development",
        isFullTime:true,
        email:"dummy@gmail.com"
    },{
        id:3,
        name:"dummyEmployee3",
        age:25,
        mobile:"1234567890",
        joinDate:"2023-01-01",
        role:"Development",
        isFullTime:true,
        email:"dummy@gmail.com"
    },{
        id:4,
        name:"dummyEmployee4",
        age:25,
        mobile:"1234567890",
        joinDate:"2023-01-01",
        role:"Development",
        isFullTime:true,
        email:"dummy@gmail.com"
    },{
        id:5,
        name:"dummyEmployee5",
        age:25,
        mobile:"1234567890",
        joinDate:"2023-01-01",
        role:"Development",
        isFullTime:true,
        email:"dummy@gmail.com"
    }
    
]