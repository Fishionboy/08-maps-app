import { Routes } from '@angular/router';
import { FullscreenMapPage } from './pages/fullscreen-map-page/fullscreen-map-page';
import { MarkersPage } from './pages/fullscreen-map-page/markers-page/markers-page';
import { HousesPage } from './pages/fullscreen-map-page/houses-page/houses-page';

export const routes: Routes = [
    {
        path:'fullscreen',
        component: FullscreenMapPage,
        title: 'FullScreen Map'
    },
    {
        path:'markers',
        component: MarkersPage,
        title: 'Marcadores'
    },
    {
        path:'houses',
        component: HousesPage,
        title: 'Propiedades Disponibles'
    },
    {
        path:'**',
        redirectTo: 'fullscreen'        
    },
];
