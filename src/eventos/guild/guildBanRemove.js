module.exports = (guild, user) => {
  // verificamos si nuestro bot tiene permisos de ver el log de auditoria de un servidor
 if(!guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;

 // Solicitamos los datos del logs de la auditoria registrado en un servidor
 guild.fetchAuditLogs().then(logs => { 
  // Obtenemos el id de usuario autor del log
  let userID = logs.entries.first().executor.id;
  // Obtenemos el avatar de usuario autor del log
  let userAvatar = logs.entries.first().executor.avatarURL();

  // Verificamos si el autor de la acción no sea un bot
  if(userID === client.user.id) return;

  let msgChannel = new Discord.MessageEmbed()
    .setTitle('**[USUARIO DESBLOQUEADO]**')
    .setColor('RED')
    .setThumbnail(userAvatar)
    .setDescription(`**Usuario desbloqueado correctamente**\nUsuario desbloqueado/desbaneado: <@${user.id}> (ID: ${user.id})\nPor: <@${userID}> (ID: ${userID})`)
    .setTimestamp()
    .setFooter(guild.name, guild.iconURL())
    
    // Enviamos el mensaje a un canal segun el ID-CANAL
    let channel = client.channels.cache.get('1072034594485960715');
    channel.send(msgChannel);
  
 })
}