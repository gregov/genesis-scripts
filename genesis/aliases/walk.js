Pattern: walk

Execute the following javascript:
function usage(){
      choices = [];
      for(var p in gwc.userdata.paths)
        choices.push(p);
      gwc.output.append("Usage: walk [to|from] [" + choices.join('|') + "]");
    }

    function step(remaining_path){
      if(remaining_path){
        gwc.connection.send(remaining_path[0]);
      }
      if(gwc.gmcp.data.character.vitals.fatigue == "extremely exhausted")
      {
        gwc.connection.send("search here for herbs");
        setTimeout(step, 15000, remaining_path);
      }else{
        if(gwc.userdata.herb){
          gwc.connection.send("search here for herbs");
          if(remaining_path) setTimeout(step, 10000, remaining_path.slice(1));
        }else{
          if(remaining_path) setTimeout(step, 300, remaining_path.slice(1));
        }
      }
    }

    if(args[2] in gwc.userdata.paths){
      var path = [];
      var i = 0;
      if( args[1] == 'to'){
        path = gwc.userdata.paths[args[2]];
        gwc.output.append("You scratch your head pensively...\nthen you remember : " + path);
      }else if ( args[1] == 'from'){
        opath = gwc.userdata.paths[args[2]].slice();
        opath.reverse();
        for(var i in opath){
          invert = {'n': 's', 's': 'n', 'e' : 'w', 'w': 'e',
                    'ne': 'sw', 'nw': 'se', 'sw': 'ne', 'se': 'nw',
                    'u': 'd', 'd': 'u'};
          path[i] = invert[opath[i]];
        }
      }else usage();
      step(path);
    }else usage();
