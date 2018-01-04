import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { 
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent, 
  GoogleMapOptions,
  MarkerOptions,
  Marker, 
  LatLng,
  CameraPosition,
  GoogleMapsAnimation
} from '@ionic-native/google-maps';
import { Platform } from 'ionic-angular/platform/platform';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  map: GoogleMap;
  constructor(public navCtrl: NavController,private googleMaps: GoogleMaps,public platform: Platform) {
   /* platform.ready().then(() => {
      this.loadMap();
    });*/
  }
  // ngAfterViewInit() {
  //   this.loadMap();
  // }
 ionViewDidLoad() {
   console.log('before load.....')
    this.loadMap();
    console.log('after load...');
   } 
   loadMap() {
    let element = document.getElementById('map');
    let map: GoogleMap = GoogleMaps.create(element, {});
    let latlng = new LatLng(22.688154, 88.4711731);
 
    
    map.one(GoogleMapsEvent.MAP_READY).then(() => {
      console.log('Map Is Ready....')
        let position: CameraPosition<Object> = {
      target: latlng,
      zoom: 18,
      tilt: 30
        }
        map.moveCamera(position);
        let markerOptions: MarkerOptions = {
          position: {
            lat: 22.688154,
            lng: 88.4711731
          },
          title: 'Exicube App Solutions',
          icon: 'red',
          // { url : 'https://i.pinimg.com/736x/73/26/cd/7326cdf1c2f2815ca118d4a4829a90f7--marker-icon-map-marker.jpg' },
          animation: GoogleMapsAnimation.BOUNCE,
          draggable: true
        };
        map.addMarker(markerOptions)
        .then(marker => {
          marker.on(GoogleMapsEvent.MARKER_CLICK)
            .subscribe(() => {
              alert('clicked');
            });
        });
          // console.log(map.getDiv());
          // map.bindTo('postion',map,'center');
    });
   /* this.map = new GoogleMap('map');

    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
      console.log('Map is ready!');
    }); */
   /* let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = new GoogleMap('map_canvas', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');

        // Now you can use all methods safely.
        this.map.addMarker({
            title: 'Ionic',
            icon: 'blue',
            animation: 'DROP',
            position: {
              lat: 43.0741904,
              lng: -89.3809802
            }
          })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                alert('clicked');
              });
          });

      });*/
   }

}
