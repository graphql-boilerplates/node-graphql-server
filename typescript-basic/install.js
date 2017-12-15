const fs = require('fs')

module.exports = ({ project }) => {
  const templateName = 'graphql-boilerplate'
  replaceInFile('package.json', templateName, project)
  replaceInFile('graphcool.yml', templateName, project)
  replaceInFile('.env', templateName, project)

  console.log(`\
Next steps:

  1. Change directory: \`cd ${project}\`
  2. Deploy database service: \`graphcool deploy\`
  3. Start local server: \`yarn start\`
  4. Open Playground: \`yarn playground\`
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
