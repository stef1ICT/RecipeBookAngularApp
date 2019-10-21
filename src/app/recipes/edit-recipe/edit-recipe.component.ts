import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {


  id:number;
  recipeForm:FormGroup;
  editMode = false;
  constructor(private route:ActivatedRoute, private recipeService:RecipeService, private router:Router) { }

  ngOnInit() {

    this.route.params.subscribe((params:Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.init();
         
    })



  }


  onSubmit() {
    

    if(this.editMode) {
        this.recipeService.updateRecipe(this.id,this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }

    this.onCancel();
  }

  onAddIngrediant() {
    (<FormArray>this.recipeForm.get('ingrediants')).push(new FormGroup({
      'name' : new FormControl('', Validators.required),
      'amount' : new FormControl('', [
        Validators.required,
        Validators.pattern(/^[1-9][0-9]*$/)
      ])
    }));
  }

  private init() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngrediants = new FormArray([]);
    if(this.editMode) {

      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

          if(recipe['ingrediants']) {
            for(let ingrediant of recipe.ingrediants) {
              recipeIngrediants.push(new FormGroup({
                'name' : new FormControl(ingrediant.name, Validators.required),
                'amount' : new FormControl(ingrediant.amount, [
                  Validators.required,
                  Validators.pattern(/^[1-9][0-9]*$/)
                ])
              }))
            }
          }
           

     
    }
    this.recipeForm = new FormGroup({
      'recipeName' : new FormControl(recipeName, Validators.required),
      'imagePath' : new FormControl(recipeImagePath, Validators.required),
      'description' : new FormControl(recipeDescription, Validators.required),
      'ingrediants' : recipeIngrediants
    });
    
  }

  onDeleteIngrediant(index) {
    (<FormArray>this.recipeForm.get('ingrediants')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(["../"], {relativeTo:this.route});
  }

}
