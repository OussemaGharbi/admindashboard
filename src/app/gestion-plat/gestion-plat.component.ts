import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Category } from '../services/category.model';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {  Observable } from 'rxjs';
import {finalize }from 'rxjs/operators';
import { CategoryService } from '../services/category.service';
import { ViewChild,ElementRef } from '@angular/core';
import { ProductsService } from '../services/plat.service';

@Component({
  selector: 'app-gestion-plat',
  templateUrl: './gestion-plat.component.html',
  styleUrls: ['./gestion-plat.component.css']
})
export class GestionPlatComponent implements OnInit {

  public myform:FormGroup;
  plat ={} as any;
  list = {}as any ;
  listCat ={} as any ;
  item : any;
  cat = Category ;
  id:any;
  upid:any;

  myForm : FormGroup;
  editForm : FormGroup;

  filePath:String;
  downloadURL: Observable<string>;
  fb = '';
 

  constructor(public productservice : ProductsService, private storage: AngularFireStorage,
    
    public formBuilder:FormBuilder,public router:Router, public catS : CategoryService)
     {
      
    
   }
   
   
  ngOnInit(): void {
    this.productservice .getPlasList().subscribe((res) => {
      this.list = res;
      
      console.log("PLAT",this.list);
    
    });
    this.catS.getPlasList().subscribe((res) => {
      this.listCat = res;
    });
console.log("idzzzzzz",this.list.payload.doc.id)
  }

 
supprime (data ​)
{ if (confirm(' Are you sure you want to delete '+ data.payload.doc.data().Name +'?')) 

{ this.productservice.supprimeProduit(data);
}
}
Updatarecord(recorddata)
{
  console.log('id',this.upid);

  let record = {
  name : recorddata.name,
  price: recorddata.price,
  image: recorddata.image,
  category: recorddata.categorie,
  }

  console.log('id',record);

  
  this.productservice.updateUser(this.upid, record);
 
}
@ViewChild('myInput')
myInputVariable:ElementRef;

 
  onSubmit() {  
  this.storage.upload('/images'+this.filePath, this.filePath);
  this.plat.image=this.fb;
   this.productservice.productsAdd(this.plat);
   






  
     alert("product added successfully");
       
        //alert('SUCCESS!!');   
      
       // this.plat.id=this.plat.payload.doc.id;
        
}


onFileSelected(event: any) {
   
  var n = Date.now();
  this.filePath = event.target.files[0]
  const file = event.target.files[0];
  const filePath = `ProduitImage/${n}`;
  const fileRef = this.storage.ref(filePath);
  const task = this.storage.upload(`ProduitImage/${n}`, file);
  task
    .snapshotChanges()
    .pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.subscribe((url) => {
          if (url) {
            this.fb = url;
          }
          console.log(this.fb);
        });
      })
    )
    .subscribe((url) => {
      if (url) {
        console.log(url);
      }
    });
}

getId(id:any){
  this.upid=id;
  
}
}
