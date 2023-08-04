import {Component, OnInit} from '@angular/core';
import {PersonData} from "../../models/Response/PersonResponse";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-profile-icon-navbar',
  templateUrl: './profile-icon-navbar.component.html',
  styleUrls: ['./profile-icon-navbar.component.css']
})
export class ProfileIconNavbarComponent implements OnInit{
  dataUser!: PersonData;
  constructor(private service: DataService){}
  ngOnInit() {
    if (sessionStorage.getItem('email') != null) {
      this.service.getByEmail(sessionStorage.getItem('email')).subscribe(user => {
        this.dataUser = user.data as PersonData;
      });


    }
  }
}
