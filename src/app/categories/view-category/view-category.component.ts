import { Component ,OnInit, Inject} from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CrudRepositoryService } from 'src/app/_service/crud-repository.service';
import { GetService } from 'src/app/_service/get.service';
declare var swal:any;

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.scss']
})
export class ViewCategoryComponent implements OnInit {

public categoryDetails:any={};
public catRef: AngularFireObject<any>;
public catObservable:Observable<any>;
  constructor(private route: ActivatedRoute,private crudRepo:CrudRepositoryService,
              public router: Router,public dialogRef: MatDialogRef<ViewCategoryComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
               public af: AngularFireDatabase,private getService:GetService) {
    //   this.route.params.map(params => params['id']).subscribe((Id) => {           
    //   if(Id != null) {
    //     this.catRef = this.af.object('/categories/' + Id);
    //     this.catObservable = this.catRef.valueChanges();
    //     this.catObservable.subscribe((response) => { 
    //         this.categoryDetails = response;           
    //     });
    //   }
    // });
  }

  ngOnInit(){
    
      if(this.data.key !== null) {
        // this.getService.getProductsListById(this.data.key).subscribe(response=>{
        //   console.log(response);
        //   // this.spinner=true;
        //   this.categoryDetails = response;
        // })
       this.crudRepo.getCategoryListByKey(this.data.key)
         .subscribe((response) => {
             this.categoryDetails = response;
           },error=>{
            swal.fire('Something Went Wrong!')
           })
         }
      // this.categoryDetails.thumb =''
  }

}