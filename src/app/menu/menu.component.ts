import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

    emp_type:number=0;
  constructor(private breakpointObserver: BreakpointObserver,private _route:Router) {
    this.emp_type=parseInt(localStorage.getItem('emp_type'));
  }

  logout()
  {
    localStorage.setItem('email_id',"");
    localStorage.clear();

    localStorage.setItem('emp_type',"0");
    this._route.navigate(['']);


  }
  }
