const fs = require('fs')
const path = require('path')

module.exports = ({ project }) => {
  const templateName = 'graphql-boilerplate'
  console.log(__dirname, process.cwd(), project)
  replaceInFile('package.json', templateName, project)
  replaceInFile('graphcool.yml', templateName, project)
  replaceInFile('.env', templateName, project)
}

function replaceInFile(filePath, searchValue, replaceValue) {
  const contents = fs.readFileSync(path.join(__dirname, filePath), 'utf8')
  const newContents = contents.replace(searchValue, replaceValue)
  fs.writeFileSync(filePath, newContents)
}
