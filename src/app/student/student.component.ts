import { Component,OnInit } from '@angular/core';
import {StudentService} from '../student.service';
import { Student } from '../student';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit{
  editflag:boolean=false
  studArr:Array<Student>=[]
  frmReg=new FormGroup({
    rollno:new FormControl(),
    student_name:new FormControl(),
    education:new FormControl(),
    subject1_marks:new FormControl(),
    subject2_marks:new FormControl(),
    subject3_marks:new FormControl(),
    subject4_marks:new FormControl(),
    subject5_marks:new FormControl(),
  })
  regObj:Student=
  {
    id:'',
    rollno:0,
    student_name:'',
    education:'',
    subject1_marks:0,
    subject2_marks:0,
    subject3_marks:0,
    subject4_marks:0,
    subject5_marks:0,
    percentage:0,
    grade:'',
  }

  constructor(private studentServiceObj:StudentService ,private fb:FormBuilder){}
  ngOnInit(): void {
      this.frmReg=this.fb.group({
        rollno:[this.regObj.rollno,[Validators.pattern('^[0-9]+'),Validators.required]],
        student_name:[this.regObj.student_name,[Validators.pattern('^[a-zA-Z]+'),Validators.required]],
        education:[this.regObj.education,[Validators.pattern('^[a-zA-Z-0-9]+'),Validators.required]],
        subject1_marks:[this.regObj.subject1_marks,[Validators.pattern('^[0-9]+'),Validators.required]],
        subject2_marks:[this.regObj.subject2_marks,[Validators.pattern('^[0-9]+'),Validators.required]],
        subject3_marks:[this.regObj.subject3_marks,[Validators.pattern('^[0-9]+'),Validators.required]],
        subject4_marks:[this.regObj.subject4_marks,[Validators.pattern('^[0-9]+'),Validators.required]],
        subject5_marks:[this.regObj.subject5_marks,[Validators.pattern('^[0-9]+'),Validators.required]],
      })
      this.studentServiceObj.getAllStudent().subscribe((rec)=>{
        this.studArr=rec
      })
      
  }

  archive()
  {
    let subject1_marks=Number(this.regObj.subject1_marks)
    let subject2_marks=Number(this.regObj.subject2_marks)
    let subject3_marks=Number(this.regObj.subject3_marks)
    let subject4_marks=Number(this.regObj.subject4_marks)
    let subject5_marks=Number(this.regObj.subject5_marks)
    let total=subject1_marks+subject2_marks+subject3_marks+subject4_marks+subject5_marks
    this.regObj.percentage=Math.floor((total/500)*100)

    if(this.regObj.percentage>=90)
    {
      this.regObj.grade='A+'
    }
    else if(this.regObj.percentage>=75 && this.regObj.percentage<=89)
    {
      this.regObj.grade='A'
    }
    else if(this.regObj.percentage>=65 && this.regObj.percentage<=74)
    {
      this.regObj.grade='B'
    }
    else if(this.regObj.percentage>=55 && this.regObj.percentage<=64)
    {
      this.regObj.grade='C'
    }
    else if(this.regObj.percentage>=45 && this.regObj.percentage<=54)
    {
      this.regObj.grade='D'
    }
    else if(this.regObj.percentage>=35 && this.regObj.percentage<=44)
    {
      this.regObj.grade='E'
    }
    else
    {
      this.regObj.grade='Fail'
    }

    let temp:Student=
    {
      rollno:this.regObj.rollno,
      student_name:this.regObj.student_name,
      education:this.regObj.education,
      subject1_marks:this.regObj.subject1_marks,
      subject2_marks:this.regObj.subject2_marks,
      subject3_marks:this.regObj.subject3_marks,
      subject4_marks:this.regObj.subject4_marks,
      subject5_marks:this.regObj.subject5_marks,
      percentage:this.regObj.percentage,
      grade:this.regObj.grade,
    }
    if(this.editflag)
    {
      this.studentServiceObj.updateStudent(temp,this.regObj.id).subscribe((rec)=>{
        alert('Record Updated Successfully...')
        this.studentServiceObj.getAllStudent().subscribe((rec)=>{
          this.studArr=rec;
        })
      })

      this.regObj=
      {
        id:'',
        rollno:0,
        student_name:'',
        education:'',
        subject1_marks:0,
        subject2_marks:0,
        subject3_marks:0,
        subject4_marks:0,
        subject5_marks:0,
        percentage:0,
        grade:''
      }
    }

    else
    {
      this.studentServiceObj.addNewStudent(temp).subscribe((rec)=>{
        alert('Record Added Successfully...')
        this.studentServiceObj.getAllStudent().subscribe((rec)=>{
          this.studArr=rec;
        })
        console.log(rec)
      })
      this.regObj=
      {
        id:'',
        rollno:0,
        student_name:'',
        education:'',
        subject1_marks:0,
        subject2_marks:0,
        subject3_marks:0,
        subject4_marks:0,
        subject5_marks:0,
        percentage:0,
        grade:''
      }
      
    }
    temp=
    {
      id:'',
      rollno:0, 
      student_name:'',
      education:'',
      subject1_marks:0,
      subject2_marks:0,
      subject3_marks:0,
      subject4_marks:0,
      subject5_marks:0,
      percentage:0,
      grade:''
    }
    this.editflag=false
  }

  deleteRecord(id:string)
  {
    this.studentServiceObj.removeStudent(id).subscribe((rec)=>{
      alert('Record Deleted Successfully...')
      this.studentServiceObj.getAllStudent().subscribe((rec)=>{
        this.studArr=rec;
      })
    })
  }

  updateRecord(id:string)
  {
    this.editflag=true
    this.studentServiceObj.getStudent(id).subscribe((rec)=>{
      this.regObj=rec;
    })
  }

}
