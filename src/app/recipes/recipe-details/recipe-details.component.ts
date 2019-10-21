import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

recipe:Recipe;
 id:number;
  constructor(private recipeService:RecipeService, private router:Router, private route:ActivatedRoute,) { }

  ngOnInit() {


    this.route.params.subscribe(
      (params:Params) => {
          this.id = +params['id'];
          this.recipe = this.recipeService.getRecipe(this.id);
      }
    )
  }


  toAddToShoppingList() {
    
this.recipeService.addIngrediantToShoppingList(this.recipe.ingrediants);
  }



  onEditMode() {
    this.router.navigate(['edit'], {relativeTo:this.route});
  }

  onDeleteRecipe() {
      this.recipeService.deleteRecipe(this.id);
      this.router.navigate(["../"], {relativeTo:this.route});
  }
}
