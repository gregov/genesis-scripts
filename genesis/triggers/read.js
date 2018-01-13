if (gwc.userdata.probe){
   gwc.output.color("yellow");
   gwc.output.append(gwc.userdata.probe + ":"+ args[0]);
   gwc.userdata[gwc.userdata.probe] = args[0];
   gwc.userdata.probe = null;
}

if (typeof(current_probe) != "undefined" && current_probe != null){
   gwc.userdata[current_probe] = args[0];
   current_probe = null;
}