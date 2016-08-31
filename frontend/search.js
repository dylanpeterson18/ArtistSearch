document.addEventListener('DOMContentLoaded', function(){
  document.getElementById('search-form').addEventListener('submit', function (e) {
      e.preventDefault();
      searchArtists(document.getElementById('query').value);
  }, false);
});


var searchArtists = function (query) {
    $.ajax({
        url: 'https://api.spotify.com/v1/search',
        data: {
            q: query,
            type: 'artist'
        },
        success: function (response) {
          template(response);
        },
        error: function(response){
          error_template(response);
        }
    });
};

var template = function(res){
  var resultsPlaceholder = document.getElementById('results');


  console.log(res);

  resultsPlaceholder.innerHTML = "";
  res.artists.items.forEach( artist => {
    var picdiv = document.createElement("div");
    picdiv.className = "artist-picture";
    var pictures = artist.images;
    var name = artist.name;
    var titleDiv = document.createElement("div");
    titleDiv.className = "artist-title";
    titleDiv.innerHTML = name;

    if(pictures[pictures.length-1]){
      var picUrl = pictures[pictures.length-1].url;
    } else {
      var picUrl = "http://www.chud.com/wp-content/uploads/2013/08/Avatar-Wallpaper-Neytiri7.jpg";
    }
    picdiv.style.backgroundImage = `url(${picUrl})`;


    var outerDiv = document.createElement("div");
    outerDiv.className = "artist-container";
    outerDiv.appendChild(titleDiv);
    outerDiv.appendChild(picdiv);

    resultsPlaceholder.appendChild(outerDiv);
  });
  if(res.artists.items.length === 0){
    resultsPlaceholder.innerHTML = "Sorry - no search results found.";
  }
};

var error_template = function(res){
  var resultsPlaceholder = document.getElementById('results');
  resultsPlaceholder.innerHTML = "Sorry, nothing found. Search again.";
};
