import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';

const carsQuery = gql`
query GetCars($after: String) {
  cars(after: $after) {
    cursor
    hasMore
    cars {
      id
      make
      model
    }
  }
}
`;

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})

export class CarsComponent implements OnInit {
  cars: any[];
  carsQuery: QueryRef<any>;
  cursor: any;

  constructor(private apollo: Apollo) {}
  ngOnInit() {
    this.carsQuery = this.apollo.watchQuery<any>({
      query: carsQuery
    });

    this.carsQuery
      .valueChanges
      .subscribe(({ data }) => {
        this.cars = data.cars.cars;
        this.cursor = data.cars.cursor;
      });
  }

  fetchMore() {
    this.carsQuery.fetchMore({
      query: carsQuery,
      variables: {
        after: this.cursor
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          ...fetchMoreResult,
          cars: {
            ...fetchMoreResult.cars,
            cars: [
              ...prev.cars.cars,
              ...fetchMoreResult.cars.cars,
            ],
          }
        }
      }
    });
  }
}
