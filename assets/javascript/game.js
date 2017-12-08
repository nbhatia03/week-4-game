

function Character(charname){
    this.name = charname;
    this.HP = Math.floor(Math.random() * 50) + 101;
    this.BAP = Math.floor(Math.random() * 4) + 4;
    this.AP = this.BAP;
    this.CP = Math.floor(Math.random() * 4) + 5;
    this.img = "assets/images/" + charname + ".png";
}

//Shuffle the array of characters in order to choose random ones
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

//*IMPORTANT* These names need to match up EXACTLY with img names to work *IMPORTANT*
var allCharacters = ['Luke', 'Vader', 'Boba', 'Han', 'Ewok', 'C-3PO', 'Jawa', 'Lando', 'Leia', 'R2-D2', 'Yoda', 'Stormtrooper']

shuffleArray(allCharacters);

var charNames = [allCharacters[0], allCharacters[1], allCharacters[2], allCharacters[3], allCharacters[4] ];

var characters = charNames.map(function(v,i){
    var char  = new Character(v);
    return char;
});



function makeCharacter(character){
    var characterDiv = $('<div>'),
        img = $('<img>');

    characterDiv.append(img)
    .addClass('character');
    img.attr("src", character.img)
    .addClass('charImg');
    characterDiv.prepend("<h3 class='charName'>" + character.name + "</h3>")
    .append("<h4 class='charHP'>" + character.HP + "</h4>");
    characterDiv.attr({
        "data-HP": character.HP,
        "data-AP": character.AP,
        "data-CP": character.CP,
        "data-BAP": character.BAP
    })
    $('#characters').append(characterDiv);
    
    characterDiv.on('click', function(){
        var character = $(this);
        //if a player hasn't been selected
        if($('#player').children('.character').length === 0){
            character.hide('slow');
            $(this).off()
            setTimeout(function(){
                $('#player').prepend(character);
                character.attr("id","playerChar")
                .find('img').addClass("flipped");
                character.show('slow');
            }, 1000)
        } //if a player's been selected and an enemy hasn't
        else if($('#player').children('.character').length > 0 && $('#opponent').children().length === 0){
            character.hide('slow').show('slow');
            setTimeout(function(){
                $('#opponent').append(character)
            }, 600)
            $('#attack').removeClass("invisible");
            console.log('This is your opponent');
        }//if a player and opponent have been selected
        else{
            console.log('Defeat your opponent first')
        }
    })

}

// function chooseRandEnemy(){
//     var charNum = $('#characters > .character').length;
//     var randCharNum = Math.floor( (Math.random() * charNum) + 1 )
//     $('#opponent').append($('#characters > .character:nth-child(' + randCharNum + ')'));
// }

function attack(){
    var player = $('#player > #playerChar'),
        opponent = $('#opponent > .character'),
        playerAP = Number(player.attr('data-ap')),
        playerBAP = Number(player.attr('data-bap')),
        playerHP = Number(player.attr('data-hp')),
        opponentHP = Number(opponent.attr('data-hp')),
        opponentCP = Number(opponent.attr('data-cp'));
    
    opponentHP -= playerAP;
    opponent.attr('data-hp', opponentHP);
    playerHP -= opponentCP;
    player.attr('data-hp', playerHP);

    player.children('.charHP').text(playerHP)
    opponent.children('.charHP').text(opponentHP);

    playerAP += playerBAP;
    player.attr('data-ap', playerAP);

    if(opponentHP <= 0){
        opponent.children('.charHP').text('');
        $('#graveyard').append(opponent);
        $('#attack').addClass('invisible');
    }

    
}


$('#attack').on('click', attack);

characters.forEach(makeCharacter);



//Add timeout events when attack button is pressed
//Possibly turn images to Gifs
