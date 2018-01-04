import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
import * as firebase from 'firebase';
// import { FirebaseApp } from '@firebase/app-types';
// import { FirebaseService } from '@firebase/app-types/private';

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
  storageRef:any;
  downloadUrl:any;
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
    //  console.log(imageData);
     this.base64Image = 'data:image/jpeg;base64,' + imageData;
     this.storageRef = firebase.storage().ref();
     const filename = Math.floor(Date.now() / 1000);
     const imageRef = this.storageRef.child(`images/${filename}.jpg`);
     console.log(this.storageRef);
     imageRef.putString(this.base64Image, firebase.storage.StringFormat.DATA_URL).then((snapshot)=> {
      alert('upload success');
      console.log(snapshot.downloadURL);
      this.downloadUrl = snapshot.downloadURL;

     })

  //    .getDownloadURL().then(url =>
  //     console.log(url)
  // );
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
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.nativeGeocoder.reverseGeocode(this.latitude, this.longitude)
        .then((result: NativeGeocoderReverseResult) => {
          console.log(JSON.stringify(result));
          this.test(result);
          
        })
        .catch((error: any) => console.log(error));
     }).catch((error) => {
       console.log('Error getting location', error);
     });
    /* 
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
      });*/

  }
  
test(data){
console.log(data);
this.loc = JSON.stringify(data.thoroughfare+','+data.subLocality +','+ data.locality +','+ data.postalCode),

console.log(this.loc);
}
  
}
