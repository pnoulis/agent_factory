function n(e,i){return Math.floor(Math.random()*(i-e)+e)}function r(){let e=["admiring","adoring","affectionate","agitated","amazing","angry","awesome","beautiful","blissful","bold","boring","brave","busy","charming","clever","cool","compassionate","competent","condescending","confident","cranky","crazy","dazzling","determined","distracted","dreamy","eager","ecstatic","elastic","elated","elegant","eloquent","epic","exciting","fervent","festive","flamboyant","focused","friendly","frosty","funny","gallant","gifted","goofy","gracious","great","happy","hardcore","heuristic","hopeful","hungry","infallible","inspiring","intelligent","interesting","jolly","jovial","keen","kind","laughing","loving","lucid","magical","mystifying","modest","musing","naughty","nervous","nice","nifty","nostalgic","objective","optimistic","peaceful","pedantic","pensive","practical","priceless","quirky","quizzical","recursing","relaxed","reverent","romantic","sad","serene","sharp","silly","sleepy","stoic","strange","stupefied","suspicious","sweet","tender","thirsty","trusting","unruffled","upbeat","vibrant","vigilant","vigorous","wizardly","wonderful","xenodochial","youthful","zealous","zen"],i=["Aragorn","Arwen","Balin","Bard","Beorn","Beren","Baggins","Bilbo","Boromor","Celeborn","Celebrimbor","Denethor","Earendil","Elwing","Elendil","Elrond","Eomer","Eowyn","Faramir","Feanor","Fingolfin","Finrod","Finwe","Frodo","Galadriel","Gandalf","Gilgalad","Glorfindel","Gimli","Goldberry","Gollum","Grima","Wormtongue","Hurin","Isildur","Kili","Legolas","Luthien","Maedhros","Melian","Merry","Morgoth","Pippin","Radagast","Samwise","Saruman","Sauron","Shelob","Smaug","Smeagol","Theoden","Thingol","Thranduil","Thorin","Tom","Treebeard","Tuor","Idril","Turin","Ungoliant"];return`${e[n(0,e.length)]}_${i[n(0,i.length)]}`}export{r as generateRandomName};