import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  //Create public property
  public signupForm !: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router){

  }

  ngOnInit(): void{
    this.signupForm = this.formBuilder.group({
      fullName:['', Validators.required],
      mobile:['', Validators.required],
      email:['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')]],
      password:['', Validators.required]
    })
  }
  signUp(){
    this.http.post<any>("http://localhost:3000/signupUsers", this.signupForm.value)
    .subscribe(res => {
      alert("SignUp successfully");
      this.signupForm.reset();
      this.router.navigate(['/login']);
    },err => {
      alert("something went wrong");
    })
  }

}
