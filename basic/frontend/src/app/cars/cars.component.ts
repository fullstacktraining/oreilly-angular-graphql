import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
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

export class CarsComponent implements OnInit {
  cars: any[] = [];
  constructor(private apollo: Apollo) {
    this.apollo.watchQuery({
      query
    }).valueChanges.subscribe(results => {
      this.cars = (results.data as any).cars;
    });
  }
  ngOnInit() {}
}
