// Hämta texten från h1-elementet
var text = document.getElementById('typing-text').textContent;
var index = 0;
var speed = 100; // Hastigheten på "typningen" (i millisekunder)

// Funktion för att skriva och radera texten i en loop
function typeWriter() {
    // Skrivning
    if (index < text.length) {
        document.getElementById('typing-text').innerHTML = text.substring(0, index + 1); // Lägg till en bokstav
        index++; // Öka index för nästa bokstav
    } /*
    // Radering
    else if (index > 0) {
        document.getElementById('typing-text').innerHTML = text.substring(0, index - 1); // Ta bort en bokstav
        index--; // Minska index för att radera nästa bokstav
    }  */
    // När all text har skrivits och raderats, återgå till skrivning
    else {
        index = 0; // Återställ index för att börja om
    }
    
    // Fortsätt att köra typeWriter med given hastighet
    setTimeout(typeWriter, speed);
}

// Starta "typningen"
typeWriter();