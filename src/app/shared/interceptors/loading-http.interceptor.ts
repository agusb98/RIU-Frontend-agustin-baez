import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { ConfigService } from '../services/config.service';

// Variable para contar las solicitudes activas
let activeRequests = 0;

export function LoadingHttpInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
) {
  const configSrv = inject(ConfigService);

  // Incrementar contador y mostrar spinner
  activeRequests++;
  configSrv.setLoading(true);

  return next(request).pipe(
    finalize(() => {
      // Decrementar contador
      activeRequests--;

      // Solo ocultar el spinner cuando no hay solicitudes pendientes
      if (activeRequests === 0) {
        configSrv.setLoading(false);
      }
    }),
  );
}
