import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentServiceService } from 'src/app/services/student-service.service';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  displayedColumns: string[] = ['id', 'Nombre', 'Apellido', 'Correo', 'Accion'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(  private _studentService: StudentServiceService, 
                private dialog: MatDialog,
                private snakbar: MatSnackBar  ) { }

  ngOnInit(): void {
    this.getAllStudents();
  }

  editStudent(row: any) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if ( val === 'update' ) {
        this.getAllStudents();
      }
    })
  }


  deleteStudent(id: number) {
    this._studentService.deleteStudent(id)
    .subscribe({
      next: (res) => {
        console.log(res);
        this.getAllStudents();
        this.snakbar.open('Se elimino el estudiante', '', {
          duration: 2000
        });
        
      },
      error: (err) => {
        console.log(err);
        this.snakbar.open('No se pudo eliminar', '', {
          duration: 2000
        });
      }
    });
  
  }

  getAllStudents() {
    this._studentService.getStudent()
    .subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort; 
      },
      error: () => {

      }
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
