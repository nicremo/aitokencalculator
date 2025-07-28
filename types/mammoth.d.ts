declare module 'mammoth' {
  export interface Result<T> {
    value: T;
    messages: Message[];
  }

  export interface Message {
    type: string;
    message: string;
  }

  export interface Options {
    arrayBuffer?: ArrayBuffer;
    path?: string;
  }

  export function extractRawText(options: Options): Promise<Result<string>>;
  export function convertToHtml(options: Options): Promise<Result<string>>;
}