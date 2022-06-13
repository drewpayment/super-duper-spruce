
export interface HttpError extends Error {
  status: number;
}

export interface IOpResult<T = unknown> {
  data: T;
  error?: HttpError;
}

export class OpResult<T = unknown> implements IOpResult {
  private _data: T;
  get data(): T {
    return this._data;
  }
  private _error?: HttpError;
  get error(): HttpError {
    return this._error;
  }
  get hasError(): boolean {
    return this.status === OpResultStatusType.fail;
  }
  get isOk(): boolean {
    return this.status === OpResultStatusType.success;
  }

  private status: OpResultStatusType = OpResultStatusType.success;

  constructor(data?: T) {
    if (data != null) this._data = data;
  }

  setData(data: T): OpResult<T> {
    this._data = data;
    this.setStatus(this._data !== null);
    return this;
  }

  setStatus(isSuccess: boolean): OpResult<T> {
    this.status = isSuccess ? OpResultStatusType.success : OpResultStatusType.fail;
    return this;
  }

  setError(message: string): OpResult<T> {
    this._error = {
      name: 'BadRequest',
      message,
      status: 400,
    };
    return this;
  }

  setServerError(message: string): OpResult<T> {
    this._error = {
      name: 'ServerError',
      message,
      status: 500,
    };
    return this;
  }

  setCustomError(e: HttpError): OpResult<T> {
    this._error = e;
    return this;
  }
}

enum OpResultStatusType {
  success,
  fail,
}
