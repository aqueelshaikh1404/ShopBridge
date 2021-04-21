import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorageModule } from "@angular/fire/storage";
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCategoriesComponent } from './categories/add-categories/add-categories.component';
import { CategoriesComponent } from './categories/categories.component';
import { EditCategoryComponent } from './categories/edit-category/edit-category.component';
import { ViewCategoryComponent } from './categories/view-category/view-category.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { Configuration } from 'src/assets/config';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    AddCategoriesComponent,
    EditCategoryComponent,
    ViewCategoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment), 
    MatDialogModule,
    // AngularFireModule.initializeApp(firebaseConfigTwo),
    AngularFireDatabaseModule, 
    AngularFireAuthModule,
    AngularFireStorageModule,
    HttpClientModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule
  ],
  providers: [AngularFirestore,Configuration],
  bootstrap: [AppComponent]
})
export class AppModule { }
