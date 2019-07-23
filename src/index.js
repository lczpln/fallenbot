const axios = require('axios');

var api = `https://www.fallensword.com/fetchdata.php?a=2&d=1683&id=17098678&passback=0&_=1563886868965`;

var headers = {
    "Host": "www.fallensword.com",
    "Connection": "keep-alive",
    "Accept": "application/json, text/javascript, */*; q=0.01",
    "X-Requested-With": "XMLHttpRequest",
    "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Mobile Safari/537.36",
    "Referer": "https://www.fallensword.com/index.php?cmd=world",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
    "Cookie": "__cfduid=d54b575a39bdc0e598bcd32f9be9085151563814600; fsId=178085; _ga=GA1.2.567759758.1563814616; _gid=GA1.2.1004130104.1563814616; fsSessionKey=ZRkCEABfleAJyntSESVl47dSmrVzssqX; _gat=1; LB=node-140262229|XTcFM|XTcEb"

};

var restTime = 0

async function killMonster() {
    var stamina = 99999;

    for (let i = 0; i >= 0; i++) {
        if (stamina > 20) {
            try {
                const response = await axios.get(api, { headers });
                console.clear();

                const { player } = response.data;

                stamina = player.stamina.current;

                if (stamina > 20) restTime = 0;

                console.log(`
            =========================================
                    LEVEL: ${player.level}
                    XP: ${player.xp.current} / ${player.xp.next}
                    STAMINA: ${stamina} 
                    KILLS: ${i}
            =========================================
                `)
            } catch (error) {
                return console.log("REQUEST ERROR: => " + error)
            }
        } else {
            console.log(`
            =========================================
                    REST_TIME: ${restTime} MINUTES
                    RESTING...
            =========================================

            `)
            restTime = restTime + 1
            return setTimeout(() => { killMonster() }, 1000 * 60)
        }
    }

}


killMonster();