import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const getCar = gql`
query getCar($id: ID!) {
  car(id: $id) {
    id
    make
    model
    colour
    speed
    year
  }
}
`;

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  car: any;
  id: any;

  constructor(private apollo: Apollo, private route: ActivatedRoute) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
    });

    this.apollo.watchQuery({
      query: getCar,
      variables: {
        id: this.id
      }
    }).valueChanges.subscribe((results: any) => {
      console.log(results);
      this.car = results.data.car;
    });
  }

  ngOnInit() {
  }

}
