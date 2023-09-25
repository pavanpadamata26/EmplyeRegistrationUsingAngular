import { DialogModule } from '@angular/cdk/dialog';
import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CoreService } from './core/core.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  displayedColumns: string[] = [
    'id',
     'firstName', 
     'lastName',
      'email',
      'dob',
      'gender',
    'education',
    'company',
    'experience',
    'package',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private _dialog:MatDialog,private _empservice:EmployeeService,private _coreservice:CoreService){}   //service from matdilogmodule
  ngOnInit(): void {
    this.getEmployeList();
  }
     openAddEditForm(){
       const dialogRef=this._dialog.open(EmpAddEditComponent)
       dialogRef.afterClosed().subscribe({
        next:(val)=>{
          if(val){
            this.getEmployeList();
          }

        },
        error:(err)=>{
          console.log(err);
        }
       })
     }
     getEmployeList(){
      this._empservice.getEmployeeList().subscribe({
        next : (res)=>{
          console.log(res);
          this.dataSource=new MatTableDataSource(res);
          this.dataSource.sort=this.sort;
          this.dataSource.paginator=this.paginator;

        },
        error : (err)=>{
          console.log(err);
        }
      })
     }applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

   
    
    // deleteEmployee(id: number) {
    //   // Show a confirmation dialog to the user before deleting
    //   const dialogRef = this._dialog.open(EmpAddEditComponent, {
    //     data: { message: 'Are you sure you want to delete this employee?' },
    //   });
    
    //   dialogRef.afterClosed().subscribe((result) => {
    //     if (result === true) {
    //       // User confirmed the deletion
    //       this._empservice.deleteEmployee(id).subscribe({
    //         next: (res) => {
    //           // Show a Snackbar for successful deletion
    //           this._coreservice.openSnackBar('Employee deleted successfully!', 'done');
    //           this.getEmployeList(); // Refresh the employee list
    //         },
    //         error: (err) => {
    //           console.log(err);
    //         },
    //       });
    //     }
    //   });
    // }
    
    deleteEmploye(id:number){
      this._empservice.deleteEmployee(id).subscribe({
        next : (res)=>{
          //alert('employe deleted!');
          this._coreservice.openSnackBar('employe deleted!','done')
          this.getEmployeList();
  
        },
        error:(err)=>{
          console.log(err)
        }
  
      }) 
    }
  openEditForm(data:any){
    const dialogRef=this._dialog.open(EmpAddEditComponent,{
      data,
    })
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getEmployeList();
        }

      },
      error:(err)=>{
        console.log(err);
      }
     })

  }

  
}
