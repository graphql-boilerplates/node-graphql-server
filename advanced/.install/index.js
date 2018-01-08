const fs = require('fs')
const {
  replaceInFiles,
  deploy,
  writeEnv,
  getInfo,
} = require('graphql-boilerplate-install')

module.exports = async ({ project }) => {
  const templateName = 'graphql-boilerplate'

  replaceInFiles(
    ['src/index.js', 'package.json', 'database/graphcool.yml'],
    templateName,
    project,
  )

  console.log('Running $ graphcool deploy...')
  await deploy(false)

  const info = await getInfo()
  const cluster = info.workspace ? `${info.workspace}/${info.cluster}` : info.cluster

  replaceInFiles(['.env'], '__GRAPHCOOL_ENDPOINT__', info.httpEndpoint)

  replaceInFiles(['.env'], `__GRAPHCOOL_CLUSTER__`, cluster)
  replaceInFiles(
    ['database/graphcool.yml'],
    `cluster: ${cluster}`,
    'cluster: ${env:GRAPHCOOL_CLUSTER}'
  )


  fs.appendFileSync('.gitignore', '.env*\n')

  console.log(`\
Next steps:
  1. Change directory: \`cd ${project}\`
  2. Start local server: \`yarn start\`
  3. Open Playground: \`yarn playground\`
`)
}
