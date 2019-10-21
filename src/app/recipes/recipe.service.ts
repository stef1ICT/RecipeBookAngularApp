import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shoppingList.service';
import { Subject } from 'rxjs';


@Injectable({
  providedIn:'root'
})
export class RecipeService {


  recipeChange = new Subject<Recipe[]>();
  selectedRecipe = new EventEmitter<Recipe>();

 private recipes: Recipe[] = [
    // new Recipe("Just a test", "This is test description", "https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/crab-asparagus-pappardelle.jpg",
    // [
    //   new Ingredient('Ingredient 1', 5),
    //   new Ingredient('Ingrediant 2', 10)
    // ]),
    // new Recipe("Just a test", "This is test description", "https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/crab-asparagus-pappardelle.jpg",
    // [
    //   new Ingredient('Ingrediant 3', 5),
    //   new Ingredient('Ingrediant 4', 5),
    // ])
  ];

    constructor(private shoppingListService:ShoppingListService) {

    }

    setRecipes(recipes: Recipe[]) {
          this.recipes = recipes;
          this.recipeChange.next(recipes.slice());
    }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index:number) {
      return this.recipes.slice()[index];
  }

  addIngrediantToShoppingList(ingrediants:Ingredient[]) {
     
      this.shoppingListService.addToShoppingList(ingrediants);
  }


  addRecipe(recipe:Recipe) {
    this.recipes.push(recipe);
    this.recipeChange.next(this.recipes.slice());
  }


  updateRecipe(index:number, newRecipe:Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChange.next(this.recipes.slice());
  }


  deleteRecipe(index:number) {
    this.recipes.splice(index,1);
    this.recipeChange.next(this.recipes.slice());
  }
}