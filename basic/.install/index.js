const fs = require('fs')
const {
  replaceInFiles,
  deploy,
  writeEnv,
  getInfo,
} = require('graphql-boilerplate-install')

module.exports = async ({ project, projectDir }) => {
  const templateName = 'graphql-boilerplate'

  replaceInFiles(
    ['src/index.js', 'package.json', 'database/graphcool.yml'],
    templateName,
    project,
  )

  console.log('Running $ graphcool deploy...')
  await deploy(false)
  const info = await getInfo()

  replaceInFiles(['src/index.js'], '__GRAPHCOOL_ENDPOINT__', info.httpEndpoint)

  console.log(`\
Next steps:
  1. Change directory: \`cd ${projectDir}\`
  2. Start local server: \`yarn start\`
  3. Open Playground: http://localhost:4000
`)
}
