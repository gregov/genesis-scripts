Pattern: count to ten

Execute the following javascript:
var Counter = function()
  {
    var self = this;
    self.count = 0;
    self.IncrementCount = function()
    {
      self.count++;
      if (self.count <= 10)
      {
        gwc.connection.send('\'' + self.count + ' mississippi');
        setTimeout(self.IncrementCount, 2000);
      }
      else
      {
        gwc.connection.send('\'Over 10');
      }
    };
  };

  var c = new Counter();
  setTimeout(c.IncrementCount, 2000);