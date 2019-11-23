import { Injectable } from '@angular/core';
import * as json from './control-error-messages.json'
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormControlService {
  /**
   * @description Variable para almacenar los mensajes de error de la app.
   */
  private messages: any;

  constructor() {
    this.messages = json.errorMessages;
   }

 /**
   * @description Método que obtiene el mensaje de error que se va a mostrar
   *              Unicamente se obtiene el primer mensaje.
   * @method errorMessage get
   */
  public errorMessage(control:FormControl, subfix?:string, personalized?:string ) {
    if (control && control.errors) {
      for (let key in control.errors) {
        if (personalized) {
          subfix = '';
          let message = this.messages[personalized + "." + key];
          return message ? message : this.messages[key];
        } else if (subfix!='' && key!="required") {
          return this.messages[key] + " " + subfix;
        }else{
         return this.messages[key]; 
        }
      }
    }
    return null;

  }
}
