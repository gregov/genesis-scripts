Name: autorequest
Type: regexp
Pattern: ^([a-zA-Z-]+) .*(male|female) (human|elf|half-elf|minotaur|ogre|dwarf|hobbit|gnome|goblin)\.$

Execute the following javascript:
if(gwc.userdata.request == true && args[1] != "You" && args[1] != "A"){
    action("request " + args[1]);
    action("remember " + args[1]);
  }