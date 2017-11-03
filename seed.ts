import { GraphQLClient } from 'graphql-request'

const client = new GraphQLClient(process.env.GRAPHQL_ENDPOINT!)
const users = {
  elon: {
    id: '',
    name: 'Elon Musk',
    email: 'elon@spacex.com',
    password: 'falcon',
  },
  mark: {
    id: '',
    name: 'Mark Zuckerberg',
    email: 'zuck@fb.com',
    password: 'breakthings',
  },
  tim: {
    id: '',
    name: 'Tim Cook',
    email: 'tim@apple.com',
    password: 'iphone',
  },
}

async function run() {
  console.log('Creating users')
  const createUserMutation = `mutation newUser(
    $name: String!
    $email: String!
    $password: String!
  ) {
    c: createUser(
      name: $name
      email: $email
      password: $password
    ) {
      id
    }
  }`
  users.elon.id = await client.request<any>(createUserMutation, users.elon).then(r => r.c.id)
  users.mark.id = await client.request<any>(createUserMutation, users.mark).then(r => r.c.id)
  users.tim.id = await client.request<any>(createUserMutation, users.tim).then(r => r.c.id)

  console.log('Creating posts & comments')
  const posts = [{
    title: 'Hospital del Niño (Children’s Hospital) is the first of many solar+battery Tesla projects going live in Puerto Rico.',
    authorId: users.elon.id,
    comments: [{
      text: 'Nice job, Elon!',
      authorId: users.tim.id,
    }, {
      text: 'Awesome!',
      authorId: users.mark.id,
    }]
  }, {
    title: 'Rick (((and Morty))) crew at SpaceX!!',
    authorId: users.elon.id,
    comments: [{
      text: 'Simulation theory confirmed!',
      authorId: users.mark.id,
    }],
  }, {
    title: `Today we're celebrating Javier Olivan's 10 year anniversary of joining Facebook!`,
    authorId: users.mark.id,
  }]
  const createPostMutation = `mutation newPost(
    $title: String!
    $authorId: ID!
    $comments: [PostcommentsComment!]
  ) {
    c: createPost(
      title: $title
      authorId: $authorId
      comments: $comments
    ) {
      id
    }
  }`
  await Promise.all(posts.map(p => client.request(createPostMutation, p)))
}

run().catch(console.error.bind(console))
