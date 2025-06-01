import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-feedback',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl max-w-sm w-full p-6 relative animate-fadeIn"
        [ngClass]="{
          'border-green-500': type === 'success',
          'border-red-500': type === 'error'
        }"
      >
        <button
          class="absolute top-3 right-4 text-gray-400 hover:text-gray-600"
          (click)="close.emit()"
          aria-label="Fechar"
        >
          ×
        </button>
        <div class="flex flex-col items-center text-center">
          <div *ngIf="type === 'success'" class="mb-2">
            <span class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100">
              <svg class="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
            </span>
          </div>
          <div *ngIf="type === 'error'" class="mb-2">
            <span class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100">
              <svg class="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </span>
          </div>
          <h3 class="text-lg font-semibold mb-1" [ngClass]="{
            'text-green-700': type === 'success',
            'text-red-700': type === 'error'
          }">
            {{ title }}
          </h3>
          <p class="text-gray-600 dark:text-gray-300 mb-2">{{ message }}</p>
        </div>
        <button
          class="w-full bg-primary text-white py-2 rounded-lg mt-2 hover:bg-opacity-90 transition"
          (click)="close.emit()"
        >
          OK
        </button>
      </div>
    </div>
  `,
  styles: [`
    .animate-fadeIn {
      animation: fadeIn .15s cubic-bezier(.4,0,.2,1);
    }
    @keyframes fadeIn {
      from { transform: scale(.97) translateY(20px); opacity: 0; }
      to { transform: scale(1) translateY(0); opacity: 1; }
    }
  `]
})
export class ModalFeedbackComponent {
  @Input() type: 'success' | 'error' = 'success';
  @Input() title = '';
  @Input() message = '';
  @Output() close = new EventEmitter<void>();
}
