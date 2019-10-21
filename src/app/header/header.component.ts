import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticate = false;

   constructor(private dataStorageService: DataStorageService, private authService:AuthService) { }

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.isAuthenticate = user ? true : false;
    })
  }

  onSaveData() {
    this.dataStorageService.storeRecipe();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipe();
  }
  
}
