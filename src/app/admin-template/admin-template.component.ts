import {Component, inject} from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.css']
})
export class AdminTemplateComponent {
constructor(public authService : AuthenticationService,private router:Router) {
}

  handleLogout() {
  this.authService.logOut().subscribe({
    next : ()=>{
      this.router.navigateByUrl("/login");
    }
  })
  }
}
