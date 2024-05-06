import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { EMPTY } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { ProductsService } from '../products.service';
import { LoaderService, ToastService } from 'src/app/services';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent {

  public productForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private productsService: ProductsService, private toastService: ToastService, private loaderService: LoaderService) {
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
      date_revision: [{ value: '', disabled: true }, Validators.required]
    });
  }

  dateReleaseValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const selectedDate = new Date(control.value);
      selectedDate.setDate(selectedDate.getDate() + 1);

      const currentDate = new Date();

      if (selectedDate < currentDate) {
        return { 'invalidDateRelease': { value: control.value } };
      }
      return null;
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

  verifyIdAndCreateProduct() {
    this.loaderService.show();
    const idToCheck = this.productForm.controls['id'].value;

    this.productsService.verifyId(idToCheck).pipe(
      switchMap((isIdAvailable: boolean) => {
        if (isIdAvailable) {
          this.loaderService.hide();
          this.toastService.addToast({ type: 'warning', message: 'El id ingresado no está disponible. Por favor, ingrese uno diferente.' });
          return EMPTY;
        } else {
          return this.productsService.createProduct(this.productForm.getRawValue());
        }
      }),
      tap(data => {
        this.loaderService.hide();
        if (!data) {
          this.toastService.addToast({ type: 'error', message: 'Se ha producido un error al crear el producto.' });
        } else {
          this.toastService.addToast({ type: 'success', message: 'El producto ha sido creado con éxito.' });
          this.productForm.reset();
        }
      })
    ).subscribe();
  }

}
