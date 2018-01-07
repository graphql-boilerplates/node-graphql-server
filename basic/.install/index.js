const fs = require('fs')
var spawn = require('cross-spawn')

module.exports = async ({ project }) => {
  const templateName = 'graphql-boilerplate'

  replaceInFile('src/index.js', templateName, project)
  replaceInFile('package.json', templateName, project)
  replaceInFile('graphcool.yml', templateName, project)

  spawn.sync('.install/node_modules/.bin/graphcool', ['deploy'], { stdio: 'inherit'})
  const info = spawn('.install/node_modules/.bin/graphcool', ['info', '--current', '--json'], { stdio: [0, 'pipe', 2]})
  var stdout = ''
  info.stdout.on('data', function(buf) { stdout += buf })
  info.on('close', function() {
    console.log(stdout)
    const endpointInfo = JSON.parse(stdout)
    fs.writeFileSync('.env', `GRAPHCOOL_SECRET=mysecret123
GRAPHCOOL_STAGE=${endpointInfo.stage}
GRAPHCOOL_CLUSTER=${endpointInfo.cluster}
GRAPHCOOL_ENDPOINT=${endpointInfo.httpEndpoint}`)

    console.log(`\
Next steps:

  1. Change directory: \`cd ${project}\`
  2. Start local server: \`yarn start\`
  3. Open Playground: http://localhost:4000
`
    )
   });
}

function replaceInFile(filePath, searchValue, replaceValue) {
  const contents = fs.readFileSync(filePath, 'utf8')
  const newContents = contents.replace(
    new RegExp(searchValue, 'g'),
    replaceValue,
  )
  fs.writeFileSync(filePath, newContents)
}
