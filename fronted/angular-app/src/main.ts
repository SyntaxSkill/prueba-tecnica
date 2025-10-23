import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // Necesario para las llamadas HTTP
    provideRouter(routes), // Configuración de rutas
    provideAnimations(), // Opcional: si usas animaciones
  ],
}).catch((err) => console.error('Error al iniciar la aplicación:', err));
