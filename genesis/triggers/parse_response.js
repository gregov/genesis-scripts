Name: parse_response
Type: regexp
Pattern: ^You (.*)$

Execute the following javascript:
if (typeof(current_probe) != "undefined" && current_probe != null){
     gwc.userdata[current_probe] = args[0];
     current_probe = null;
  }