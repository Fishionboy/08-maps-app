import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl, { LngLatLike, NavigationControl } from 'mapbox-gl';
import { environment } from '../../../../environments/environment';
import {v4 as UUIDv4} from 'uuid';
import { JsonPipe } from '@angular/common';

mapboxgl.accessToken = environment.mapboxKey;

interface Marker {
  id: string;
  mapboxMarker: mapboxgl.Marker;
}

@Component({
  selector: 'app-markers-page',
  imports: [JsonPipe],
  templateUrl: './markers-page.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class MarkersPage implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map | null>(null);
  markers = signal<Marker[]>([]);


  async ngAfterViewInit() {
    const element = this.divElement()!.nativeElement;
    if (!this.divElement()?.nativeElement) return;

    const map = new mapboxgl.Map({

      container: element, // container ID
      center: [2.241597, 41.604392],// starting position [lng, lat]. Note that lat must be set between -90 and 90
      zoom: 14 // starting zoom
    });

    // const marker = new mapboxgl.Marker({
    //   draggable: true
    // }).setLngLat([2.241597,41.604392])
    // .addTo(map);

    // marker.on('dragend',(event)=>{
    //   console.log(event);
    // });

    this.mapListeners(map);
  }

  mapListeners(map: mapboxgl.Map) {

    map.on('click', (event) => {
      this.mapClick(event);
    })

    this.map.set(map);


  }

  mapClick(event: mapboxgl.MapMouseEvent) {

    if (!this.map()) return;
    const map = this.map()!;

    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    const mapboxMarker = new mapboxgl.Marker({
      color: color
    })
      .setLngLat(event.lngLat)
      .addTo(map);

    const newMarker: Marker = {
      id: UUIDv4(),
      mapboxMarker: mapboxMarker
    }

    // this.markers.set([ newMarker, ...this.markers() ]);
    const logger = this.markers.update(markers => [newMarker,...markers])
    console.log(this.markers())
  }

  flyToMarker(lngLat : LngLatLike){
    if(!this.map())return;

    this.map()?.flyTo({
      center : lngLat,
    })

  }

  deleteMarker(marker : Marker){
    if(!this.map())return;

    const map = this.map()!;

    marker.mapboxMarker.remove();

    this.markers.set(this.markers().filter((m) => m.id !== marker.id));
  }


}
