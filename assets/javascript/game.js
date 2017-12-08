function Character(charname){
    this.name = charname;
    this.HP = Math.floor(Math.random() * 50) + 101;
    this.BAP = Math.floor(Math.random() * 4) + 4;
    this.AP = this.BAP;
    this.CP = Math.floor(Math.random() * 4) + 5;
    this.img = "assets/images/" + charname + ".png";
}

//*IMPORTANT* These names need to match up EXACTLY with img names to work *IMPORTANT*
var charNames = ['Luke', 'Vader', 'Boba', 'Han', 'Ewok'];

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
    characterDiv.one('click', function(){
        var character = $(this);
        $('#player').prepend(character);
        chooseRandEnemy();
        $('.character').off();
        character.attr("id","playerChar")
        .find('img').addClass("flipped");
        $('#attack').removeClass("invisible");
    })

}

function chooseRandEnemy(){
    var charNum = $('#characters > .character').length;
    var randCharNum = Math.floor( (Math.random() * charNum) + 1 )
    $('#opponent').append($('#characters > .character:nth-child(' + randCharNum + ')'));
}

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
        $('#graveyard').append(opponent);
        chooseRandEnemy();
    }

    
}


$('#attack').on('click', attack);

characters.forEach(makeCharacter);

