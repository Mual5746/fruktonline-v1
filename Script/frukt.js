
/*-------Del 1 --------------------------*/

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

/*---------Slut del 1 --------------------------*/

/*---------del 2 --------------------------*/
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

/*---------Slut del 2 --------------------------*/


//-----------del 3 ------ lägga till kar till korg

var addToCartButtons = document.getElementsByClassName('shop-item-button')
for (var i = 0; i <addToCartButtons.length; i++ ){
    var button = addToCartButtons[i]
    button.addEventListener('click', addToCartClicked)
}

// skapa funktion för att adda till korg när man klicker på KÖP
function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement //vill vi hämta shopItem kareten 
    //hämta alla saker man behöver från KArt 
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src

    //console.log(title, price, imageSrc)
    //pssa dessa till en fuktion 
    addItemToCart(title, price, imageSrc)


    //uppdatera totala kostnader 
    uppdateCartItem()
}

function addItemToCart(title, price, imageSrc){
 //skappa en row for varoro i kogen (skppar en div för kunna adda i html filen sen)
 var cartRow = document.createElement('div')
 
 //För att get karten samma style måste vi adda classen
 cartRow.classList.add('cart-row')
 //cartRow.innerText = title 

 //nu ska vi ska adda cartRow till korg

 //först ska vi hämta alla kart som finnns i korg
 var cartItems = document.getElementsByClassName('cart-items')[0]
 
 // för att dubbellkolla om kartet redan finns 
 //hämta alla Items namn som finns i korg 
 cartItemName = cartItems.getElementsByClassName('cart-item-title') 

 //loopa igenom alla items namn 
 for (var i = 0; i< cartItemName.length; i++ ){
    //om Itemnamn som vi ska adda finns finns ikorg
    if(cartItemName[i].innerText == title){
        //item finns redan, medelan användaren om det 
        alert('Item har redan adderads')

        //returnea koden här kör inte koden efter 
        return
    } 
 }
 // nu kan vi skapa en liknande kart i korgen med hjälp html kod från frukt
 var cartRowContent = `
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="3">
        <button class="btn btn-danger" type="button">Tabort</button>
    </div>
 `
 cartRow.innerHTML =cartRowContent
 cartItems.append(cartRow)
 // för att kunna radera kart som laggt till korgen
 cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)

 //för att kunna uppdatera totala priset 
 cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', antalChange)
}

//--------------slut del 3 ------------


//-----del 4 ----- gå till kassa--------------
document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)

//skapa funktion för att göra köpet 
function purchaseClicked(){
    alert('Tack för ditt köp!!')

    //Efter att köpet genomförts ska vi radera alla item från korget
    var cartItems = document.getElementsByClassName('cart-items')[0]

    //loppa igenom alla cart 
    while( cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    uppdateCartItem()
}
/*---------Slut del 4 --------------------------*/