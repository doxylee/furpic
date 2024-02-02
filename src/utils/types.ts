export type Awaited<T> = T extends Promise<infer U> ? U : T;
export type AwaitedReturnType<T extends (...args: any[]) => any> = Awaited<
  ReturnType<T>
>;
