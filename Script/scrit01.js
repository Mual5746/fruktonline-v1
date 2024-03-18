
//förta vi ska skappa en knapp och sen adda en event till den att göra något 

// skappar  button för att Tomma varukorg
var itemToBeRemoved = document.getElementsByClassName('btn-danger')
//console.log(itemToBeRemoved)

// adda eventlysner till knapparna  
for (var i = 0; i < itemToBeRemoved.length; i++) {
    var button = itemToBeRemoved[i]
    button.addEventListener('click', function(event){ 
        //EventListener returnerar alltid en event objekt och den har en property target är den vi klickar på
        //console.log('clicked!!')
        var buttonClicked = event.target
        // vi vill tabort helar kortet som har laggts till 
        //så vi hämtar 
        buttonClicked.parentElement.parentElement.remove()
        //anropa uppdateCartItem() för att uppdatera total priset
        uppdateCartItem()
    })
}
//steg 2 när vi raderar total uppdateras inte 
//uppdatera totala priset efter vi har rederat iems

function uppdateCartItem() {

  //måste hämta alla kart items som finns på korgen, sen kolla priset för varje item
  var cartItemContainer = document.getElementsByClassName('cart-items')[0] 

  // denna returnerar alla item i korg, vi måste kolla alla cart en för en 
  var cartRows = cartItemContainer.getElementsByClassName('cart-row')
  
   var total = 0;

  //loopa igenom varje kart row och hämtar priset och antal varoro för att uppdaterar
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
  document.getElementsByClassName('cart-total-price')[0].innerText = total

}