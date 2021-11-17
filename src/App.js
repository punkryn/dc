import React, { useState, useCallback } from 'react' ;
import cheerio from 'cheerio';
import axios from 'axios';

const dcUrl = "http://cors-anywhere.herokuapp.com/https://gall.dcinside.com/board/lists?id=dcbest";
const tmpUrl = "http://cors-anywhere.herokuapp.com/https://ko.javascript.info";

const rule1 = "table.gall_list > tbody > tr > td > a";
const rule2 = "div.list-sub__title > a";

function App() {
  const [list, setList] = useState(['']);
  const [html, setHtml] = useState('');
  const [flag, setFlag] = useState(false);
  const [imgSrc, setImgSrc] = useState(['']);

  const sendReq = async () => {
    setHtml('');
    const response1 = await axios(dcUrl, {
      method: 'GET',
    });
    console.log(response1);

    const response2 = await axios('http://localhost:3001/title', {
      method: 'POST',
      data: {
        htmlreq: response1.data,
      },
    });

    console.log(response2);

    for(let i = 0; i < 1; i++){
      try {
        // await iter(response2.data[i]);
        await iter("/board/view/?id=dcbest&no=30322&page=2");

      } catch(err) {
        console.dir(err);
      }
    }

    
  };

  const iter = (prefix) => {
    const url = "http://cors-anywhere.herokuapp.com/https://gall.dcinside.com" + prefix;
    console.log(url);

    return new Promise(async (resolve, reject) => {
      try{
        const response1 = await axios(url, {
          method: 'GET',
        });
  
        const response2 = await axios('http://localhost:3001/prefix', {
          method: 'POST',
          data: {
            prefix: response1.data,
          }
        });

        console.log(response2.data);
        setImgSrc(response2.data);

        resolve('success');
      } catch(err) {
        console.log(err);
        reject('err');
      }
    })
  }

  const exploreSite = async () => {
    for(let i = 0; i < 1; i++){
      try {
        await iter(list[i]);
      } catch(err) {
        console.dir(err);
      }
    }
  }

  return (
    <div className="App">
      <button onClick={sendReq}>Button</button>
      {flag && (
        <button onClick={exploreSite}>show</button>
      )
      }
      {imgSrc.map((item, index) => {
        return <img src={item} key={index} />
      })}

      <img src="logo192.png"></img>
    </div>
  );
}

export default App;
