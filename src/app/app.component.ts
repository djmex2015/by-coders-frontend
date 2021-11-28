import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from './app.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
  dataSource: MatTableDataSource<any>;
  title = 'by-coders-frontend';
  selectedFile!: File;

  displayedColumns: string[] = ["tipo", "data","valor", "cpf", "cartao", "hora", "donoLoja"];

  constructor(private appService: AppService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.sort.active = this.displayedColumns[0];
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  send() {
    this.appService.sendFile(this.selectedFile).subscribe(() => this.listMovimentos());
  }

  listMovimentos() {
    this.appService.listMovimentos().subscribe(res => {
      this.dataSource.data = res.body;
      console.log(res);
    });
  }

  selectFile($event: any) {
    this.selectedFile = $event.target.files[0];
    this.send();
  }

  reset() {
    this.dataSource.data = [];
    //File nao permite ser null
    window.location.reload();
    this.appService.reset().subscribe();
  }
}
