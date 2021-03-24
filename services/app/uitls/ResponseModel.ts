class ResponseModel {
  data: any;
  code: number;
  message: string;

  constructor(data: any, code: number, message: string) {
    this.data = data;
    this.code = code;
    this.message = message;
  }
}

export class ErrorResponse extends ResponseModel {
  constructor(code: number, message: string, error?: any) {
    if (error) {
      super(error, code, message);
    } else {
      super(null, code, message);
    }
  }
}

export class SuccessResponse extends ResponseModel {
  constructor(data) {
    super(data, 200, 'ok');
  }
}
