import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<any[]>([]);
  toasts$ = this.toastsSubject.asObservable();

  constructor() { }

  addToast(toast: any) {
    const currentToasts = this.toastsSubject.getValue();
    const updatedToasts = [...currentToasts, toast];
    this.toastsSubject.next(updatedToasts);
  }

  clearToasts() {
    this.toastsSubject.next([]);
  }
}
