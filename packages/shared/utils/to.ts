/**
 * 更简洁的方式使用promise
 * @param promise
 * @return 返回[错误, 数据]
 */
export function to<T, U = Error>(
  promise: Promise<T>,
): Promise<[U, undefined] | [null, T]> {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, undefined]>((err: U) => {
      return [err, undefined];
    });
}
