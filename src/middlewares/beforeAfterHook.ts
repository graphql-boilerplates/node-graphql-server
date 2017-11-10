export async function beforeAfterHook(input, resolve) {
  // do things before resolving
  const result = await resolve(input)
  // do things after resolving
  return result
}