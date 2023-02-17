module.exports = async (role) => {
  // Verificamos si nuestro bot tiene permisos de ver el log de auditoria de un servidor
 if(!role.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;

 // Solicitamos los datos del logs de la auditoria registrado en un servidor
 role.guild.fetchAuditLogs().then(logs => { 
  // Obtenemos el id de usuario autor del log
  let userID = logs.entries.first().executor.id;
  // Obtenemos el avatar de usuario autor del log
  let userAvatar = logs.entries.first().executor.avatarURL();

  // Verificamos que se haya actualizado el nombre de un rol
  let msgChannel = new Discord.MessageEmbed()
    .setTitle('**[ROL CREADO]**')
    .setColor('RED')
    .setThumbnail(userAvatar)
    .setDescription(`**Rol creado**\nRol: ${role.name} (ID: ${role.id})\nPor: <@${userID}> (ID: ${userID})`)
    .setTimestamp()
    .setFooter(role.guild.name, role.guild.iconURL())
      
    // Enviamos el mensaje a un canal segun el ID-CANAL
    let channel = client.channels.cache.get('1072034594485960715');
    channel.send(msgChannel);
   
 })
}