import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public base64Image: any;
  public watch: any;
  public latitude: any;
  public longitude: any;
  loc:any;
  address:any;
  constructor(public navCtrl: NavController,private camera: Camera,private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder) {
    this.getLocation()
  }
  takePicture() {
    console.log("hello");
    let options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     console.log(imageData);
     this.base64Image = 'data:image/jpeg;base64,' + imageData;
     //this.test('data');
     let str = this.loc;
    let addr = str.substring(0, str.length - 1);
    this.address= addr.replace(/^"/, "");

    }, (err) => {
      console.log('imageData not found');
     // Handle error
    });
   
  }
  getLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      //  resp.coords.latitude;
      //  resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
     this.watch = this.geolocation.watchPosition();
     this.watch.subscribe((data) => {
       console.log(data.coords.latitude, data.coords.longitude);
      // data can be a set of coordinates, or an error (if an error occurred).
       this.latitude = data.coords.latitude;
       this.longitude = data.coords.longitude
       this.nativeGeocoder.reverseGeocode(this.latitude, this.longitude)
        .then((result: NativeGeocoderReverseResult) => {
          console.log(JSON.stringify(result));
          this.test(result);
          
        })
        .catch((error: any) => console.log(error));
     });

  }
  
test(data){
console.log(data);
this.loc = JSON.stringify(data.thoroughfare+','+data.subLocality +','+ data.locality +','+ data.postalCode),

console.log(this.loc);
}
  
}
