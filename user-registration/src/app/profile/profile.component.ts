import { Component, OnInit } from '@angular/core';
import { User } from '../models/user-model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userProfile: User | undefined;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getProfileList();
  }

  getProfileList() {
    this.apiService.getUserProfileList().subscribe(res => {
      this.userProfile = res as User;
    })
  }

}
