import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Cliente } from 'src/app/modelos/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  cliente: Cliente={
    nombre: '',
    apellido: '',
    email: '',
    saldo:0

  }
  id:string;

  constructor(private clientesService:ClienteService,
    private flashMessages:FlashMessagesService,
    private router:Router,
    private route:ActivatedRoute) { }



  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.clientesService.getCliente(this.id).subscribe( cliente => {
      this.cliente = cliente;
    });
  }

  guardar({value, valid}: {value:Cliente, valid:boolean}){
    if(!valid){
      this.flashMessages.show('Por Favor llena el formulario correctamente', {
        cssClass: 'alert-danger', timeout: 4000
      });
    }else{
      value.id = this.id;
      //modificar Cliente
      this.clientesService.modificarCliente(value);
      this.router.navigate(['/']);
    }

  }

  eliminar(){
    if(confirm('Seguro que desea elminar el cliente?')){
        this.clientesService.eliminarCliente(this.cliente);
        this.router.navigate(['/']);
    }
  }


}
