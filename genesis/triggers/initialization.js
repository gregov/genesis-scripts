Name: initialization
Type: plain
Pattern: You finally recover

Execute the following javascript:
  updatepath = function(){
      gwc.userdata.paths = {
      "store": ["s","e","e","s"],
      "fortress": ["s","w","n","n","w","w","w","w","w","w","w","w",
                   "w","w","w","w","w","n","w","n","n","n","n","n",
                   "d", "s", "e", "s", "s", "s", "w", "n"],
      "west_moorland": ['sw','e','e','e','e','se','w','w','w','w','w',
                        'w','sw','e','e','e','e','e','e','se','w','w',
                        'w','w','w','w','sw','e','e','e','e','e','e',
                        'sw','w','w','w','w','se','e','e','sw']
      };

      gwc.output.append("You remember the following paths :");
      for(var property in gwc.userdata.paths){
        gwc.output.append("\t" + property);
      }
    };

    probe = function(){
        function gather_all(vitals){
          if(vitals.length)
          {
            vital = vitals[0];
            if(!current_probe){
              current_probe = vital;
              gwc.connection.send("vitals " + vital);
              setTimeout(gather_all, 200, vitals.slice(1));
            }else{
              setTimeout(gather_all, 200, vitals);
            }
          }
        }

        params = ["age",
                  "alignment",
                  "encumbrance",
                  "fatigue",
                  "health",
                  "intoxication",
                  "mana",
                  "mail",
                  "panic",
                  "soaked",
                  "stuffed"];
        gather_all(params);
    };

    walk = function(args){
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
    };

    /* persistant vars */
    gwc.userdata.kill = true;
    gwc.userdata.loot = true;
    gwc.userdata.idle = false;
    gwc.userdata.herb = false;
    gwc.userdata.intro = false;
    gwc.userdata.request = false;

    /* transient vars */
    current_probe = null;

    /* main */
    updatepath();
    probe();
