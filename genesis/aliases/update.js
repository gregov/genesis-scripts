Pattern: update

Execute the following javascript:
if(args[2] == 'on')
  {
     gwc.userdata[args[1]] = true;
  }else if(args[2] == 'off'){
     gwc.userdata[args[1]] = false;
  }else{
     gwc.output.append("usage: " + args[0] + " " + args[1] + "(on|off)");
  }

  gwc.output.append("Current setup:");
  for(var property in gwc.userdata){
     gwc.output.append("\t" + property + ": " + gwc.userdata[property]);
  }