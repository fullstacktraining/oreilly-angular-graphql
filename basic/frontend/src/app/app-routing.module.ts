import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarComponent } from './car/car.component';
import { CarsComponent } from './cars/cars.component';


const routes: Routes = [
  { path: '', component: CarsComponent },
  { path: 'car/:id', component: CarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
