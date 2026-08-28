export abstract class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class ServerError extends ApiError {}

export class DecodingError extends ApiError {}

export class NetworkError extends ApiError {}
