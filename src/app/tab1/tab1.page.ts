import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { SMS } from '@ionic-native/sms/ngx'
import { Vibration } from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  
  barPos ="";
  imgData:string;
  notify: string;
  constructor(
    private camera: Camera,
    private dialogs: Dialogs,
    private sms: SMS,
    private vib: Vibration
  
  ) {

  }
  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    },2000)
  }
  openCamera() {
    const Options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(Options).then(res => {
      this.imgData =  'data:image/jpeg;base64,' + res;
      console.log('camera ok')
    },err => {
      console.log('camera err:' + err)
    })
  }
  dialogSent() {
    // this.dialogs.confirm('hello', 'tongzhi')
    // .then(() => console.log('ok'))
    // .catch(e => console.log('err'+ e))

    this.sms.send('18153252213','测试消息').then(() => {
      this.notify = '成功'
    }).catch((err) => {
      this.notify = '失败'
    });
  }
  vibration() {
    console.log('test vibration')
    this.vib.vibrate(1);
  }
}
