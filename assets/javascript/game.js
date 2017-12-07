function Character(charname){
    this.name = charname;
    this.HP = Math.floor(Math.random() * 50) + 101;
    this.AP = Math.floor(Math.random() * 4) + 4;
    this.CP = Math.floor(Math.random() * 4) + 5;
    this.img = "assets/images/" + charname + ".png";
}

//*IMPORTANT* These names need to match up EXACTLY with img names to work *IMPORTANT*
var charNames = ['Luke', 'Vader', 'Boba', 'Han', 'Ewok'];

var characters = charNames.map(function(v,i){
    var char  = new Character(v);
    return char;
});



var makeCharacter = function(character){
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
        "data-CP": character.CP
    })
    $('#characters').append(characterDiv);
    characterDiv.one('click', function(){
        var character = $(this);
        $('#player').prepend(character);
        var charNum = $('#characters > .character').length;
        var randCharNum = Math.floor( (Math.random() * charNum) + 1 )
        $('#opponent').append($('#characters > .character:nth-child(' + randCharNum + ')'));
        $('.character').off();
        character.attr("id","playerChar")
        .find('img').addClass("flipped");
        $('#attack').removeClass("invisible");
    })

}

characters.forEach(makeCharacter);

