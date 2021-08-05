import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NgbActiveModal, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of, OperatorFunction } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { Client } from 'src/app/master-list/clients/models/client.model';
import { ClientService } from '../../client.service';

@Component({
  selector: 'app-client-search',
  templateUrl: './client-search.component.html',
  styleUrls: ['./client-search.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ClientSearchComponent implements OnInit {
  searching = false;
  searchFailed = false;

  constructor(private clientService: ClientService, private activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  formatter = (state: Client) => state.name;

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap((term) =>
        this.clientService.search(term).pipe(
          tap(() => (this.searchFailed = false)),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          })
        )
      ),
      tap(() => (this.searching = false))
    );

  selectedItem($event: NgbTypeaheadSelectItemEvent) {
    this.clientService.selectedEntry.next($event.item);
    this.activeModal.close();
  }
}
