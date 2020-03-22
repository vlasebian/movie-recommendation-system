import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../backend.service';
import { IMovie } from '../../models/movie';
import { DomSanitizer } from '@angular/platform-browser';

var blobToBase64 = function (blob, callback) {
  var reader = new FileReader();
  reader.onload = function () {
    var res = reader.result;
    callback(res);
  };
  reader.readAsDataURL(blob);
};

@Component({
  selector: 'grid-component',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  recommendations = [];
  ratingDisable = false;
  userIsNotAdmin: boolean = false;

  uid: string = localStorage.getItem('uid');
  username: string = localStorage.getItem('username');
  firstname: string = localStorage.getItem('firstname');
  categoryOne: string = localStorage.getItem('categoryOne');
  categoryTwo: string = localStorage.getItem('categoryTwo');
  categoryThree: string = localStorage.getItem('categoryThree');

  constructor(
    private backendService: BackendService,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    /* check user */

    if (this.username == "admin") {
      this.userIsNotAdmin = false;
    } else {
      this.userIsNotAdmin = true;
    }

    this.recommendations = [];

    /* get recommendations */
    this.backendService.getRecommendations(this.uid).subscribe(data => {
      let movies = data['data'];

      for (let i = 0; i < movies.length; i++) {
        let stars = 0;

        if (movies[i]['votes'].length != 0)
          stars = movies[i]['votes'][0]['stars'];

        let movieEntry: IMovie = {
          id: movies[i]['_id'],
          title: movies[i]['title'],
          image: null,
          imagePath: movies[i]['image'],
          rating: Math.round(Number(movies[i]['rating']) * 100) / 100,
          stars: stars,
          description: movies[i]['description'],
          category: movies[i]['category'],
        };

        this.recommendations.push(movieEntry);
      }

      for (let i = 0; i < this.recommendations.length; i++) {
        /* get movie image */
        this.backendService.getImage(this.recommendations[i]['imagePath']).subscribe(blob => {
          blobToBase64(blob, img => {
            this.recommendations[i]['image'] = img;
          });
        });
      }
    });
  }

  public getSanitizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  changeVote(event, movie) {
    if (event) {
      this.backendService.changeVote(movie, this.uid).subscribe(data => {
        if (data['success']) {
          movie.rating = Math.round(Number(data['data']['rating']) * 100) / 100;
        } else {
          console.log('error occured on change vote for ' + movie.title);
        }

      });
    }
  }
}
