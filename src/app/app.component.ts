import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FrontEndLogin';

  constructor(
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
}
