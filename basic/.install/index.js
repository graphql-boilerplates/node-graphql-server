const fs = require('fs')
var spawn = require('cross-spawn')
const { replaceInFiles, deploy, writeEnv } = require('graphql-boilerplate-install')

module.exports = async ({ project }) => {
  const templateName = 'graphql-boilerplate'

  replaceInFiles(['src/index.js','package.json','graphcool.yml'], templateName, project)

  await deploy(false)
  await writeEnv()

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
