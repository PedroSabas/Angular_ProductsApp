import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentServiceService } from 'src/app/services/student-service.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  studentForm!: FormGroup; 
  durationInSeconds: number = 1000;
  actionBTN: string = "Registrar";

  constructor( private formBuilder: FormBuilder, 
               private _studentService: StudentServiceService,
               private dialogRef: MatDialogRef<DialogComponent>,
               private snakbar: MatSnackBar,
               @Inject(MAT_DIALOG_DATA) public editData: any ) { }

  ngOnInit(): void {
    this.studentForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required]
    });

    if ( this.editData ) {
      this.actionBTN = "Actualizar";
      this.studentForm.controls['firstName'].setValue(this.editData.firstName);
      this.studentForm.controls['lastName'].setValue(this.editData.lastName);
      this.studentForm.controls['email'].setValue(this.editData.email);
    }
  }

  addProduct() {
    if ( !this.editData ) {
      if ( this.studentForm.valid ) {
        this._studentService.postStudent(this.studentForm.value)
        .subscribe({
          next: (res) => {
            this.studentForm.reset();
            this.dialogRef.close('save');
            this.snakbar.open('Se agrego correctamente!!', '', {
              duration: 2000
            });
          },
          error: () => {
            this.snakbar.open('No se pudo agregar el estudiante', '', {
              duration: 2000
            });
          }
        })
      } else {
        this.snakbar.open('Tiene que llenar todos los campos', '', {
          duration: 2000
        });
      }
    } else {
      this.updateStudent();
    }
  }

  

  updateStudent() {
    this._studentService.putStudent(this.studentForm.value, this.editData.id)
    .subscribe({
      next: (res) => {
        this.studentForm.reset();
        this.dialogRef.close('update');
        this.snakbar.open('Se actualizo correctamente!!', '', {
          duration: 2000
        });
      },
      error: (error) => {
        this.snakbar.open('No se pudo actualizar', '', {
          duration: 2000
        });
      }
    })
  }

 
  
}




