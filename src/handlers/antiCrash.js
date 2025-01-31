module.exports = (client) => {
  process.removeAllListeners()

  process.on('unhandledRejection', (reason, p) => {
    console.log(' [ANTICRASH] - unhandledRejection'.grey)
    console.log(reason, p + ''.grey)
  })
  process.on('uncaughtException', (err, origin) => {
    console.log(' [antiCrash] :: uncaughtException'.grey)
    console.log(err, origin + ''.grey)
  })
  process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.log(' [antiCrash] :: uncaughtExceptionMonitor'.grey)
    console.log(err, origin + ''.grey)
  })
  process.on('unhandledRejection', async (err) => {
    const channel = client.channels.cache.get('1066939283103039528')
    channel.send(`Error en consola!\n\`\`\`js\n${err}\`\`\``)
  })
  process.on('SIGINT', () => process.exit())
  process.on('SIGUSR1', () => process.exit())
  process.on('SIGUSR2', () => process.exit())
}
