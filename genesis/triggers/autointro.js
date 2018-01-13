Name: autointro
Type: regexp
Pattern: (human|elf|half-elf|minotaur|ogre|dwarf|hobbit|gnome|goblin) (arrives|enters)

Execute the following javascript:
if(gwc.userdata.intro == true)
    gwc.connection.send("introduce me to " + args[1]);