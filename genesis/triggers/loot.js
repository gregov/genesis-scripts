Name: loot
Type: plain
Pattern: ([Aa]n?|[Tt]wo|[Tt]hree|[Ff]our|[Ff]ive|[Ss]ix|[Ss]even|[Ee]ight|[Mm]any) (crude|ugly|filthy|dirty|rough|crude) (little kni[fv]es?|short-blades?|spears?|stone maces?|metal shields?|leather vests?)

Execute the following javascript:
if(gwc.userdata.loot){
    if (gwc.userdata.encumbrance.search("collapsing") == -1 ){
      action("get " + args[3]);
      probe();
      action("look");
    }else{
      pprint("You are too loaded to lift any more stuff", "orange");
    }
}


Pattern: (^You killed | died\.$)

Execute the following javascript:
if(gwc.userdata.loot)
    if (gwc.userdata.encumbrance.search("collapsing") == -1 ){
      action('get all from corpse');
      probe();
    }else{
      pprint("You are too loaded to lift any more stuff", "orange");
    }