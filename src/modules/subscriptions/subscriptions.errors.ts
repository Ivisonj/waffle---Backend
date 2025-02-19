import { ServiceError } from 'src/shared/application/service.error';

export namespace SubscriptionsErrors {
  export class Error extends ServiceError {
    constructor() {
      super('Error');
    }
  }
}
