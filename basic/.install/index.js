const fs = require('fs')
var spawn = require('cross-spawn')

module.exports = async ({ project }) => {
  const templateName = 'graphql-boilerplate'

  replaceInFile('src/index.js', templateName, project)
  replaceInFile('package.json', templateName, project)
  replaceInFile('graphcool.yml', templateName, project)

  spawn.sync('./node_modules/.bin/graphcool', ['deploy'], { stdio: 'inherit'})

  console.log(`\
Next steps:

  1. Change directory: \`cd ${project}\`
  2. Start local server: \`yarn start\`
  3. Open Playground: http://localhost:4000
  `)
}

function replaceInFile(filePath, searchValue, replaceValue) {
  const contents = fs.readFileSync(filePath, 'utf8')
  const newContents = contents.replace(
    new RegExp(searchValue, 'g'),
    replaceValue,
  )
  fs.writeFileSync(filePath, newContents)
}

run()