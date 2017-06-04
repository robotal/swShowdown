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
function extractBasicInfo(monsterObj) {
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
function extractPortaitLinks(monsterObj) {

}

/*
    Gets the following attribute:
    - base_stars
*/
function extractStars(monsterObj) {

    if (monsterObj.awakens) {

        var starText = $('img[alt="Gold Star"]').parent()[0].innerText;

        if (starText.match(/^\(x(\d)\)$/)) {
            var match = starText.match(/^\(x(\d)\)$/);

            var stars = parseInt(match[1]);
            monsterObj.base_stars = stars;
        } else {
            monsterObj.base_stars = 1;
        }
    } else {

        var starText = $('img[alt="Silver Star"]').parent()[0].innerText;

        if (starText.match(/^\(x(\d)\)$/)) {
            var match = starText.match(/^\(x(\d)\)$/);

            var stars = parseInt(match[1]);
            monsterObj.base_stars = stars;
        } else {
            monsterObj.base_stars = 1;
        }
    }
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
function extractBaseStats(monsterObj) {

    var tableText = $('.boxborder')['2'].outerText;
    var re = /\d+/g;

    var table_vals = [];

    var match;

    do {
        match = re.exec(tableText);
        if (match) {
            table_vals.push(parseInt(match[0]));
        }
    } while (match);

    var statsObj = {};
    monsterObj.base_stats = statsObj;

    var stars = monsterObj.base_stars;

    for (var i = stars; i <= 6; i++) {
        statsObj[i] = {};
    }

    var curIndex = 7 - stars;

    //unawakened stats
    for (var i = stars; i <= 6; i++) {
        statsObj[i]['unawakened'] = {};
    }

    for (var i = stars; i <= 6; i++) {
        statsObj[i]['unawakened']['hp_min'] = table_vals[curIndex];
        curIndex++;
        statsObj[i]['unawakened']['hp_max'] = table_vals[curIndex];
        curIndex++;
    }

    for (var i = stars; i <= 6; i++) {
        statsObj[i]['unawakened']['atk_min'] = table_vals[curIndex];
        curIndex++;
        statsObj[i]['unawakened']['atk_max'] = table_vals[curIndex];
        curIndex++;
    }

    for (var i = stars; i <= 6; i++) {
        statsObj[i]['unawakened']['def_min'] = table_vals[curIndex];
        curIndex++;
        statsObj[i]['unawakened']['def_max'] = table_vals[curIndex];
        curIndex++;
    }

    if(monsterObj.awakens){
        //unawakened stats
        for (var i = stars; i <= 6; i++) {
            statsObj[i]['awakened'] = {};
        }

        for (var i = stars; i <= 6; i++) {
            statsObj[i]['awakened']['hp_min'] = table_vals[curIndex];
            curIndex++;
            statsObj[i]['awakened']['hp_max'] = table_vals[curIndex];
            curIndex++;
        }

        for (var i = stars; i <= 6; i++) {
            statsObj[i]['awakened']['atk_min'] = table_vals[curIndex];
            curIndex++;
            statsObj[i]['awakened']['atk_max'] = table_vals[curIndex];
            curIndex++;
        }

        for (var i = stars; i <= 6; i++) {
            statsObj[i]['awakened']['def_min'] = table_vals[curIndex];
            curIndex++;
            statsObj[i]['awakened']['def_max'] = table_vals[curIndex];
            curIndex++;
        }
    }

    var tableText = $('.boxborder')['3'].outerText;

    var table_vals = [];

    do {
        match = re.exec(tableText);
        if (match) {
            table_vals.push(parseInt(match[0]));
        }
    } while (match);

    for (var i = stars; i <= 6; i++) {
        statsObj[i]['unawakened']['spd'] = table_vals[0];
        statsObj[i]['unawakened']['crit_rate'] = table_vals[1];
        statsObj[i]['unawakened']['crit_dmg'] = table_vals[2];
        statsObj[i]['unawakened']['res'] = table_vals[3];
        statsObj[i]['unawakened']['acc'] = table_vals[4];

        if(monsterObj.awakens){
            statsObj[i]['awakened']['spd'] = table_vals[5];
            statsObj[i]['awakened']['crit_rate'] = table_vals[6];
            statsObj[i]['awakened']['crit_dmg'] = table_vals[7];
            statsObj[i]['awakened']['res'] = table_vals[8];
            statsObj[i]['awakened']['acc'] = table_vals[9];
        }
    }
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
function extractMoves(monsterObj) {

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
