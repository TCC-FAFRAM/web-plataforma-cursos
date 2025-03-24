import { inject, Injectable, signal, WritableSignal } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class LayoutService  {
  #activeSearchSignal = signal<boolean>(false)

  get getActiveSearch(): WritableSignal<boolean> {
        return this.#activeSearchSignal
    }
  
   setActiveSearchSignal(value: boolean) {
        this.#activeSearchSignal.set(value); 
    }
    
 
}
