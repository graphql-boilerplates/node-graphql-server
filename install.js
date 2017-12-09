const fs = require('fs')

module.exports = ({ project }) => {
  const templateName = 'graphql-boilerplate'
  replaceInFile('package.json', templateName, project)
  replaceInFile('graphcool.yml', templateName, project)
  replaceInFile('.env', templateName, project)
}

function replaceInFile(filePath, searchValue, replaceValue) {
  const contents = fs.readFileSync(filePath, { encoding: 'utf8' })
  contents.replace(searchValue, replaceValue)
  fs.writeFileSync(filePath, contents)
}
