import { Component,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Router, ActivatedRoute } from "@angular/router";
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { CrudRepositoryService } from '../_service/crud-repository.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCategoriesComponent } from './add-categories/add-categories.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { ViewCategoryComponent } from './view-category/view-category.component';
import { GetService } from '../_service/get.service';
// const swal = require('sweetalert');
declare var swal:any;
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

public siteVal:any;
categories;
spinner=false;
public categoryData: Observable<any>;

    constructor(public af:AngularFirestore,public dialog: MatDialog,
                public router:Router, private crudRepo: CrudRepositoryService,
                public getService:GetService
                ) {

    // this.catRef= this.af.list('/categories');
   

    // this.getCategory();
  }
    
ngOnInit(){
  this.crudRepo.getCategoryList().subscribe((res)=>{     
    this.categories = res;
   },error=>{
    swal('Oops', 'Something Went Wrong', 'error');
  });
  this.getService.getProductsList().subscribe(res=>{
    this.spinner=true;
    console.log(res)
  })
}

addNewCategory(){
  const dialogRef = this.dialog.open(AddCategoriesComponent, {
    width: '1050px',
    // backdropClass: 'custom-dialog-backdrop-class',
    // panelClass: 'custom-dialog-panel-class',
    // data: { pageValue: '' }
  });

  dialogRef.afterClosed().subscribe(result => {
    // this.dialogValue = result.data;
  });
}

   categoryShow(key){
    const dialogRef = this.dialog.open(ViewCategoryComponent, {
      width: '1050px',
      // backdropClass: 'custom-dialog-backdrop-class',
      // panelClass: 'custom-dialog-panel-class',
      data: { key: key }    
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // this.dialogValue = result.data;
    });
  }
  
   categoryEdit(key){
    const dialogRef = this.dialog.open(EditCategoryComponent, {
      width: '1050px',
      // backdropClass: 'custom-dialog-backdrop-class',
      // panelClass: 'custom-dialog-panel-class',
      data: { key: key }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // this.dialogValue = result.data;this.router.navigate(['categories/editCategory', key]);
    });    
  }

categoryDelete(key:any){
   swal.fire({
            title: 'Are you sure?',
            text: 'Your will not be able to recover the date!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            closeOnConfirm: false,
            closeOnCancel: false
        }).then((isConfirm) => {
            if (isConfirm) {
              this.af.collection('categories').doc(key).delete().then(resp=>{
                swal.fire('Deleted!','Inventory Deleted Successfully!', 'success');               
              })               
              } else {
                swal.fire('Cancelled', 'Your data is safe :)', 'error');
            }
        });
  }


}
