import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './registro.component.html'
})
export class RegistroComponent implements OnInit {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);

  msg = '';
  loading = false;

  form = this.fb.group({
    nombre: ['', Validators.required],
    apellidos: ['', Validators.required],
    celular: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
    correo: ['', [Validators.required, Validators.email]],
    token: ['', Validators.required]
  });

  ngOnInit(): void {
    this.api.getToken().subscribe({
      next: (res) => this.form.patchValue({ token: res.token }),
      error: () => this.msg = 'No se pudo obtener token'
    });
  }

  registrar() {
    if (this.form.invalid) {
      this.msg = 'Complete todos los campos correctamente';
      return;
    }

    this.loading = true;

    this.api.registrarCliente(this.form.value).subscribe({
      next: () => {
        this.msg = 'Cliente registrado correctamente ✅';
        this.loading = false;
      },
      error: () => {
        this.msg = 'Error al registrar cliente ❌';
        this.loading = false;
      }
    });
  }
}
