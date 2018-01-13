Pattern: idle

Execute the following javascript:
function choose(arr) {
      return arr[Math.floor(arr.length * Math.random())];
  }

  var things_to_do = ["yawn", "yodel", "breathe", "blank", "hiccup", "sob", "smile", "smirk"];
  function action(){
     gwc.connection.send(choose(things_to_do));
     if(gwc.userdata.idle){
       setTimeout(action, Math.floor(Math.random() * 120000));
     }
  }

  action();