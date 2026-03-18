import createApp from './app.ts'

const app = createApp()

const port = 4001

app.listen(port, () => {
  console.log('')
  console.log(`API server listening on http://localhost:${port}`)
  console.log(
    `The API response is available at http://localhost:${port}/api/services`,
  )
  console.log(`Dev settings API: http://localhost:${port}/api/__dev/settings`)
  console.log(
    'Modes can be toggled at runtime via the Settings UI or the dev settings API.',
  )
})
