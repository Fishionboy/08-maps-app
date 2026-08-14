import { AfterViewInit, ChangeDetectionStrategy, Component, computed, ElementRef, input, signal, viewChild } from '@angular/core';
import mapboxgl, { NavigationControl } from 'mapbox-gl';
import { environment } from '../../../../environments/environment';

mapboxgl.accessToken = environment.mapboxKey;


@Component({
  selector: 'app-minimap',
  imports: [],
  templateUrl: './minimap.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: `
  div{
    width: 100%;
    height: 260px;
  }`
})
export class Minimap implements AfterViewInit {
  divElement = viewChild<ElementRef>('minimap');
  coordinates = input.required<{ lng: number, lat: number }>();  
  map = signal<mapboxgl.Map | null>(null);

  async ngAfterViewInit() {
    if (!this.divElement()?.nativeElement) return;

    const element = this.divElement()?.nativeElement;
    const { lat, lng } = this.coordinates();

    const map = new mapboxgl.Map({
      container: element, // container ID
      center: [lng, lat], // starting position [lng, lat]. Note that lat must be set between -90 and 90
      zoom: 16, // starting zoom
      interactive: false,
      pitch:30
    }); 
console.log(mapboxgl.accessToken);
   const miniMark = new mapboxgl.Marker({

    }).setLngLat(this.coordinates())
    .addTo(map);
    this.map.set(map);
  }

 }
