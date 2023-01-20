import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ConfiguracionService } from '../services/configuracion.service';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionGuard implements CanActivate {
  constructor(private router: Router, 
    private configuracionService: ConfiguracionService){

    }
  canActivate():Observable<boolean>{
    
    return this.configuracionService.getConfiguracion().pipe(
      map( configuracion => {
        if(configuracion.permitirRegistro){
          return true;
        }else{
          this.router.navigate(['/login']);
          return false;
        }

      })
    )
  }
  
}
