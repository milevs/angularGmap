import { Component } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';
import { ViewChild, ElementRef, NgZone, } from '@angular/core';
import { FormControl } from '@angular/forms';
import {} from 'googlemaps';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete/ngx-google-places-autocomplete.directive';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  @ViewChild('places') places: GooglePlaceDirective;
    @ViewChild('search' ) public searchElement: ElementRef;
    lat: number = -33.785809;
    lng: number = 151.121195;
    constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {  }
    public handleAddressChange(address: Address) {
        console.log(address.geometry.location.lng());
        console.log(address.geometry.location.lat());
        console.log(address.geometry.location.toJSON());
        console.log(address.geometry.viewport.getNorthEast());
        this.lng = address.geometry.location.lng();
        this.lat  = address.geometry.location.lat();
    }


    //para coords
    @ViewChild('gmap') gmapElement: any;
    map: google.maps.Map;

  latitude: any;
  longitude: any;

  iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';

  markerTypes = [
    {
      text: "Parking", value: "parking_lot_maps.png"
    }   
  ];

  selectedMarkerType: string = "parking_lot_maps.png";

  isHidden = false;

  ngOnInit() {

  }

  ngAfterContentInit() {
    let mapProp = {
      center: new google.maps.LatLng(18.5793, 73.8143),
      //zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }

  setMapType(mapTypeId: string) {
    this.map.setMapTypeId(mapTypeId)
  }

    setCenter() {
      this.map.setCenter(new google.maps.LatLng(this.latitude, this.longitude));

      let location = new google.maps.LatLng(this.latitude, this.longitude);

      let marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Got you!'
      });

      marker.addListener('click', this.simpleMarkerHandler);

      marker.addListener('click', () => {
        this.markerHandler(marker);
      });
    }

  simpleMarkerHandler() {
    alert('Simple Component\'s function...');
  }

  markerHandler(marker: google.maps.Marker) {
    alert('Marker\'s Title: ' + marker.getTitle());
  }

  showCustomMarker() {


    this.map.setCenter(new google.maps.LatLng(this.latitude, this.longitude));

    let location = new google.maps.LatLng(this.latitude, this.longitude);

    console.log(`selected marker: ${this.selectedMarkerType}`);

    let marker = new google.maps.Marker({
      position: location,
      map: this.map,
      icon: this.iconBase + this.selectedMarkerType,
      title: 'Got you!'
    });
  }

}
