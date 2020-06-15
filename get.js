let jobs = [];
let counter = 0;
var states = {
    "All Locations": "ALL",
    "Alabama": "AL",
    "Alaska": "AK",
    "American Samoa": "AS",
    "Arizona": "AZ",
    "Arkansas": "AR",
    "California": "CA",
    "Colorado": "CO",
    "Connecticut": "CT",
    "Delaware": "DE",
    "District Of Columbia": "DC",
    "Federated States Of Micronesia": "FM",
    "Florida": "FL",
    "Georgia": "GA",
    "Guam": "GU",
    "Hawaii": "HI",
    "Idaho": "ID",
    "Illinois": "IL",
    "Indiana": "IN",
    "Iowa": "IA",
    "Kansas": "KS",
    "Kentucky": "KY",
    "Louisiana": "LA",
    "Maine": "ME",
    "Marshall Islands": "MH",
    "Maryland": "MD",
    "Massachusetts": "MA",
    "Michigan": "MI",
    "Minnesota": "MN",
    "Mississippi": "MS",
    "Missouri": "MO",
    "Montana": "MT",
    "Nebraska": "NE",
    "Nevada": "NV",
    "New Hampshire": "NH",
    "New Jersey": "NJ",
    "New Mexico": "NM",
    "New York": "NY",
    "North Carolina": "NC",
    "North Dakota": "ND",
    "Northern Mariana Islands": "MP",
    "Ohio": "OH",
    "Oklahoma": "OK",
    "Oregon": "OR",
    "Palau": "PW",
    "Pennsylvania": "PA",
    "Puerto Rico": "PR",
    "Rhode Island": "RI",
    "South Carolina": "SC",
    "South Dakota": "SD",
    "Tennessee": "TN",
    "Texas": "TX",
    "Utah": "UT",
    "Vermont": "VT",
    "Virgin Islands": "VI",
    "Virginia": "VA",
    "Washington": "WA",
    "West Virginia": "WV",
    "Wisconsin": "WI",
    "Wyoming": "WY"
};
var tabledata = [];
// = [
//     {
//         "position": "Software Engineering Intern",
//         "company": "Google", 
//         "location": "San Jose, CA", 
//         "salary": "$100K"
//     },

//     {
//         "position": "Software Engineer - Bachelor's (Intern)",
//         "company": "Cisco", 
//         "location": "San Jose, CA", 
//         "salary": "$N/A"
//     },

//     {
//         "position": "EDA Software Engineering Intern",
//         "company": "Intel", 
//         "location": "San Jose, CA", 
//         "salary": "$N/A"
//     },
// ];

var table = null;

window.addEventListener("load", function() {``
    loadData();
    console.log($("#search").val());
    //var text = $( "#search" ).val();
    $( "#searchButton" ).click(function() {
        
        filterCompany();
    });
        
    $('#search').keypress(function(event){
        //var keycode = (event.keyCode ? event.keyCode : event.which);
        filterCompany();
    });

    $( "#selectBox" ).change(function() {
        filterLocation();
    });
},false);


function filterLocation(){
    var text = $( "#selectBox" ).val();
    if(text != "ALL"){
        table.setFilter("location", "like", ", " + text);
    }else{
        table.clearFilter();
    }
}

function filterCompany(){
    var text = $("#search").val();
    table.setFilter("company", "like", text);
}
$('You can scroll horizontally on the table').alert()
function loadData(){
    let requestURL = 'https://api.npoint.io/cfb837c1ee9ee01f357e';
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        tabledata = request.response;
        table = new Tabulator(".responsive-table", {
            data: tabledata,          //load row data from array
            layout:"fitColumns",      //fit columns to width of table
            responsiveLayout: "hide",  //hide columns that dont fit on the table
            autoResize: false,         //keeps it from auto resizing on mobile ==> horizontal scrolling
            tooltips:true,            //show tool tips on cells
            addRowPos:"top",          //when adding a new row, add it to the top of the table
            history:false,             //allow undo and redo actions on the table
            pagination:"local",       //paginate the dat
            paginationSize: 13,       //allow 14 rows per page of data
            movableColumns:false,      //allow column order to be changed
            resizableRows:false,       //allow row order to be changed
            initialSort:[             //set the initial sort order of the data
                {column:"Company", dir:"asc"},
            ],
            columns:[                 //define the table columns
                {title:"Position Title", field:"position"},
                {title:"Company", field:"company"},
                {title:"Location", field:"location"},
                {title:"Salary", field:"salary", formatter:"money"},
                {title:"Apply", field:"link", formatter:"link", formatterParams:{
                    label: "Link"
                }},
            ],
        });
        dropdown();
    }   
}

function dropdown(){
    Object.entries(states).forEach(entry =>{
        let abbr = entry[0];
        let full = entry[1];
        $('#selectBox').append(`<option value="${full}">${abbr}</option>`); 
    });
}
