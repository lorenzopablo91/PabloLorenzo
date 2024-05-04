import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent {

  public productForm: FormGroup = new FormGroup({

  });

  constructor(private fb: FormBuilder, private productsService: ProductsService) {
    this.inicializarFormulario();
  }

  get id() { return this.productForm.get('id'); }
  get name() { return this.productForm.get('name'); }
  get description() { return this.productForm.get('description'); }
  get logo() { return this.productForm.get('logo'); }
  get date_release() { return this.productForm.get('date_release'); }
  get date_revision() { return this.productForm.get('date_revision'); }


  inicializarFormulario() {
    this.productForm = this.fb.group({
      id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', Validators.required],
      date_release: ['', [Validators.required, this.dateReleaseValidator()]],
      date_revision: [{ value: '', disabled: true }, [Validators.required, this.dateRevisionValidator()]]
    });
  }

  dateReleaseValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const selectedDate = new Date(control.value);
      const currentDate = new Date();
      if (selectedDate < currentDate) {
        return { 'invalidDateRelease': { value: control.value } };
      }
      return null;
    };
  }

  dateRevisionValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const releaseDate = new Date(control.parent?.get('date_release')?.value);
      const revisionDate = new Date(control.value);

      // Creamos una nueva fecha para la fecha de lanzamiento más un año
      const oneYearLater = new Date(releaseDate);
      oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);

      // Comparamos los años, meses y días de las fechas
      if (
        revisionDate.getFullYear() === oneYearLater.getFullYear() &&
        revisionDate.getMonth() === oneYearLater.getMonth() &&
        revisionDate.getDate() === oneYearLater.getDate()
      ) {
        // Si la fecha de revisión es exactamente un año después de la fecha de lanzamiento, retornamos null (no hay error)
        return null;
      } else {
        // Si la fecha de revisión no cumple con la condición, retornamos el error
        return { 'invalidDateRevision': { value: control.value } };
      }
    };
  }

  updateRevisionDate() {
    const releaseDateValue = this.productForm.get('date_release')?.value;
    if (releaseDateValue) {
      const releaseDate = new Date(releaseDateValue);
      const oneYearLater = new Date(releaseDate);
      oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
      this.productForm.get('date_revision')?.setValue(oneYearLater.toISOString().split('T')[0]);
    }
  }
  
    createProduct() {
      const idToCheck = this.productForm.controls['id'].value;
  
      forkJoin([
        this.productsService.verifyId(idToCheck),
        this.productsService.createProduct(this.productForm.getRawValue())
      ]).subscribe(([idAvailable, productCreated]) => {
        if (!idAvailable) {
          console.log('El ID ya existe, no se puede crear el producto.');
        } else {
          console.log('Producto creado exitosamente:', productCreated);
        }
      }, error => {
        console.error('Error al crear el producto:', error);
      });
    }

}
