export const dbOk = <T, E>(value: T, status: number): DatabaseResult<T, E> => ({
  isError: false,
  status,
  value,
})

export const dbErr = <T, E>(err: E, status: number): DatabaseResult<T, E> => ({
  isError: true,
  error: err,
  status,
})
