const fs = require('fs')
var spawn = require('cross-spawn')
const { replaceInFiles, deploy, writeEnv } = require('graphql-boilerplate-install')

module.exports = async ({ project }) => {
  const templateName = 'graphql-boilerplate'

  replaceInFiles(['src/index.js','package.json','graphcool.yml'], templateName, project)

  console.log('Running $ graphcool deploy...')
  await deploy(false)
  const info = await getInfo()
  replaceInFile('src/index.js','__GRAPHCOOL_ENDPOINT__', info.httpEndpoint)
  replaceInFile('src/index.js','__GRAPHCOOL_SECRET__', info.secret)

  console.log(`\
Next steps:

  1. Change directory: \`cd ${project}\`
  2. Start local server: \`yarn start\`
  3. Open Playground: http://localhost:4000
`
  )
}

function replaceInFile(filePath, searchValue, replaceValue) {
  const contents = fs.readFileSync(filePath, 'utf8')
  const newContents = contents.replace(
    new RegExp(searchValue, 'g'),
    replaceValue,
  )
  fs.writeFileSync(filePath, newContents)
}
