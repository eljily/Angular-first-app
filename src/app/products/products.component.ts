import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product} from "../Model/product.model";
import {FormBuilder, FormGroup, ValidationErrors} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

products : Array<Product> | undefined;
currentPage : number = 0;
pageSize : number = 5;
totalPages : number = 0 ;
errMessage! : String;
searchFormGroup! : FormGroup;
currentAction : string = "all" ;

constructor(private productService:ProductService,private fb:FormBuilder,
            public authService:AuthenticationService,private router :Router){}
ngOnInit() : void {
  this.searchFormGroup=this.fb.group(
    {
      keyword :this.fb.control(null)
    }
  )
this.handleGetPageProducts();
}

  handleGetPageProducts(){
    this.productService.getPageProducts(this.currentPage,this.pageSize).subscribe({
      next : (data)=>{
        this.products = data.products;
        this.totalPages = data.totalPages;
        console.log(this.totalPages);
      },
      error : (err) =>{
        this.errMessage = err ;
      }
    });
  }

handleGetAllProducts(){
  this.productService.getAllProducts().subscribe({
    next : (data)=>{
      this.products = data;
    },
    error : (err) =>{
      this.errMessage = err ;
    }
  });
}
handleDeleteProduct(p:Product){
  let conf = confirm("Are u sure ??");
  if (!conf) return;
  this.productService.deleteProduct(p.id).subscribe({
    next :(data)=>{
      let index = this.products?.indexOf(p);
      // @ts-ignore
      this.products.splice(index,1);
    }
  });
}

  handleSetPromotion(p: Product) {
  let promo = p.promotion;
  this.productService.setPromotion(p.id).subscribe(
    {
      next :(data)=>{
        p.promotion=!promo;
      },
      error :
      err =>{
        this.errMessage = err;
      }
    }
  )

  }

  handleSearchProducts() {
  this.currentAction = "search";
  let keyword = this.searchFormGroup.value.keyword;
  this.productService.searchProduct(keyword,this.currentPage,this.pageSize).subscribe(
    {
      next : (data)=>{
        this.products=data.products;
        this.totalPages = data.totalPages;
      }
    }
  )
  }

    gotoPage(i: number) {
  this.currentPage = i;
  if (this.currentAction == "all"){
    this.handleGetPageProducts();
  }
  else this.handleSearchProducts();

    }

  handleNewProduct() {
  this.router.navigateByUrl("admin/newProduct");

  }

  handleEditProduct(p: Product) {
  this.router.navigateByUrl("/admin/editProduct/"+p.id);


  }

}
