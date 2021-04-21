import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { AddCategoriesComponent } from './categories/add-categories/add-categories.component';
import { EditCategoryComponent } from './categories/edit-category/edit-category.component';
import { ViewCategoryComponent } from './categories/view-category/view-category.component';

const routes: Routes = [
  {
    path: '',component:CategoriesComponent
  },
  {
    path: 'categories',component:CategoriesComponent
  },
  {
    path: 'categories/addCategory',component:AddCategoriesComponent
  },
  {
    path: 'categories/editCategory/:id',component:EditCategoryComponent
  },
  {
    path: 'categories/viewCategory:id',component:ViewCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
