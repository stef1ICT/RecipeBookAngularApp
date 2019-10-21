import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';
import { take, exhaustMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {


  constructor(private http:HttpClient, private recipeService:RecipeService, private authService: AuthService) {

  }


  storeRecipe() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://ng-recipe-angular-22cdd.firebaseio.com/recipes.json', recipes)
    .subscribe(response => {
      console.log(response);
    })

  }


  fetchRecipe() {
     
   
      this.http.get<Recipe[]>('https://ng-recipe-angular-22cdd.firebaseio.com/recipes.json', {
        params : new HttpParams().set('auth', this.authService.authToken)
      }).subscribe(recipes => {
        this.recipeService.setRecipes(recipes);
      })
    }

   
  }
