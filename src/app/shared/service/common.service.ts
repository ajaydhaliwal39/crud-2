import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  logout() {
    
  }

  constructor(   private auth: AuthService,) { }
  presentsToast(type: any, position: any, message: any) {
    const Toast = Swal.mixin({
      toast: true,
      position: position,
      timerProgressBar: true,
      showCancelButton: false,
      showCloseButton: true,
      showConfirmButton: false,
      timer: 3000
    });
    Toast.fire({
      title: message,
      icon: type
    });
  }
}
