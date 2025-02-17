import { ServiceError } from 'src/shared/application/service.error';

export namespace UserErrors {
  export class UserAccountAlreadyExistsError extends ServiceError {
    constructor() {
      super('Usuário já existe');
    }
  }
}
