import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpServices } from '../http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })
  ngOnInit(): void {
  }

  get pf() {
    return this.loginForm.controls;
  }

  submit() {
    this.authService.login(this.loginForm.value).subscribe((response: any) => {
      localStorage.setItem("token", response.data.token)
      this.router.navigate(['/pages/category']);
    });
  
  }

}
