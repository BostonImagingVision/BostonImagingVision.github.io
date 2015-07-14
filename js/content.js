// Deferred: waits for ajax to load data from data/companies.json
COMPANIES = $.Deferred();

$(document).ready(function(){
		    loadHome();
		    $.getJSON("data/companies.json",
			      function(data){
				COMPANIES.resolveWith(data); });
		  });

// On clicking a tab, use ajax to load the corresponding static content.

function loadHome()      {$("#page-content").load("home.html"); };

function loadResearch()  {$("#page-content").load("research.html",
                                                 function () {COMPANIES.done(renderCompanies);});};

function loadMembership(){$("#page-content").load("membership.html"); };

function loadRelated()   {$("#page-content").load("related.html"); };

function loadCompanies() {$("#page-content").load("companies.html",
						  function () { COMPANIES.done(renderCompanies);});};

// Called when companies.html has been loaded, and companies (data) are loaded
// this: list of COMPANIES
function renderCompanies() {
  var startups = $.grep(this, function(c,i){ return c.status == "startup";});
  var locallyBased = $.grep(this, function(c,i){ return c.status == "locally-based";});
  var localOffices = $.grep(this, function(c,i){ return c.status == "local-offices";});
  var universities = $.grep(this, function(c,i){ return c.status == "universities";});
  var research     = $.grep(this, function(c,i){ return c.status == "research-labs";});
  var andMore = "<tr><td><b>And Many More...</b></td></tr>";
  renderTable(startups, $("table#companies"), renderCompany);
  $("table#companies").append(andMore);
  renderTable(locallyBased, $("table#locally-based"), renderCompany);
  renderTable(localOffices, $("table#local-offices"), renderCompany);
  renderTable(research,     $("table#research-labs"), renderCompany);
  renderTable(universities, $("table#universities"), renderCompany);
}

// items: a list of objects to be rendered by renderFunction
// target: a TABLE to add rows to.
// renderFunction: a function to render each company into a DIV
// Adds rows (TR) to target
function renderTable(items, target, renderFunction){
  var rows = [];
  var i = 0;
  var maxPerRow = 4;
  var row = $("<tr/>");
  $.each(items,
	 function(key, val){
	   var item = renderFunction(val);
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
  $.each(rows, function(i, row) {target.append(row); });
};

// Returns a DIV containing one company
function renderCompany(company){
  var nameLink = $("<a/>", {href: company.url, target:"_blank"}).text(company.name);
  var item = $('<div/>').addClass('company').append(nameLink);
  if (company.ownedBy != undefined){
    var msg = '(owned by ' + company.ownedBy + ')';
    item.append($('<div/>').addClass('owner').append(msg));
  }
  return item;
}
