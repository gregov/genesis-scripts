Name: loot corpse
Type: regexp
Pattern: (^You killed | died\.$)

Execute the following javascript:
if(gwc.userdata.loot)
    if (gwc.userdata.encumbrance.search("collapsing") == -1 ){
      action('get all from corpse');
    }else{
      pprint("You are too loaded to lift any more stuff", "orange");
    }
