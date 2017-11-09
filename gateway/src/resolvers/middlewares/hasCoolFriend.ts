import { checkPermission, getUserId } from '../../util'

export const hasCoolFriend = name => async ({context, mergeInfo, parent, args, info}, resolve) => {
  const userId = getUserId(context)
  const hasFriend = await checkPermission(`{
    SomeUserExists(filter: {
      id: "${userId}"
      friends_some: {
        name: "${name}"
      }
    })
  }`)

  if (!hasFriend) {
    throw new NoCoolFriendError(name)
  }

  return resolve({context, mergeInfo, parent, args, info})
}

class NoCoolFriendError extends Error {
  constructor(name: string) {
    super(`You dont have a cool friend called ${name}`)
  }
}
