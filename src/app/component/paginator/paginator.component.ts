import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {
  @Input() recordsLength: number = 1;
  @Input() pageSize: number = 10;
  @Input() currentPage: number = 1;

  @Output() paginationOutput = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  handlePage(event: PageEvent) {
    console.log(event, 'paginator');
    let body: any = {
      pageSize: event.pageSize,
      currentPage: event.pageIndex + 1,
    };

    this.paginationOutput.emit(body);
  }
}
