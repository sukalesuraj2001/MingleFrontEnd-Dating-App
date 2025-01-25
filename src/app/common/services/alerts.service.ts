import { Injectable, inject } from '@angular/core';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  private toastController = inject(ToastController)
  constructor() { }
 async showSuccessToastmsg(message:string){
  const toast = await this.toastController.create({
    message: message,
    duration: 2000, 
    position: 'top',
    color: 'success', 
  });

  await toast.present();
}

// show failed toast msg 
  async showToastFailedMsg(message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, 
      position: 'top',
      color: 'danger', 
    });

    await toast.present();
  }

}
