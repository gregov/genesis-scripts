Name: autokill
Type: regexp
Pattern: ([Aa]n? |[Tt]wo |[Tt]hree |[Ff]our |[Ff]ive |[Ss]ix |[Ss]even |[Mm]any )(?:dirty |ugly |tough )?(?:male |female )?(orc|runt|orcish runt|orcish warrior|orcish priest)s?\.$

Execute the following javascript:
if (gwc.userdata.kill){
    pprint(args[1] + ", " + args[2], "grey");
    action("kill " + args[2]);
    action("cdonk");
  }