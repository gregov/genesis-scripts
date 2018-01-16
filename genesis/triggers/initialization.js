pprint = function(text, color){
    gwc.output.append(text);
    if(color) gwc.output.color(color);
  };

  action = function(text){
    gwc.connection.send(text);
  };

  updatepath = function(){
    gwc.userdata.endpoints = {
    "store": ["X4MWZ.", "99URr1"],
    "fortress": ["X4MWZ.","SlQLE."],
    "dwarfheim": ["X4MWZ.", "RVoh00"],
    "ship_to_gelan": ["X4MWZ.", "YoFAW/"],
    "west_moorland": ["rva5R/", ""],
    "cadets": ["FAt44.", ".0blF/"],
    "kretan": ["FAt44.", "GPrbY/"]
    };

    gwc.userdata.paths = {
    "store": ["s","e","e","s"],
    "fortress": ["s","w","n","n","w","w","w","w","w","w","w","w",
                 "w","w","w","w","w","n","w","n","n","n","n","n",
                 "d", "s", "e", "s", "s", "s", "w", "n"],
    "dwarfheim": ["s","w","n","n","w","w","w","n","n","n","n","n",
                  "n","n","n","n","n","n","w","n","n","w","w","w",
                  "d","e"],
    "ship_to_gelan": ["s","e","e","e","n","n","e","e","e","board"],
    "west_moorland": ['sw','e','e','e','e','se','w','w','w','w','w',
                      'w','sw','e','e','e','e','e','e','se','w','w',
                      'w','w','w','w','sw','e','e','e','e','e','e',
                      'sw','w','w','w','w','se','e','e','sw'],
    "cadets" : ["n","n","n","n","n","ne","ne",
                "ne","ne","n","e","s"],
    "kretan": ["e","se","e","e","e","ne","e","se","e","se","e","ne",
               "e","se","se","e","u","e","u","u","se","d","d","e",
               "d","e","e","se","e","e"]
    };

    pprint("You remember the following paths :", "green");
    for(var property in gwc.userdata.paths){
      pprint("\t" + property, "green");
    }
  };

  probe = function(stat){
      function gather_all(vitals){
        if(vitals.length)
        {
          vital = vitals[0];
          if(!current_probe){
            current_probe = vital;
            action("vitals " + vital);
            setTimeout(gather_all, 200, vitals.slice(1));
          }else{
            setTimeout(gather_all, 200, vitals);
          }
        }
      }

      if(stat)
        params = [stat];
      else
        params = ["alignment",
                  "encumbrance",
                  "fatigue",
                  "health",
                  "intoxication",
                  "mana",
                  "mail",
                  "panic",
                  "stuffed"];
      gather_all(params);
  };

  walk = function(direction, name){
  function usage(){
    choices = [];
    for(var p in gwc.userdata.paths)
      choices.push(p);
      pprint("Usage: walk [to|from] [" + choices.join('|') + "]", "green");
    }

    function step(remaining_path){
      if(remaining_path){
        action(remaining_path[0]);
      }
      if(gwc.gmcp.data.character.vitals.fatigue == "extremely exhausted")
      {
        action("search here for herbs");
        setTimeout(step, 15000, remaining_path);
      }else{
        if(gwc.userdata.herb){
          action("search here for herbs");
          if(remaining_path) setTimeout(step, 10000, remaining_path.slice(1));
        }else{
          if(remaining_path) setTimeout(step, 300, remaining_path.slice(1));
        }
      }
    }

    if(name in gwc.userdata.paths){
      var path = [];
      if(direction == 'to'){
        if(gwc.userdata.endpoints[name][0] && gwc.userdata.endpoints[name][0] == gwc.gmcp.data.room.id){
          path = gwc.userdata.paths[name];
          pprint("You scratch your head pensively...\nthen you remember : " + path, "green");
        }else pprint("Your are not at the starting point from this path.");
      }else if (direction == 'from'){
        if(gwc.userdata.endpoints[name][1] && gwc.userdata.endpoints[name][1] == gwc.gmcp.data.room.id){
          opath = gwc.userdata.paths[name].slice();
          opath.reverse();
          for(var i in opath){
            invert = {'n': 's', 's': 'n', 'e' : 'w', 'w': 'e',
                      'ne': 'sw', 'nw': 'se', 'sw': 'ne', 'se': 'nw',
                      'u': 'd', 'd': 'u'};
            path[i] = invert[opath[i]];
          }
        }else pprint("Your are not at the starting point from this path.");
      }else usage();

      if(path.length){
        gwc.userdata.kill = false;
        step(path);
      }
    }else usage();
  };

  update = function(args){
    if(args[2] == 'on')
    {
       gwc.userdata[args[1]] = true;
    }else if(args[2] == 'off'){
       gwc.userdata[args[1]] = false;
    }else{
       pprint("usage: " + args[0] + " " + args[1] + "(on|off)");
    }

    pprint("Current setup:", "green");
    for(var property in gwc.userdata){
       pprint("\t" + property + ": " + gwc.userdata[property], "green");
    }
  };

  idle = function(interval){
    if(!interval)
      interval = 120;
    function choose(arr) {
        return arr[Math.floor(arr.length * Math.random())];
    }

    var things_to_do = ["yawn", "yodel", "breathe", "blank", "hiccup", "sob", "smile", "smirk"];
    function action(){
       gwc.connection.send(choose(things_to_do));
       if(gwc.userdata.idle){
         setTimeout(action, Math.floor(Math.random() * interval * 1000));
       }
    }

    action();
  };

  /* persistant vars */
  gwc.userdata.kill = true;
  gwc.userdata.loot = true;
  gwc.userdata.pickup = true;
  gwc.userdata.idle = false;
  gwc.userdata.herb = false;
  gwc.userdata.intro = false;
  gwc.userdata.request = false;

  /* transient vars */
  current_probe = null;

  /* main */
  updatepath();
  probe();