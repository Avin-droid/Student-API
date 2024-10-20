import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from './student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClientObj:HttpClient) {}

  getAllStudent():Observable<Student[]>
  {
    return this.httpClientObj.get<Student[]>('http://localhost:3000/student')
  }

  addNewStudent(obj:Student)
  {
    return this.httpClientObj.post('http://localhost:3000/student',obj)
  }

  removeStudent(id:string)
  {
    return this.httpClientObj.delete('http://localhost:3000/student/'+id)
  }

  getStudent(id:string)
  {
    return this.httpClientObj.get<Student>('http://localhost:3000/student/'+id)
  }

  updateStudent(obj:Student,id:string)
  {
    return this.httpClientObj.put('http://localhost:3000/student/'+id,obj)
  }
  
}
