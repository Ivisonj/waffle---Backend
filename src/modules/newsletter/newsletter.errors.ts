import { ServiceError } from 'src/shared/application/service.error';

export namespace NewsletterErrors {
  export class NewsletterAlreadyRegistered extends ServiceError {
    constructor() {
      super('Newsletter já registrada');
    }
  }
}
