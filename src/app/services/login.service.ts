import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token:string;
  constructor(
    private authService: AngularFireAuth,
    private router: Router
  ) { }


  login(email:string, password:string){
      return new Promise((resolve, reject) => {
        this.authService.signInWithEmailAndPassword(email, password)
        .then(datos => resolve(datos),
        error => reject(error)
        )
      })
  }

  getAuth(){
    return this.authService.authState.pipe(
      map( auth => auth)
    );
  }
  logout(){
    this.authService.signOut();
  }

  registrarse(email: string, password: string){
    return new Promise((resolve, reject) => {
      this.authService.createUserWithEmailAndPassword(email, password)
      .then(datos => resolve(datos),
      error => reject(error))
    });
  }
}
