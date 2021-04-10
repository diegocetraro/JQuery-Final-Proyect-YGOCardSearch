$(document).ready(function(){
    $('form').on('submit', function(event){
        event.preventDefault()
        let card_name = $('.js-card_name').val()   
        $.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${card_name}`, function(data) {
                /*
                     Ajax Get Request function for getting YGOPRODECK API data. 
                    For searching a card, the API takes the card name as an input.
                */
                //FIrst validate if the card is a Monster, Spell or Trap Card...
                try{
                    if(data['data']['0']['type'] == 'Spell Card' || data['data']['0']['type'] == 'Trap Card' ){
                        //Initialize an instance of NonMonsterCard class. The data from the API is inserted in the card object constructor
                        
                        var card = new NonMonsterCard(data['data']['0']['name'],data['data']['0']['type'],data['data']['0']['race'],data['data']['0']['desc'],data['data']['0']['card_images']['0']['image_url_small'])
                        //Calls Method ShowInfo for showing the card data into HTML
                        card.showInfo()
                        card.cardData.attack.addClass("display-none")
                        card.cardData.defense.addClass("display-none")
                        card.cardData.level.addClass("display-none")
                        card.cardData.attribute.addClass("display-none")
                        $(".js-error").text("")
                        $(".js-card-box").addClass("card-box-styled")
                    }else{
                        //Initialize an instance of MonsterCard class. The data from the API is inserted in the card object constructor
                        var card = new MonsterCard(data['data']['0']['name'],data['data']['0']['type'],data['data']['0']['atk'],data['data']['0']['def'],data['data']['0']['level'],data['data']['0']['race'],data['data']['0']['attribute'],data['data']['0']['desc'],data['data']['0']['card_images']['0']['image_url_small'])
                        //Calls Method ShowInfo for showing the card data into HTML
                        card.showInfo()
                        card.cardData.attack.removeClass("display-none")
                        card.cardData.defense.removeClass("display-none")
                        card.cardData.level.removeClass("display-none")
                        card.cardData.attribute.removeClass("display-none")
                        $(".js-error").text("")
                        $(".js-card-box").addClass("card-box-styled")
                    }
                }catch(e){
                    $(".js-error").text("Card Not Found. Please enter a valid card name!")
                    $(".js-card-box").removeClass("card-box-styled")  
                }
        })
    })
    //Close button
    $('.js-button-close').on('click', function(){
        location.reload()
    })

/*
    NonMonsterCard / MonsterCard class for encapsulation
    Created both classes because the card types are Monster, spell and trap card. All the types does not have the same card attributes.
*/
class NonMonsterCard{
    //Get all other HTML Elements to show the card attributes
    cardData = {
        'card_name' : $(".js-name"),
        'type' : $(".js-card-type"),
        'attack' : $(".js-card-atk"),
        'defense' : $(".js-card-def"),
        'level' : $(".js-card-level"),
        'race' : $(".js-card-race"),
        'attribute' : $(".js-card-attr"),
        'description' : $(".js-card-desc"),
        'image' : $(".card-image")
    }
    constructor(name,type,race,description,image){
        this.name = name;
        this.type = type;
        this.race = race;
        this.description = description;
        this.image = image;
    }
    
    //Method to show the data in HTML
    showInfo = () =>{
        this.cardData.card_name.text(this.name)
        this.cardData.type.text(this.type)
        this.cardData.race.text(this.race)
        this.cardData.description.text(this.description)
        this.cardData.image.html(`<img class="js-image" src="${this.image}" alt="card">`)
    }
}

class MonsterCard{
    cardData = {
        'card_name' : $(".js-name"),
        'type' : $(".js-card-type"),
        'attack' : $(".js-card-atk"),
        'defense' : $(".js-card-def"),
        'level' : $(".js-card-level"),
        'race' : $(".js-card-race"),
        'attribute' : $(".js-card-attr"),
        'description' : $(".js-card-desc"),
        'image' : $(".card-image")
    }
    constructor(name,type,attack,defense,level,race,attribute,description,image){
        this.name = name;
        this.type = type;
        this.attack = attack;
        this.defense = defense;
        this.level = level;
        this.race = race;
        this.attribute = attribute;
        this.description = description;
        this.image = image;
    }

    //Method to show the data in HTML
    showInfo = () =>{
        this.cardData.card_name.text(this.name)
        this.cardData.type.text(this.type)
        this.cardData.attack.text(this.attack)
        this.cardData.defense.text(this.defense)
        this.cardData.level.text(this.level)
        this.cardData.race.text(this.race)
        this.cardData.attribute.text(this.attribute)
        this.cardData.description.text(this.description)
        this.cardData.image.html(`<img class="js-image" src="${this.image}" alt="card">`)
    }
}

})






