import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentServiceService } from 'src/app/services/student-service.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-tolbar',
  templateUrl: './tolbar.component.html',
  styleUrls: ['./tolbar.component.scss']
})
export class TolbarComponent implements OnInit {

  
  constructor( private dialog: MatDialog, private _studentService: StudentServiceService ) { }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if ( val === 'save' ) {
        this.getAllStudents();
      }
    })
  }



  getAllStudents() {
    this._studentService.getStudent().subscribe();
  }
}
