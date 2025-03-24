export class Page<T> {
  constructor(
    public content: T,
    public totalElements: number = 0
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromResponse<T>(response: any) {
    return new Page<T>(response.body, response.body?.totalElements);
  }
}
