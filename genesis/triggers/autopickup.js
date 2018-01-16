Name: autopickup
Type: regexp
Pattern: ^(?!You ).*([Aa]n?|[Tt]wo|[Tt]hree|[Ff]our|[Ff]ive|[Ss]ix|[Ss]even|[Ee]ight|[Mm]any) (crude|ugly|filthy|dirty|rough|strong|thick|keen|wicked-tipped|twisted|notched) (?:wooden |stone |leather |metal |iron )?(little kni[fv]es?|short-blades?|daggers?|longswords?|spears?|hatchets?|maces?|shields?|vests?|breastplates?|carvers?|helms?|sta(?:ff|ves))

Execute the following javascript:
if(gwc.userdata.pickup){
      if (gwc.userdata.encumbrance.search("collapsing") == -1 ){
        action("get " + args[3]);
        // probe();
        // action("look");
      }else{
        pprint("You are too loaded to lift any more stuff", "orange");
      }
  }