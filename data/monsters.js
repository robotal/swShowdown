exports.monsters = {
    'slime_(fire)': {
        'family': 'Slime',
        'type': 'Fire',
        'awakens': false,
        'unawakened_portrait': 'https://vignette2.wikia.nocookie.net/summoners-war-sky-arena/images/7/77/Slime_%28Fire%29_Icon.png/revision/latest?cb=20170509104944',
        'base_stars': 1,
        'base_stats': {
            1: {
                'unawakened': {
                    'hp_min': 450,
                    'atk_min': 30,
                    'def_min': 60,
                    'hp_max': 900,
                    'atk_max': 60,
                    'def_max': 120,
                    'spd': 102,
                    'crit_rate': 15,
                    'crit_dmg': 50,
                    'res': 15,
                    'acc': 0
                }
            },
            2: {
                'unawakened': {
                    'hp_min': 720,
                    'atk_min': 48,
                    'def_min': 96,
                    'hp_max': 1365,
                    'atk_max': 91,
                    'def_max': 182,
                    'spd': 102,
                    'crit_rate': 15,
                    'crit_dmg': 50,
                    'res': 15,
                    'acc': 0
                }
            },
            3: {
                'unawakened': {
                    'hp_min': 1095,
                    'atk_min': 73,
                    'def_min': 145,
                    'hp_max': 1965,
                    'atk_max': 131,
                    'def_max': 262,
                    'spd': 102,
                    'crit_rate': 15,
                    'crit_dmg': 50,
                    'res': 15,
                    'acc': 0
                }
            },
            4: {
                'unawakened': {
                    'hp_min': 1575,
                    'atk_min': 105,
                    'def_min': 209,
                    'hp_max': 2670,
                    'atk_max': 178,
                    'def_max': 356,
                    'spd': 102,
                    'crit_rate': 15,
                    'crit_dmg': 50,
                    'res': 15,
                    'acc': 0
                }
            },
            5: {
                'unawakened': {
                    'hp_min': 2145,
                    'atk_min': 143,
                    'def_min': 285,
                    'hp_max': 3630,
                    'atk_max': 242,
                    'def_max': 484,
                    'spd': 102,
                    'crit_rate': 15,
                    'crit_dmg': 50,
                    'res': 15,
                    'acc': 0
                }
            },
            6: {
                'unawakened': {
                    'hp_min': 2910,
                    'atk_min': 194,
                    'def_min': 387,
                    'hp_max': 4935,
                    'atk_max': 329,
                    'def_max': 659,
                    'spd': 102,
                    'crit_rate': 15,
                    'crit_dmg': 50,
                    'res': 15,
                    'acc': 0
                }
            }
        }
        'moves': {
            'Jump Slam': {
                'unawakened': true,
                'awakened': false,
                'description': 'Performs a jump attack, reducing the enemy\'s Attack Speed with a 30% chance.',
                'base_formula': '330% +35' //function which takes in monster (stats + skill level)
                'skill_levels': {
                    2: {
                        type: 'damage', //damage, healing (shielding), harmful effect
                        value: 5
                    },
                    3: {
                        type: 'damage',
                        value: 5
                    },
                    4: {
                        type: 'harmful_effect',
                        value: 10
                    },
                    5: {
                        type: 'damage',
                        value: 10
                    },
                    6: {
                        type: 'harmful_effect',
                        value: 10
                    },
                    7: {
                        type: 'damage',
                        value: 10
                    },
                    8: {
                        type: 'harmful_effect',
                        value: 15
                    }
                }
            }
        }
    },
};
