import { ServiceError } from 'src/shared/application/service.error';

export namespace UserErrors {
  export class UserNotFound extends ServiceError {
    constructor() {
      super('Usuário não encontrado');
    }
  }
}
