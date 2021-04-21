import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from '@angular/forms';
// import { cloudinarUpload } from '../../../../firebase.config';  
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { map, finalize } from "rxjs/operators";
import { Observable } from "rxjs";
import { CrudRepositoryService } from 'src/app/_service/crud-repository.service';
declare var swal:any;
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import { Inject } from '@angular/core';
import { GetService } from 'src/app/_service/get.service';
import { PostService } from 'src/app/_service/post.service';
@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class EditCategoryComponent implements OnInit {
  url:any='';
categoryDetails:any={};
categoriesdataRef:any;
downloadURL: Observable<string>;
editImg;
key;
uploading =true;
showLoader=false;
spinner=false;
  constructor(private route: ActivatedRoute,  public router: Router,  public dialogRef: MatDialogRef<EditCategoryComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, public getService:GetService,public postService:PostService,
    public af: AngularFireDatabase, private afStorage:AngularFireStorage, private crudRepo: CrudRepositoryService
    ) {
  	 	 
  
  }
  ngOnInit(){
    // this.route.params.pipe(map(params => params['id'])).subscribe((key) => {
      if(this.data.key != null) {
        this.key = this.data.key;
        // this.getService.getProductsListById(this.data.key).subscribe(response=>{
        //   console.log(response);
        //   this.spinner=true;
        //   this.categoryDetails = response;
        // })
       this.crudRepo.getCategoryListByKey(this.key)
         .subscribe((response) => { 
             this.categoryDetails = response;
             this.spinner=true;
           },error=>{
            swal.fire('Error!','Something Went Wrong!');     
           })
         }
      // });
      // this.categoryDetails.thumb =''
  }

  readUrl(event) {
    this.showLoader =true;

  var n = Date.now();
  const file = event.target.files[0];
  const fileName =this.categoryDetails.title

  const filePath = `${fileName}/${n}`;
  const fileRef = this.afStorage.ref(filePath);
  const task = this.afStorage.upload(`${fileName}/${n}`, file);
  this.uploading =false;
  task
    .snapshotChanges()
    .pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.subscribe(url => {
          if (url) {
            this.editImg = url;
            this.showLoader =false;
            this.categoryDetails.image = url;

          }
          if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
          
          reader.onload = (event:any) => {
            // console.log(event.target.result)
            this.url = event.target.result;
            //this.imageRef = 1;
          }
          this.uploading =true;
        reader.readAsDataURL(event.target.files[0]);
        }
          // console.log(this.editImg);
        });
      })
    )
    .subscribe(url => {
      if (url) {
        // console.log(url);
      }
    });
  
}

    onSubmitCategory(ngForm:NgForm){
      delete this.categoryDetails.key;

     if(this.editImg !==undefined){
       this.categoryDetails.image= this.editImg;
      //  this.categoryDetails.image= this.editImg;
      //  this.postService.updateProduct(this.categoryDetails).subscribe(res=>{

      //   swal.fire({
      //         title: 'Categories Updated Successfully',
      //         confirmButtonText: `Ok`,
      //       }).then((result) => {
      //         /* Read more about isConfirmed, isDenied below */
      //         if (result.isConfirmed) {
      //           this.router.navigate(['']);
      //           this.dialogRef.close();
      //         } 
      //       })              
      //       },error=>{
      //         console.log(error)
      //         swal.fire('Something Went Wrong!'); 
      //       })
       this.crudRepo.update(this.key,this.categoryDetails,'categories').then(res=>{
       
         swal.fire({
          title: 'Categories Updated Successfully',
          confirmButtonText: `Ok`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.dialogRef.close();
          } 
        })              
        }).catch(err=>{
        console.log(err)
        swal.fire('Error!','Something Went Wrong!');               
      })
     } else{
      this.categoryDetails.image= this.categoryDetails.image;
      // this.postService.updateProduct(this.categoryDetails).subscribe(res=>{

      //  swal.fire({
      //        title: 'Categories Updated Successfully',
      //        confirmButtonText: `Ok`,
      //      }).then((result) => {
      //        /* Read more about isConfirmed, isDenied below */
      //        if (result.isConfirmed) {
      //          this.router.navigate(['']);
      //          this.dialogRef.close();
      //        } 
      //      })              
      //      },error=>{
      //        console.log(error)
      //        swal.fire('Something Went Wrong!'); 
      //      })
        this.categoryDetails.image= this.categoryDetails.image;
        this.crudRepo.update(this.key,this.categoryDetails,'categories').then(res=>{
          swal.fire({
            title: 'Inventory Updated Successfully',
            confirmButtonText: `Ok`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this.dialogRef.close();
            } 
          })      
        }).catch(err=>{
         console.log(err)
         swal.fire('Error!','Something Went Wrong!', 'Failed');               
       })
      
     }
  
    }
    
     cancel(){
      this.dialogRef.close();
       this.router.navigate(['']);
    }
}