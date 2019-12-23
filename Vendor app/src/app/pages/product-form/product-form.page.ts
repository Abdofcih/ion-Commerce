import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { Product } from 'src/app/models/product';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.page.html',
  styleUrls: ['./product-form.page.scss'],
})
export class ProductFormPage implements OnInit,OnDestroy {
  categoriesObs;
  subscribe:Subscription;
  product :Product =  {
    title: '',
    description:'',
    cat:'',
    price: 0,
    quantity:0,
    key:'',
    imgUrl: ''
  }; 
  id;
  imageResponse: any;
  options: any;
  constructor(
    private imagePicker: ImagePicker,
    private categoriesService: CategoryService, 
    private productService: ProductService,
    private router: Router, 
    private route: ActivatedRoute,
    public Auth:AuthService,
    public alertController: AlertController) { 
    this.categoriesObs = categoriesService.getCategories()
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.subscribe = this.productService.get(this.id).subscribe((p:Product) => {this.product = p; });
      
    }
  }

  ngOnInit() {

  }
  pickImage(){
    this.options = {
      width: 200,
      quality: 25,
      outputType: 1,
    }
    this.imagePicker.getPictures(this.options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.imageResponse.push('data:image/jpeg;base64,' + results[i]);
          console.log('Image URI: ' + results[i]);
      }
    }, (err) => { });
  }

  onSubmit(product){
     this.Auth.userObs.subscribe(user=>product['userId'] = user.uid)
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);
    this.router.navigate(['/products']);
  }
  async delete() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you sure to <strong>Delete</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            return;
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.productService.delete(this.id);
            this.router.navigate(['/products']);
          }
        }
      ]
    });

    await alert.present();
  }
 
ngOnDestroy(){
  if (this.id) {
    this.subscribe.unsubscribe() 
  }
 
}
}
