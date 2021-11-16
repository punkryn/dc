const axios = require('axios');
const cheerio = require('cheerio');

let $href = [];
let txt = '';
const parsed = () => {
    axios.get("https://gall.dcinside.com/board/lists?id=dcbest")
    .then((response) => {
        // console.log(response.data);
        const $ = cheerio.load(response.data);
        // txt = $("table.gall_list > tbody > tr > td > a").text();

        $("table.gall_list > tbody > tr > td > a").each((index, value) => {
            // console.log(value.attribs);
            const tmp = value.attribs.href;
            if(tmp && !tmp.startsWith("https://")){
                // txt = $("table.gall_list > tbody > tr > td > a").text();
                // if(txt.includes("[しぞ]")){
                $href.push(value.attribs.href);
                // }
            }
            // console.log(value.attribs.href);
        })
    })
    .then((res) => {
        $href.unshift();
        console.log($href);
        // console.log(txt);
        
        // while(count < 3){
        $href.forEach(item => (
            axios.get("https://gall.dcinside.com" + item)
                .then((response) => {
                    const $ = cheerio.load(response.data);

                    let title = $("div.view_content_wrap > header > div > h3 > span").text();
                    if(title.includes('[しぞ]')){
                        console.log(title);
                    }
                })
                .catch((error) => {
                    console.dir(error);
                })
        ))
            
        // }
        
    })
    .catch((error) => {
        console.dir(error);
    })
}

parsed();