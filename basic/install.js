const fs = require('fs')

module.exports = ({ project }) => {
  const templateName = 'graphql-boilerplate'
  replaceInFile('src/index.js', templateName, project)
  replaceInFile('package.json', templateName, project)
  replaceInFile('graphcool.yml', templateName, project)

  console.log(`\
Next steps:

  1. Change directory: \`cd ${project}\`
  2. Deploy database service: \`graphcool deploy\`
  3. Replace __GRAPHCOOL_ENDPOINT__ and __SERVER_SECRET__ in src/index.js
  4. Start local server: \`yarn start\`
  5. Open Playground: http://localhost:4000
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
