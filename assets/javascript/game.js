function Character(charname){
    this.name = charname;
    this.HP = 100;
    this.AP = 4;
    this.CP = 7;
    this.img = "assets/images/" + charname + ".png";
}


var charNames = ['Luke', 'Vader', 'Boba'];

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
    characterDiv.prepend("<h3 class='charName'>" + character.name + "</h3>");
    $('#characters').append(characterDiv);

}

characters.forEach(makeCharacter);

