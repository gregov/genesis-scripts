Name: kill orc
Type: regexp
Pattern: (An? |Two |Three |Four |Five |Six |Seven |Eight |Nine |Ten )(dirty |ugly )?(male |female )?(orcs?|orcish runts?|orcish warriors?)\.$

Execute the following javascript:
if (gwc.userdata.kill)
    gwc.connection.send("kill orc");