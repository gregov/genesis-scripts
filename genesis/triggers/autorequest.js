Name: autorequest
Type: regexp
Pattern: ^([a-zA-Z-]+) .*(male|female) (human|elf|half-elf|minotaur|ogre|dwarf|hobbit|gnome|goblin)\.$

Execute the following javascript:
if(gwc.userdata.request == true && args[1] != "You"){
    gwc.connection.send("request " + args[1]);
    gwc.connection.send("remember " + args[1]);
  }
