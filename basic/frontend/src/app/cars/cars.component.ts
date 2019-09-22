import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import gql from 'graphql-tag';

const query = gql`
{
  cars {
    id
    make
    model
    colour
  }
}
`;

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})

export class CarsComponent implements OnInit, OnDestroy {
  cars: any[] = [];
  loading: boolean;
  private querySub: Subscription;

  constructor(private apollo: Apollo) { }
  
  ngOnInit() {
    this.querySub = this.apollo.watchQuery({
      query
    })
    .valueChanges
    .subscribe(({ data, loading }) => {
      this.loading = loading;
      this.cars = data['cars'];
    });
  }
  
  ngOnDestroy() {
    this.querySub.unsubscribe();
  }
}
