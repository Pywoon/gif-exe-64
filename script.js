var FILES = [
  { name: "pokémon nimona", src: "gifs/scene1.gif" },
  { name: "pokéball", src: "gifs/scene2.gif" },
  { name: "pokémon", src: "gifs/tree.gif" },
  { name: "mydoria my hero academia", src: "gifs/tower.gif" },

  { name: "umbrella academy santagun", src: "gifs/scene3.gif" },
  { name: "umbrella academy 5 five", src: "gifs/scene4.gif" },
  { name: "Docteur who", src: "gifs/tree2.gif" },
  { name: "Sunny One piece", src: "gifs/tower2.gif" },

  { name: "cat eyes laser", src: "gifs/scene5.gif" },
  { name: "mr indestructicle computer", src: "gifs/scene6.gif" },
  { name: "doctor who", src: "gifs/tree3.gif" },
  { name: "kunfu panda", src: "gifs/tower3.gif" },

    { name: "Cars jump", src: "gifs/carsjump.gif" },
  { name: "Dance", src: "gifs/Dance.gif" },
  { name: "Dandadan metal", src: "gifs/dandadan metal.gif" },
  { name: "Kachaow", src: "gifs/kachoaw.gif" },
  { name: "Kachow cars", src: "gifs/kachow-cars.gif" },
  { name: "Licks", src: "gifs/licks.gif" },
  { name: "Marcil choked", src: "gifs/marcil choked.gif" },
  { name: "Marcil", src: "gifs/marcil.gif" },
  { name: "Meme turbo", src: "gifs/memeturbo.gif" },
  { name: "Pomni", src: "gifs/pomni.gif" },

    { name: "Senshi", src: "gifs/senshi.gif" },
  { name: "Senshi marmite", src: "gifs/senshimarmite.gif" },
  { name: "Thanos", src: "gifs/thanos.gif" },

   { name: "UWU", src: "gifs/uwu.gif" }
];

var selectedSrc = null;


var currentPage = 1;
var PER_PAGE = 9;         
var filtered = FILES.slice();

function renderPage(){
  var grid = document.getElementById("grid");
  grid.innerHTML = "";

  var start = (currentPage - 1) * PER_PAGE;
  var end = start + PER_PAGE;
  var list = filtered.slice(start, end);

  for (var i=0; i<list.length; i++){
    (function(item){
      var div = document.createElement("div");
      div.className = "card";

      var img = document.createElement("img");
      img.src = item.src;
      img.alt = item.name;

      div.appendChild(img);

      div.onclick = function(){
        var cards = document.getElementsByClassName("card");
        for (var j=0; j<cards.length; j++){
          cards[j].className = "card";
        }
        div.className = "card selected";
        selectedSrc = item.src;

        document.getElementById("hint").innerHTML =
          "Sélectionné : " + item.name;
      };

      grid.appendChild(div);
    })(list[i]);
  }
}

function renderPagination(){
  var pag = document.getElementById("pagination");
  pag.innerHTML = "";

  var totalPages = Math.ceil(filtered.length / PER_PAGE);
  if (totalPages <= 1) return;

  for (var p = 1; p <= totalPages; p++){
    (function(page){
      var btn = document.createElement("button");
      btn.className = "page-btn" + (page === currentPage ? " active" : "");
      btn.innerHTML = page;

      btn.onclick = function(){
        currentPage = page;
        renderPage();
        renderPagination();
      };

      pag.appendChild(btn);
    })(p);
  }
}

function applyFilter(){
  var q = document.getElementById("search").value;
  if (q === "Recherche") q = "";
  q = (q || "").toLowerCase();

  filtered = [];
  for (var i=0; i<FILES.length; i++){
    if(FILES[i].name.toLowerCase().indexOf(q) !== -1){
      filtered.push(FILES[i]);
    }
  }

  currentPage = 1; 
  selectedSrc = null;
  document.getElementById("hint").innerHTML = "Clique sur une image/GIF pour la sélectionner.";

  renderPage();
  renderPagination();
}

window.onload = function(){
  renderPage();
  renderPagination();

  var search = document.getElementById("search");
  search.onkeyup = applyFilter;

  document.getElementById("downloadBtn").onclick = function(){
    if(!selectedSrc){
      alert("Sélectionne d'abord un GIF/image dans la grille.");
      return;
    }
    var a = document.createElement("a");
    a.href = selectedSrc;
    a.download = selectedSrc.split("/").pop();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
};
