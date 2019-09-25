import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

const MyProfile = gql`
query MyProfile {
  me {
    id
    name
    username
    photo(options:"200,200,face,max")
    car {
      id
      make
      model
    }
  }
}
`;

const uploadProfileImage = gql`
mutation uploadImage($filename: String!) {
  uploadImage(filename: $filename)
}
`;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private querySubscription: Subscription;
  
  me: any;
  fileToUpload: File = null;
  temporaryPhotoUrl;

  constructor(private apollo: Apollo, private http: HttpClient, private auth: AuthService) { }

  ngOnInit() {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: MyProfile
    })
    .valueChanges
    .subscribe(({ data, loading }) => {
      this.me = data.me;
      if (data.me.photo && localStorage.getItem('temporaryPhotoUrl')) {
        localStorage.removeItem('temporaryPhotoUrl');
        this.temporaryPhotoUrl = null;
      } else {
        this.temporaryPhotoUrl = localStorage.getItem('temporaryPhotoUrl');
      }
    });
  }

  handleFileInput(files) {
    this.fileToUpload = files[0];
  }

  handleUpload() {
    const data = new FormData();
    data.append('file', this.fileToUpload, this.fileToUpload.name);

    this.http.post('http://localhost:3000/upload', data).toPromise()
    .then((response: any) => {
      return response;
    })
    .then(filename => {
      this.apollo.mutate({
        mutation: uploadProfileImage,
        variables: {
          filename
        }
      }).subscribe(({ data }: any) => {
        const user = gql`
        query {
          user(id: ${this.me.id}) {
            photo(options:"200,200,face,max")
          }
        }
        `;
        this.apollo.watchQuery<any>({
          query: user,
          fetchPolicy: 'network-only'
        })
        .valueChanges
        .subscribe(({ data, loading }) => {
          this.temporaryPhotoUrl = data.user.photo;
          localStorage.setItem('temporaryPhotoUrl', this.temporaryPhotoUrl);
        });
      }, error => console.error(error));
    })
    .catch(error => console.error(error));    
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }

}
