function gather_all(vitals){
  if(vitals)
  {
    vital = vitals[0];
    if(!gwc.userdata.stack){
      gwc.userdata.stack = vital;
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