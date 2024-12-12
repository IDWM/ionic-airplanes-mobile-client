import { Component, inject, OnInit } from '@angular/core';
import { Airplane } from '../../interfaces/airplane';
import { AirplaneService } from 'src/app/services/airplane.service';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from '@ionic/angular/standalone';
import { pencilOutline } from 'ionicons/icons';

@Component({
  selector: 'app-airplanes',
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
  ],
  templateUrl: './airplane-list.component.html',
})
export class AirplaneListComponent implements OnInit {
  private readonly airplaneService = inject(AirplaneService);

  protected airplanes: Airplane[] = [];
  protected pencilIcon = pencilOutline;

  protected readonly tableHeaders = [
    { key: 'id', label: 'ID' },
    { key: 'model', label: 'Modelo' },
    { key: 'capacity', label: 'Capacidad' },
  ];

  ngOnInit(): void {
    this.airplaneService.getAirplanes().subscribe((airplanes) => {
      this.airplanes = airplanes;
    });
  }
}
