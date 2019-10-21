import { Component, OnInit, ViewChild, Input, ElementRef, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shoppingList.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
 
  @ViewChild('f', {static:false}) slForm:NgForm;
  subscription:Subscription;
  editingMode = false;
  ingrediantForEditing:Ingredient;
  ingrediantIndex:number;
 
  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe( (index: number) => {
      this.editingMode = true;
      this.ingrediantIndex = index;
      this.ingrediantForEditing = this.shoppingListService.getIngrediant(index);
      this.slForm.setValue({
        
        'name' : this.ingrediantForEditing.name,
        'amount' : this.ingrediantForEditing.amount 
      })
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onAddIngrediant(form:NgForm) {
   const values = form.value;
  const ingrediant = new Ingredient(values.name, values.amount);

  if(this.editingMode) {
    this.shoppingListService.updateIngrediant(this.ingrediantIndex, ingrediant);
  } else {
    this.shoppingListService.addIngrediant(ingrediant);
  }
  
      this.slForm.reset(); 
    this.editingMode = false;
  }


  deleteItem() {
    this.shoppingListService.deleteIngrediant(this.ingrediantIndex);
    this.onClear();
  }

  onClear() {
   
    this.slForm.reset();
    this.editingMode = false;
  }
}
