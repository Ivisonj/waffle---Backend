import { ServiceError } from 'src/shared/application/service.error';

export namespace UserErrors {
  export class Unauthorized extends ServiceError {
    constructor() {
      super('Não autorizado');
    }
  }
}
