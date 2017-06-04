function visitMonsterPage(linkEnding, fullObj) {

    var url = 'https://crossorigin.me/http://summonerswar.wikia.com' + linkEnding;

    let promise = new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            dataType: 'text',
            async: false,
            success: function(data) {
                //load in data, start logging everything to store

                var monsterObj = {};

                //loads monster into page
                $('#view').html(data);

                extractBasicInfo(monsterObj);
                extractPortaitLinks(monsterObj);
                extractStars(monsterObj);
                extractBaseStats(monsterObj);
                extractMoves(monsterObj);

                console.log(monsterObj);
                resolve(monsterObj);
            }
        });
    });

    return promise.then((monsterObj) => {
        return monsterObj;
    });
};

/*
    Gets the following attributes:
    - family
    - type
    - awakens
    - awakenedName (if applicable)
*/
function extractBasicInfo(monsterObj){
    var monsterName = $('.header-column h1').text();
    if (monsterName.match(/(.*) - (.*)/)) {
        var match = monsterName.match(/(.*) - (.*)/);
        var monster = match[1].split(' ').join('_');
        var awakenedName = match[2];

        var innerMatch = match[1].match(/(.*) \((.*)\)/);

        var family = innerMatch[1];
        var type = innerMatch[2];

        monsterObj.family = family;
        monsterObj.type = type;
        monsterObj.awakens = true;
        monsterObj.awakenedName = awakenedName;

    } else {
        var monster = monsterName.split(' ').join('_');

        var innerMatch = monsterName.match(/(.*) \((.*)\)/);
        var family = innerMatch[1];
        var type = innerMatch[2];

        monsterObj.family = family;
        monsterObj.type = type;
        monsterObj.awakens = false;

    }
}

/*
    Gets the following attributes:
    - unawakened_portrait
    - awakened_portrait
*/
function extractPortaitLinks(monsterObj){

}

/*
    Gets the following attribute:
    - base_stars
*/
function extractStars(monsterObj){

}

/*
    Gets the following object:
    - base_stats
        - key (star level - can rely on extract stars being done)
        - value (object)
            - keys
                - unawakened
                - awakened
            - value (stats object)
                - hp_min
                - hp_min
                - atk_min
                - def_min
                - hp_max
                - atk_max
                - def_max
                - spd
                - crit_rate
                - crit_dmg
                - res
                - acc
*/
function extractBaseStats(monsterObj){

}

/*
    Gets the following object:
    - moves
        - unawakened (whether the unawakened version knows this skill)
        - awakened (whether the awakened version knows this skill)
        - moveIcon (image link)
        - description
        - base_formula (just string for now)
        - skill levels
            - key: level int
            - value: skillup object
                - type (damage / healing / shielding / harmful_effect / cooldown)
                - value (int)


*/
function extractMoves(monsterObj){

}

(function(console) {

    console.save = function(data, filename) {

        if (!data) {
            console.error('Console.save: No data')
            return;
        }

        if (!filename) filename = 'console.json'

        if (typeof data === "object") {
            data = JSON.stringify(data, undefined, 4)
        }

        var blob = new Blob([data], {
                type: 'text/json'
            }),
            e = document.createEvent('MouseEvents'),
            a = document.createElement('a')

        a.download = filename
        a.href = window.URL.createObjectURL(blob)
        a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        a.dispatchEvent(e)
    }
})(console)

function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}
