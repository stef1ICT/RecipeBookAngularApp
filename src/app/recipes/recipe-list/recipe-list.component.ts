import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {


  recipes: Recipe[];
  constructor(private recipeService:RecipeService,  private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();

    this.recipeService.recipeChange.subscribe(
      (recipes:Recipe[]) => {
        this.recipes = recipes;
      } 
    )
  }


  onAddNewRecipe() {
      this.router.navigate(['new'], {relativeTo: this.route});
  }
 
}
