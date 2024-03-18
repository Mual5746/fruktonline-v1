
// skappar två button för att Tomma varukorg
var itemToBeRemoved = document.getElementsByClassName('btn-danger')
//console.log(itemToBeRemoved)

// adda eventlysner till knapparna  
for (var i = 0; i < itemToBeRemoved.length; i++) {
    var button = itemToBeRemoved[i]
    button.addEventListener('click', removeCartItem) 
        
}
//fuktion för att redera cart item
function removeCartItem(event){
    var buttonClicked = event.target
    // vi vill tabort helar kortet som har laggts till 
    //så vi hämtar 
    buttonClicked.parentElement.parentElement.remove()
    //anropa uppdateCartItem() för att uppdatera total priset
    uppdateCartItem()
}

// en funktion för att uppdatera priset när antal ökar 
var antalInputs = document.getElementsByClassName('cart-quantity-input')

for (var i = 0; i <antalInputs.length; i++ ){
    var input = antalInputs[i]
    input.addEventListener('change', antalChange)
}

//skapa en fuktion för att uppdaterar antal item i korgen 
function antalChange(event){
    var input = event.target
    //om input värdet är NaN eller är negative 
    if (isNaN(input.value) || input.value <= 0 )   // option + 7 || backslash '\'. You press 'Shift' + this key to use it.
    {
        input.value = 1;
    }
    uppdateCartItem()
}


//uppdatera totala priset

function uppdateCartItem() {
  //måste hämta alla kart items som finns på korgen, sen kolla priset för varje item
  var cartItemContainer = document.getElementsByClassName('cart-items')[0] 
  // denna returnerar alla item i korg, vi måste kolla alla cart en för en 
  var cartRows = cartItemContainer.getElementsByClassName('cart-row')
  
   var total = 0;

  //loopa igenom alla kart och hämta priset för varar
  for (var i =0; i <cartRows.length; i++){
    //plocka carte för varje rad
    var cartRow = cartRows[i]

    //nu måste vi hämta priset från denna kart
    var priceElement = cartRow.getElementsByClassName('cart-price')[0]

    //måste också kolla antal elementerna 
    var antalElement = cartRow.getElementsByClassName('cart-quantity-input')[0]

    //just nu den hämtar värdet som syns på sidan
    //console.log(priceElement, quantityElement)

    //för att hämta de riktiga värdet
    //i de fall det finns en £ $ eller SEK from för priset så lägger vi till .replace('£'. '')
    //för att säkerställa att det är alltid ett nummer 
    var price = parseFloat(priceElement.innerText) 
    var antal = antalElement.value
    //console.log(price*antal)

    total = total + (price * antal)


  }
  total = Math.round(total * 100) / 100
  //aurunda till närmaste två decimal tall 
  document.getElementsByClassName('cart-total-price')[0].innerText = total

}