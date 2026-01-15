// 🔧 Mets ici tes GIFs / images (dans un dossier gifs/)
// Exemple : gifs/scene1.gif, gifs/tree.gif, gifs/tower.gif
var FILES = [
  { name: "pokémon nimona", src: "gifs/scene1.gif" },
  { name: "pokéball", src: "gifs/scene2.gif" },
  { name: "Tree",     src: "gifs/tree.gif" },
  { name: "Tower",    src: "gifs/tower.gif" },

  { name: "Scene 03", src: "gifs/scene3.gif" },
  { name: "Scene 04", src: "gifs/scene4.gif" },
  { name: "Tree 2",   src: "gifs/tree2.gif" },
  { name: "Tower 2",  src: "gifs/tower2.gif" },

  { name: "Scene 05", src: "gifs/scene5.gif" },
  { name: "Scene 06", src: "gifs/scene6.gif" },
  { name: "Tree 3",   src: "gifs/tree3.gif" },
  { name: "Tower 3",  src: "gifs/tower3.gif" }
];

var selectedSrc = null;

function render(list){
  var grid = document.getElementById("grid");
  grid.innerHTML = "";

  for (var i=0; i<list.length; i++){
    (function(item){
      var div = document.createElement("div");
      div.className = "card";
      div.setAttribute("data-src", item.src);
      div.setAttribute("data-name", item.name);

      var img = document.createElement("img");
      img.src = item.src;
      img.alt = item.name;

      div.appendChild(img);

      div.onclick = function(){
        // enlever ancienne sélection
        var cards = document.getElementsByClassName("card");
        for (var j=0; j<cards.length; j++){
          cards[j].className = "card";
        }
        // sélectionner
        div.className = "card selected";
        selectedSrc = item.src;

        document.getElementById("hint").innerHTML =
          "Sélectionné : " + item.name;
      };

      grid.appendChild(div);
    })(list[i]);
  }
}

function filter(){
  var q = document.getElementById("search").value;
  if(q === "Recherche") q = "";
  q = (q || "").toLowerCase();

  var out = [];
  for (var i=0; i<FILES.length; i++){
    if(FILES[i].name.toLowerCase().indexOf(q) !== -1){
      out.push(FILES[i]);
    }
  }
  render(out);
}

window.onload = function(){
  render(FILES);

  var search = document.getElementById("search");
  search.onkeyup = filter;

  document.getElementById("downloadBtn").onclick = function(){
    if(!selectedSrc){
      alert("Sélectionne d'abord un GIF/image dans la grille.");
      return;
    }

    // téléchargement via lien invisible
    var a = document.createElement("a");
    a.href = selectedSrc;
    a.download = selectedSrc.split("/").pop(); // nom du fichier
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
};
