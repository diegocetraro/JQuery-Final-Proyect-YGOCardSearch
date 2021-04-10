$(document).ready(function(){

    $('.js-button-search').on('click', function(){
        let random_number = Math.ceil(Math.random()*100)
        console.log(random_number)
        $.get(`https://swapi.dev/api/people/${random_number}/`, function(data){
            $('.js-name').text(`Name: ${data['name']}`)
            $('.js-height').text(`Height: ${data['height']}`)
            $('.js-mass').text(`mass: ${data['mass']}`)
            $('.js-gender').text(`gender: ${data['gender']}`)
            $('.js-birthday').text(`birthday: ${data['birth_year']}`)
            $('.js-character-info').fadeIn()
            $('div.js-character-info').removeClass("d-none")

        })
    })

    $('.js-button-close').on('click',function(){
        $('.js-character-info').fadeOut()
    })
})