import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any; // Assuming user object
  editing: boolean = false;

  constructor() {}

  ngOnInit() {
    // Fetch user data from backend or mock data
    this.user = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: 'path_to_avatar_image.jpg',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      location: 'New York, USA',
      occupation: 'Software Engineer',
      interests: ['Programming', 'Traveling', 'Reading'],
      // Add more user details as needed
    };
  }

  saveProfile() {
    // Send updated profile data to backend or update locally
    console.log('Profile updated:', this.user);
    // You can implement API call or local storage update here
  }
}

