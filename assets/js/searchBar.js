var document = "index.html";

var searchItems = [
                ["Biochimia", "index.html#banner"],
                ["Biochimia structurala", "elements.html"],
                ["Biochimia metabolismelor", "right-sidebar.html"],
                ["Importanta", "no-sidebar.html"],
                ["Biomoleculele organismului", "index.html#four"],
                ["Contact", "contact.html"],
                ["Vitamine", "left-sidebar.html"],
                ["Vitamina A", "vitaminaA.html"],
                ["Vitamina B", "vitaminaB.html"],
                ["Vitamina C", "vitaminaC.html"],
                ["Vitamina D", "vitaminaD.html"],
                ["Vitamina E", "vitaminaE.html"],
                ["Vitamina K", "vitaminaK.html"],
                ["Catabolism", "right-sidebar.html#catabolism"],
                ["Dezasimilaţie", "right-sidebar.html#catabolism"],
                ["Anabolism", "right-sidebar.html#catabolism"],
                ["Asimilaţie", "right-sidebar.html#catabolism"],
                ["Clasificarea metabolismelor", "right-sidebar.html#clasificareMet"],
                ["Reglarea metabolismelor", "right-sidebar.html#reglareaMet"],
                ["Aminoacizi", "elements.html#aminoacizi"],
                ["Acizi nucleici", "elements.html#nucleici"],
                ["ADN", "elements.html#adn"],
                ["ARN", "elements.html#arn"],
                ["Proteine", "elements.html#proteine"],
                ["Glucide", "elements.html#glucide"],
                ["Carbohidrati", "elements.html#glucide"],
                ["Lipide", "elements.html#lipide"],
                ["Enzime", "elements.html#enzime"]
];
var searchSize = 0;
for(var i = 0; i < searchItems.length; i++){
    searchSize++;
}

autocomplete(document.getElementById("myInput"), searchItems);

function autocomplete(inp, arr) {
    var currentFocus;
    inp.addEventListener("input", function() {
        var a, b, i, val = this.value;
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
      
        this.parentNode.appendChild(a);
        
        if(val.toUpperCase() == "AJUTOR"){
            for (i = 0; i < searchSize; i+=2) {
                b = document.createElement("div");
            
                b.innerHTML = arr[i][0].substr(0, val.length);
                b.innerHTML += arr[i][0].substr(val.length);
                
                b.innerHTML += "<input type='hidden' value='" + arr[i][0] + "'>";
                b.innerHTML += "<input type='hidden' value='" + arr[i][1] + "'>"
                //inp.value = arr[i][1];
                b.addEventListener("click", function() {
                    inp.value = "";
                    
                    location.href = this.getElementsByTagName("input")[1].value;
                    closeAllLists();
                });
                
                a.appendChild(b);
            }
        }
        
        else{
      
            for (i = 0; i < searchSize; i++) {
                if (arr[i][0].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                    b = document.createElement("div");

                    b.innerHTML = "<strong style='color:black; font-weight: bold;'>" + arr[i][0].substr(0, val.length) + "</strong>"
                    b.innerHTML += arr[i][0].substr(val.length);

                    b.innerHTML += "<input type='hidden' value='" + arr[i][0] + "'>";
                    b.innerHTML += "<input type='hidden' value='" + arr[i][1] + "'>"
                    //inp.value = arr[i][1];
                    b.addEventListener("click", function() {
                        inp.value = "";

                        location.href = this.getElementsByTagName("input")[1].value;
                        closeAllLists();
                    });

                    a.appendChild(b);
                }
            }
        }
      
    });
    
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
            if (e.keyCode == 40) {
                currentFocus++;
                addActive(x);
            }
        
            else if (e.keyCode == 38) {
                currentFocus--;
                addActive(x);
            }
        
            else if (e.keyCode == 13) {

            e.preventDefault();
                if (currentFocus > -1) {
                    if (x) x[currentFocus].click();
                }
            }
    });
    
    function addActive(x) {
        if (!x) return false;
    
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
    
        x[currentFocus].classList.add("autocomplete-active");
    }
    
    function removeActive(x) {
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    
    function closeAllLists(elmnt) {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
    
    function searchForItems(){
        var ok = 0;
        for(var i = 0; i < searchSize; i++){
            if(inp.value.toUpperCase() == arr[i][0].toUpperCase()){
                inp.value = "";
                location.href = arr[i][1];
                closeAllLists();
                ok = 1;
                break;
            }
        }
        
        if(ok == 0){
            inp.value = "Not found";
            closeAllLists();
        }
    }
    
    document.getElementById("mySubmit").addEventListener("click", function(){
        searchForItems();
    })
    
    inp.addEventListener("keydown", function(e){
        var key = e.which || e.keyCode;
        if(key == 13 && currentFocus == -1){
            searchForItems();
        }
    })
}


