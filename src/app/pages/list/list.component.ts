import { Component, OnInit, Output, ViewChild, EventEmitter, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { CommonService } from 'src/app/shared/service/common.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  [x: string]: any;
  displayedColumns: string[] = [ 'id', 'name', 'email', 'dob', 'phone','address','actions'];
  dataSource= new MatTableDataSource<Element>();

  @ViewChild('MatSort') sort!: MatSort;

  search: string = '';
  currentPage: number = 1;
  // recordsLength: number = 1;
  @Output() paginationOutput: EventEmitter<any> = new EventEmitter();
  @Input() recordsLength: number = 10;
  @Output() searchOutput:EventEmitter<any> =new EventEmitter();
  pageSize = 10;
  pageIndex= 0;
  limit= 10;
  
  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private auth:AuthService,
    private common:CommonService,
    private _toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
  this.getuser();
  }

  
  editId(id:any){
    if (id){
      this.router.navigate([`/user/edit/${id}`])
    }
  }

 
  viewUser(id:any){
    if (id){
      this.router.navigate([`/user/view/${id}`])
    }
  }

  getuser(){
    let query = `page=${this.currentPage}&limit=${this.pageSize}`;
    this.search &&
      (query = `page=${this.currentPage}&size=${this.pageSize}&search=${this.search}`);
      this.auth.getRequest('merchant',query).subscribe((res:any)=>{
      console.log(res),
      this.dataSource=res.data;
    })
  }

  deletid (id:any){
    Swal.fire({
      title:'Are you sure?',
      text:"You won't be able to revert this!",
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085de',
      cancelButtonColor:'#d33',
      confirmButtonText:'yes, delete it!',
      }).then((result)=>{
        if(result.value){
          this.auth.deleteRequest('merchant',id).subscribe((res:any)=>{
            let data={
              search:null,
            };
            Swal.fire('Deleted', 'User has been deleted.','success');
           this.getuser();
          });
        }
      });
    };
 fetchPaginationOutput(event: any) {
    this.pageSize = event.pageSize;
    this.currentPage = event.currentPage;
    this.getuser()
  }

  fetchSearchOutput(event: any) {
    this.pageSize = event.pageSize;
    this.currentPage = event.currentPage;
    this.getuser()
  }

}
