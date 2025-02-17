interface IServiceError {
  message: string;
}

export abstract class ServiceError implements IServiceError {
  public readonly message: string;

  constructor(message: string) {
    this.message = message;
  }
}
