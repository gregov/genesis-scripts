Name: loot
Type: plain
Pattern: You killed

Execute the following javascript:
if(gwc.userdata.loot)
      gwc.connection.send('get all from corpse');
  gwc.connection.send('look');