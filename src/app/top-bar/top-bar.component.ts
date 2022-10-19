import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  constructor(
    private router: Router,
    private jwtHelper: JwtHelperService
  ) { }

  ngOnInit(): void {
  }

  
  isUserAuthenticated(){
    const token: string = localStorage.getItem("jwt")!;
    if (token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }else{
      return false;
    }
  }

  logOut(){
    localStorage.removeItem("jwt");
    this.router.navigate(['/']);
  }


}
