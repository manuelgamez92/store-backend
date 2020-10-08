import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AsyncValidatorFn } from '@angular/forms';
import { timer, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { isFormattedError } from '@angular/compiler';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.registerUser();
  }
  registerUser() {
    this.registerForm = new FormGroup({
      displayName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required,Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')],[this.validateEmailNotTaken()]),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.accountService.register(this.registerForm.value).subscribe(
      (response) => {
        this.router.navigateByUrl('/shop');
      },
      (error) => {
        console.log('error: ' + error);
      }
    );
  }
  validateEmailNotTaken(): AsyncValidatorFn {
    return control => {
      return timer(500).pipe(
        switchMap(()=>{
          if(!control.value){ return of(null);}
          return this.accountService.checkEmailExists(control.value).pipe(
            map(res=>{
              return res ? {emailExists:true} : null;
            })
          );
        })
      );
    };
   
    
  }

}
