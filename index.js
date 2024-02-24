const POEM_URL = 'https://poetrydb.org/title/';
let poemLines = document.getElementById('poem-lines');
const titleTxt = document.getElementById('txt-title');
const btnSearch = document.getElementById('btn-search');

btnSearch.addEventListener('click',poemSearch)

function poemSearch() {
    fetch(POEM_URL+titleTxt.value)
        .then(response=>response.json())
        .then(responseJson=>{
            document.getElementById('error-message').innerHTML = '';
            document.getElementById('poem-title').innerHTML=responseJson[0]['title'];
            document.getElementById('poem-author').innerHTML= 'By '+responseJson[0]['author'];
            responseJson[0]['lines'].forEach(
                (line) => {
                    let para = document.createElement('p');
                    let node = document.createTextNode(line + '\n');
                    para.appendChild(node);
                    poemLines.append(para);
                }
            );
            
        })
        .catch(error=>{
            document.getElementById('poem-title').innerHTML = '';
            document.getElementById('poem-lines').innerHTML = '';
            document.getElementById('poem-author').innerHTML= '';
            let errorMessage = document.getElementById('error-message')
            console.error('Error:',error.message);
            const errorPara = document.createElement('p');
            const errornode = document.createTextNode('Error: poem not found :(');
            errorPara.appendChild(errornode);
            errorMessage.append(errorPara);
        });
}
