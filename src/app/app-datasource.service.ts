import { BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from './app.service';
import { Contact } from './shared/Contact';

export class ContactDataSource extends MatTableDataSource<Contact>{
  private contactSubject = new BehaviorSubject<Contact[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private countSubject = new BehaviorSubject<number>(0);
  public counter$ = this.countSubject.asObservable();

  constructor(private service: AppService) {
    super();
  }

  connect(): BehaviorSubject<Contact[]> {
    return this.contactSubject;
  }

  disconnect(): void {
    this.contactSubject.complete();
    this.loadingSubject.complete();
    this.countSubject.complete();
  }

  listContacts(name: string, page = 0, size = 10, sort: string) {
    this.loadingSubject.next(true);
    this.service.listContacts(name, { page, size, sort })
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((result: any) => {
        this.contactSubject.next(result.body.content);
        this.countSubject.next(result.body.totalElements);
      });
  }
}
