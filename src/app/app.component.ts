import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from './app.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { ContactDataSource } from './app-datasource.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
  dataSource: ContactDataSource;
  title = 'kn-frontend';
  selectedFile!: File;
  displayedColumns: string[] = ["name", "url"];

  myGroup: FormGroup;

  constructor(private appService: AppService) {
    this.myGroup = new FormGroup({
      searchName: new FormControl(''),
    });
    this.dataSource = new ContactDataSource(appService);
  }

  ngOnInit(): void {
    this.sort.active = this.displayedColumns[0];
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.counter$
      .pipe(
        tap((count) => {
          this.paginator.length = count;
        })
      )
      .subscribe();

    this.paginator.page
      .pipe(
        tap(() => this.listContacts())
      )
      .subscribe();
    this.listContacts();
  }

  send() {
    this.appService.sendFile(this.selectedFile).subscribe(() => this.listContacts());
  }

  selectFile($event: any) {
    this.selectedFile = $event.target.files[0];
    this.send();
  }

  listContacts() {
    this.dataSource.listContacts(this.myGroup.get('searchName')?.value,
      this.paginator.pageIndex,
      this.paginator.pageSize,
      `${this.dataSource.sort?.active},${this.dataSource.sort?.direction}`
    );
  }

  reset() {
    this.dataSource.data = [];
    //File doesn't allow to be null
    window.location.reload();
    this.appService.reset().subscribe();
  }
}
