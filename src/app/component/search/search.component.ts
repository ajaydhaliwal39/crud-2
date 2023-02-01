import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @ViewChild('search') searchRef!: ElementRef;

  showCrossIcon: boolean = false;
  search: string = '';

  @Output() searchOutput: EventEmitter<any> = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    fromEvent(this.searchRef.nativeElement, 'keyup')
      .pipe(
        map((i: any) => i.target.value),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((res: any) => {
        if (res) {
          this.showCrossIcon = true;
          this.search = res;
          this.searchOutput.emit(res);
        } else {
          this.showCrossIcon = false;
          this.search = '';
          this.searchOutput.emit(res);
        }
      });
  }

  clearInputField() {
    this.searchRef.nativeElement.value = '';
    this.search = '';
    this.showCrossIcon = false;
    this.searchOutput.emit(null);
  }
}
