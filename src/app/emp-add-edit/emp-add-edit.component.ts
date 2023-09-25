import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';


@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent  implements OnInit{
  empform:FormGroup;

  education:string[]=[
    'SSC',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];
  constructor(private _fb:FormBuilder,private _empservice:EmployeeService,private _dialogref:MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,private _coreservices:CoreService
    ){
    this.empform=this._fb.group({
      firstName:'',
      lastName:'',
      email:'',
      dob:'',
      gender:'',
      education:'',
      company:'',
      experience:'',
      package:'',
    })
  }
  ngOnInit(): void {
   this.empform.patchValue(this.data);
  }
  onFormSubmit(){
   
    if(this.empform.valid){
      if(this.data){
        this._empservice.updateEmployee(this.data.id,this.empform.value).subscribe({
          next :(val:any)=>{
            //alert("empolyee upadted succefully");
            this._coreservices.openSnackBar('empolyee upadted succefully','done')
            this._dialogref.close(true);
          },
          error :(err:any)=>{
            console.log(err);
          }
          
          
         })

      
      }
      else{
        this._empservice.addEmployee(this.empform.value).subscribe({
          next :(val:any)=>{
            //alert("empolyee added succefully");
            this._coreservices.openSnackBar('empolyee added succefully','done')
            this._dialogref.close(true);
          },
          error :(err:any)=>{
            console.log(err);
          }
          
          
         })

      }
         
         
      //console.log(this.empform.value)
    }
  }

}
