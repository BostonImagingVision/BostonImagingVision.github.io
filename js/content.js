$(document).ready(function(){ loadHome();});

// On clicking a tab, use ajax to load the corresponding static content.

function loadHome()      {$("#page-content").load("home.html"); };

function loadResearch()  {$("#page-content").load("research.html"); };

function loadMembership(){$("#page-content").load("membership.html"); };

function loadRelated()   {$("#page-content").load("related.html"); };

function loadCompanies() { $.getJSON("data/companies.json", renderCompanies); };

// render 'data/companies.json' into the DOM
function renderCompanies(data) {
  var rows = [];
  var i = 0;
  var maxPerRow = 4;
  var andMore = "<tr><td><b>And Many More...</b></td></tr>";
  var row = $("<tr/>");
  $.each(data, function(key, val){
	   var item = $("<a/>", {href: val.url, target:"_blank"}).text(val.name);
	   row.append($("<td/>").append(item));
	   i += 1;
	   if (i >= maxPerRow){
	     rows.push(row);
	     row = $("<tr/>");
	     i = 0;
	   }
	 });
  if (row.children().length > 0){
    rows.push(row);
  }
  $("#page-content").load("companies.html",
			  function() {
			    $.each(rows, function(i, row) {$("table#companies").append(row); });
			    $("table#companies").append(andMore);
			  });
};
