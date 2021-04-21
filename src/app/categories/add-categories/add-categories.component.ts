import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AngularFireDatabase } from '@angular/fire/database';
// import { CloudinaryUploader, CloudinaryOptions } from 'ng2-cloudinary';
import { AngularFireStorage } from '@angular/fire/storage';
import { map, finalize } from "rxjs/operators";
import { Observable } from "rxjs";
import { CrudRepositoryService } from 'src/app/_service/crud-repository.service';
import { MatDialogRef } from '@angular/material/dialog';
import { PostService } from 'src/app/_service/post.service';
declare var swal:any;
@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.scss']
})
export class AddCategoriesComponent  {
  uploading= true;
  url:any='';
  category:any={};
  categoryRef:any;
  imageId: string;
  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;
  // uploader: CloudinaryUploader = new CloudinaryUploader(
  //       new CloudinaryOptions(cloudinarUpload)
  //   );

    constructor(public af:AngularFireDatabase, public router:Router, public dialogRef: MatDialogRef<AddCategoriesComponent>,
      private afStorage: AngularFireStorage, private crudRepo:CrudRepositoryService,private postService:PostService
      ) {
    //  this.categoryRef = af.list('/categories');
        //Override onSuccessItem to retrieve the imageId
        //    this.uploader.onAfterAddingFile = (item: any) => {
        //     item.url = this.uploader.options.url;
        //     return item;
        // };
    }
    
    readUrl(event) {
      var n = Date.now();
    const file = event.target.files[0];
    const fileName =this.category.title

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
              this.fb = url;
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
            
          });
        })
      )
      .subscribe(url => {
        if (url) {
        }
      });
  }
     

    onSubmitCategory(form: NgForm){
     if(form.valid ===false){
      swal.fire('All fields are mandatory!');
     } else{
      if(this.fb){
        this.category.image = this.fb;
        // this.category.category ="men clothing";
        // this.postService.addNewProduct(this.category).subscribe(res=>{
        //   swal.fire('New inventory added successfully!');
        //   console.log('form',res);
        //   this.dialogRef.close();
        // },error=>{
        //   swal.fire('Something Went Wrong!');
        // })
        this.crudRepo.create('categories',this.category).then((res)=>{
            swal.fire('Inventory Added Successfully!');
            // this.router.navigate(['']);
            this.dialogRef.close();
          }).catch(re=>{
            console.log(re);
            swal.fire('Something Went Wrong!');

          });
      }
      else{
        swal.fire('Please Upload Image');

      }
     }
      
     
    }
    
     cancel(){
      this.dialogRef.close();
       this.router.navigate(['']);
    }
}

