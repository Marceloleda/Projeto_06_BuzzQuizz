//Variáveis globais
let quizzesApi = [];
let quiz_api = [];
let tituloQuizz = "";
let urlImage = "";
let quantidadePerguntas = "";
let quantidadeNiveis = "";
let questions; 

// tela 3.2 formulario 

let createdQuizz ={
    title: "Título do quizz",
    image: "https://http.cat/411.jpg",
    questions: [],
    levels: []
};
let question={
    title: "Título da pergunta 1",
    color: "#123456",
    answers: []
};
let answer={
    text: "Texto da resposta 1",
    image: "https://http.cat/411.jpg",
    isCorrectAnswer: true
};
let emptyAnswer={
    text: " ",
    image: " ",
    isCorrectAnswer: false
};
let level ={
    title: "Título do nível 1",
    image: "https://http.cat/411.jpg",
    text: "Descrição do nível 1",
    minValue: 0
};
// Tela 1 - Pegando Quizzes da API
function buscandoQuizzes() {
    let promise = axios.get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes")
    promise.then(carregandoQuizzes);
    promise.catch(erroQuizzes);
}

function carregandoQuizzes(quizzes) {
    console.log("Os quizzes da API foram carregados");
    quizzesApi = quizzes.data;
    console.log("A quantidade de quizzes é: " + quizzesApi.length);
    console.log(quizzesApi[0].title)
    console.log(quizzesApi[0].image)
    renderizandoQuizzes()
}
function erroQuizzes() {
    console.log("Os quizzes não foram carregados")
}
function renderizandoQuizzes() {
    let todosOsQuizzes = document.querySelector(".lista-quizzes")
        todosOsQuizzes.innerHTML = "";
       
        for(let i=0; i<quizzesApi.length; i++) {
            todosOsQuizzes.innerHTML += `
                <div class="quiz" id="${quizzesApi[i].id}">
                    <img src="${quizzesApi[i].image}" alt="">
                    <h3 onclick="obtendoQuizz(${quizzesApi[i].id})">${quizzesApi[i].title}</h3>
                </div>
                
            `
        }
}

//tela 2: Página de um quizz
function obtendoQuizz(meuId) {
    let removendotela2 = document.querySelector(".criar-quizz")
    removendotela2.classList.add("removendo-tela")
    let removendotela3 = document.querySelector(".quizzes-api")
    removendotela3.classList.add("removendo-tela")
    
    let identificador = meuId
  
    console.log("o ID obtido é: " + identificador);
    let requisicao = "https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/" + identificador

    let promise = axios.get(requisicao);
    promise.then(carregandoQuiz);
    promise.catch(erroQuiz);
}
function carregandoQuiz(resposta) {
    console.log("O quiz foi carregado")
    let paginaDoQuizz = document.querySelector(".perguntas")
    paginaDoQuizz.classList.remove("removendo-tela")
    let cabecalhoDoQuizz = document.querySelector(".header-pag-quizz")
    cabecalhoDoQuizz.classList.remove("removendo-tela")

    quiz_api = resposta.data

    cabecalhoDoQuizz.innerHTML = `
    <img src="${quiz_api.image}" alt="">
    <h3> ${quiz_api.title}</h3>
    `
    
    console.log(quiz_api.title)
    console.log(" A quantidade de PERGUNTAS É: "+ quiz_api.questions.length);
    console.log(" A quantidade de ALTERNATIVAS É: "+ quiz_api.questions[0].answers.length);
    //embaralhando respostas 
   
    for(let k=0;k<quiz_api.questions.length;k++) {
       resposta[k] = quiz_api.questions[k].answers;
       resposta[k].sort(embaralhar)
       console.log(resposta[k])
    }
  //As respostas estão guardadas nas arrays respostas[i][j], onde i é a quantidade de perguntas e j é a quantidade de alternativas que essa pergunta tem
  
    console.log("a resposta da vez é: " + resposta[1][0].text)
    console.log("a primeira pergunta tem quantas alternativas? " + resposta[0].length);
   

    function setAternativas(questionIndex) {
        let alternativa = "";
        for (let j= 0; j<resposta[0].length;j++) {
            
            alternativa += `
            <div class="conteudo-pergunta">
                <img src="${resposta[questionIndex][j].image}" alt="">
                <h3>${resposta[questionIndex][j].text} </h3>
            </div>           
        `
       
    } return alternativa
    }
    paginaDoQuizz.innerHTML = ""

    for(let i=0; i < quiz_api.questions.length;i++) {
        const alternativas = setAternativas(i)

            paginaDoQuizz.innerHTML += `
        <div class="pergunta${i}">
            <div class="pergunta${i}-titulo">
                ${quiz_api.questions[i].title} 
            </div>
             
            <div class="imagens-perguntas">
            ${alternativas}
                
            </div>
        </div>
        `
}
//Esse resultado final dependerá das escolhas feitas, esse h3 colocado abaixo é ilustrativo
    paginaDoQuizz.innerHTML += `
    <div class="resultado-quizz">
            <div class="resultado-titulo">
                <h3>${quiz_api.levels[0].title} </h3>
            </div>
            <div class="resultado-conteudo">
                <div class="resultado-conteudo-imagem"> 
                    <img src="${quiz_api.levels[0].image}" alt=""> 
                </div>
                <div class="resultado-conteudo-texto">
                    <h3> ${quiz_api.levels[0].text}</h3>
                </div>
            </div>
            <div class="resultado-butoes">
                <button class="reiniciar-quizz" onclick="rolarCima()" > Reiniciar Quizz</button>
                <button onclick="reiniciar()" class="voltar-home"> Voltar para Home</button>
             </div>
        </div>
    `
}
function rolarCima(){
    window.scrollTo(0, 0)
    const reload = document.queryCommandValue('.criar-quizz');
    reload.location.reload();
}
function erroQuiz() {
    console.log("O quiz NÃO foi carregado")
}
function reiniciar(){
    window.location.reload()
}
function embaralhar() {
    return Math.random() - 0.5;    
}


//função criarQuizz 3.1
function criarQuizz() {
    let removendotela = document.querySelector(".criar-quizz");
    removendotela.classList.add("removendo-tela");
    let removendoQuizzes = document.querySelector(".quizzes-api");
    removendoQuizzes.classList.add("removendo-tela");

   infoBasica(); 

}
//Criação da tela Tela 3.1 - Info básica do Quiz
function infoBasica(){
    let infoQuizz = document.querySelector('.tela-3-1');
    let formularioBasico =`
        <h1>Comece pelo começo</h1>
        <div class="infoQuizz">
            <input id="a1" class="tituloQuizz" type="text" minlength="20" maxlength="65" x-moz-errormessage="" placeholder="Título do seu quizz" >
            <input id="a2" class="urlImage" type="url" placeholder="URL da imagem do seu quizz">
            <input id="a3" class="quantidadePerguntas" type="number" min="3" placeholder="Quantidade de perguntas do quizz">
            <input id="a4" class="quantidadeNiveis" type="number" min="2" placeholder="Quantidade de níveis do quizz">
        </div>
        <button type="submit" onclick="proximoFormulario()">Prosseguir pra criar perguntas</button>
    `;
    infoQuizz.innerHTML += formularioBasico;
}


function isValidHttpUrl(string) { 
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
    return true;
}
function isValidColor(string){
    if(string[0]=="#"){
        if(string.length==7){
            return true;
        }
    }
    return false;
}
//Validação para proxima tela 3.2
function proximoFormulario(){
    title=document.getElementById("a1").value;
    image=document.getElementById("a2").value;
    questions=document.getElementById("a3").value;
    levels=document.getElementById("a4").value;
    if(title.length<20 || title.length>65){
        alert(`Escolha um título com entre 20 e 65 caractéres, o seu está com ${title.length}`);
        return;
    }
    if(!isValidHttpUrl(image)){
        alert('Insira uma url de imagem válida');
        return;
    }
    if(questions<3){
        alert('Mínimo de 3 perguntas');
        return;
    }
    if(levels<2){
        alert('Mínimo de 2 níveis');
        return;
    }
    console.log("title: "+title);
    createdQuizz.title=title;

    console.log("createdquizz.title: "+createdQuizz.title);
    createdQuizz.image=image;
    const div = document.querySelector(".tela-3-1");
    div.remove();
    perguntasQuizz();

}

//Dados das informações básicas da tela 3.1
function guardaDadosTelaInfoBasicas(){
    tituloQuizz = document.querySelector(".tituloQuizz").value;
    urlImage = document.querySelector(".urlImage").value;
    quantidadePerguntas = document.querySelector(".quantidadePerguntas").value;
    quantidadeNiveis = document.querySelector(".quantidadeNiveis").value;
    console.log(tituloQuizz)
    console.log(urlImage)
    console.log(quantidadePerguntas)
    console.log(quantidadeNiveis)
    const div = document.querySelector(".tela-3-1");
    div.remove();
    perguntasQuizz();
}


//Validação tela 3.2


//função para criar a Tela 3.2 - Perguntas do Quiz
function perguntasQuizz(){
   
    let criaPergunta = document.querySelector('.tela-3-2');
    criaPergunta.innerHTML = ` <h1>Crie suas perguntas</h1>`
    for (let i=0; i < questions;i++) {
        criaPergunta.innerHTML +=  `
        <div class="perguntasQuizz">
            <div> <h1>Pergunta ${i+1}</h1> </div>
            <input id="a${i+1}1" class="textoPergunta${i+1}" type="text" minlength="20" x-moz-errormessage="" placeholder="Texto da pergunta" >
            <input id="a${i+1}2" class="corPergunta${i+1}" type="text" pattern="#[0-9a-fA-F]{4,8}" maxlength="8" placeholder="Digite uma cor de fundo em hexadecimal (comece com #)">

            <div> <h2>Resposta correta</h2> </div>
            <input id="a${i+1}3" class="respostaCorreta${i+1}" type="text" minlength="1" placeholder="Resposta correta">
            <input id="a${i+1}4" class="urlDaImage${i+1}" type="url" placeholder="URL da imagem">
            

            <div> <h2>Respostas incorretas</h2> </div>
            <input id="a${i+1}5" class="respostaIncorreta${i+2}" type="text" minlength="1" placeholder="Resposta incorreta 1">
            <input id="a${i+1}6" class="urlDaImage${i+2}" type="url" placeholder="URL da imagem 1">

            <input id="a${i+1}7" class="respostaIncorreta${i+3}" type="text" placeholder="Resposta incorreta 2">
            <input id="a${i+1}8" class="urlDaImage${i+3}" type="url" placeholder="URL da imagem 2">

            <input id="a${i+1}9" class="respostaIncorreta${i+4}" type="text" placeholder="Resposta incorreta 3">
            <input id="a${i+1}10" class="urlDaImage${i+4}" type="url" placeholder="URL da imagem 3">
        </div>
        `
    }
    criaPergunta.innerHTML += `<button onclick="validacaoTela2()">Prosseguir pra criar níveis</button>`
    
        
}
function validacaoTela2() {
    for(let i =0;i<questions;i++){
        question.title=document.getElementById(`a${i+1}1`).value;
        question.color=document.getElementById(`a${i+1}2`).value;
        
        answer.text=document.getElementById(`a${i+1}3`).value;
        if(answer.text==""){
            alert('Insira um texto para a resposta');
            return;
        }
        answer.image=document.getElementById(`a${i+1}4`).value;
        if(!isValidHttpUrl(answer.image)){
            alert('Insira uma url de imagem válida');
            return;
        }
        answer.isCorrectAnswer=true;
        question.answers[0]=answer;

        answer.text=document.getElementById(`a${i+1}5`).value;
        if(answer.text==""){
            alert('Insira um texto para a resposta');
            return;
        }
        answer.image=document.getElementById(`a${i+1}6`).value;
        if(!isValidHttpUrl(answer.image)){
            alert('Insira uma url de imagem válida');
            return;
        }
        answer.isCorrectAnswer=false;
        question.answers[1]=answer;

        answer.text=document.getElementById(`a${i+1}7`).value;
        answer.image=document.getElementById(`a${i+1}8`).value;
        answer.isCorrectAnswer=false;
        if(answer.text!=""){
            if(!isValidHttpUrl(answer.image)){
                alert('Insira uma url de imagem válida');
                return;
            } 
        }
        if(answer.text==""){
            question.answers[2]=emptyAnswer;
        }else{
            question.answers[2]=answer;
        }

        answer.text=document.getElementById(`a${i+1}9`).value;
        answer.image=document.getElementById(`a${i+1}10`).value;
        answer.isCorrectAnswer=false;
        if(answer.text!=""){
            if(!isValidHttpUrl(answer.image)){
                alert('Insira uma url de imagem válida');
                return;
            } 
        }
        if(answer.text==""){
            question.answers[3]=emptyAnswer;
        }else{
            question.answers[3]=answer;
        }

        if(question.title.length<20){
            alert(`Escolha um título com no mínimo 20 caractéres`);
            return;
        }
        if(!isValidColor(question.color)){
            alert('Insira uma cor válida');
            return;
        }
        createdQuizz.questions[i]=question;
    }
tela33();
}

// Função tela33: Essa função escreve a tela 3-3 e será ativada ao final da tela 3-2

function tela33() {
    let escrevendotela = document.querySelector(".tela-3-3");
    let criaPergunta = document.querySelector(".tela-3-2");
    criaPergunta.classList.add("removendo-tela")
    escrevendotela.classList.remove("removendo-tela")
    
    escrevendotela.innerHTML = ""

    escrevendotela.innerHTML += `<div class="titulo-tela-3-3">
    <h3>Agora, decida os níveis</h3>
    </div> `

        for(let i=0;i<levels;i++) {
         
            escrevendotela.innerHTML += `
            <div class="nivel">
                <div class="nivel-cabecalho">
                    <h4>Nível ${i+1}</h4>
                    <img class="imagem-nivel-2" src="imagens/Vector.png" alt="">
                </div>
                
                <input id="a${i+1}1" placeholder="Título do nível" type="text" value=""> <br> <br>
                <input id="a${i+1}2" placeholder="% de acerto mínima" type="text" value="">  <br> <br>
                <input id="a${i+1}3" placeholder="URL da imagem do nível" type="text" value="">  <br> <br>
                <input id="a${i+1}4" placeholder="Descrição do nível" type="text" value="">
            </div>
        ` } 
    
            escrevendotela.innerHTML += `<div class="botao-finalizar-quizz">
            <button onclick="finalizarQuizz()" value="">
                <h3> Finalizar Quizz</h3>
            </button>
        </div>
            `
}

// final da função tela33

// Função finalizarQuizz: Essa função será ativada ao final da tela 3-3, quando clicarmos no botão de finalizar Quizz

function finalizarQuizz() {
    let zero=false;
    for(let i =0;i<levels;i++){
        level.title=document.getElementById(`a${i+1}1`).value;
        if(level.title.length<10 ){
            alert(`Escolha um título com no mínimo 10 caractéres`);
            return;
        }
        level.minValue=document.getElementById(`a${i+1}2`).value;
        if(level.minValue=="0"){
            zero=true;
        }
        if(!(level.minValue>=0 || level.minValue<=100)){
            alert('Insira um valor de 0 a 100 para o nível');
            return;
        }
        level.image=document.getElementById(`a${i+1}3`).value;
        if(!isValidHttpUrl(level.image)){
            alert('Insira uma url de imagem válida');
            return;
        }
        level.text=document.getElementById(`a${i+1}4`).value;
        if(level.text.length<30 ){
            alert(`Escolha uma descrição com no mínimo 30 caractéres`);
            return;
        }

        createdQuizz.levels[i]=level;
    }
    if(zero==false){
        alert("Pelo menos um dos níveis deve ter o valor 0");
        tela33();
    }

    enviandoQuizz()
    /////////// postando quizz
    
}

// Final da função finalizar Quizz

// Função tela 3-4
function tela34() {
    let escrevendotela = document.querySelector(".tela-3-4")
    escrevendotela.classList.remove("removendo-tela")
    escrevendotela.innerHTML = ` <div class="titulo-3-4">
    <h2>Seu quizz está pronto</h2>
</div>
<h2> (Aqui estará o Quizz finalizado)</h2>
<footer>
    <button>
        <h3>Acessar Quizz</h3>
    </button>
    <h3> Voltar pra home</h3>
</footer>   
    `
}
 
function enviandoQuizz() {

    let promise=axios.post('https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes',createdQuizz);
    promise.then(finalizandoEnvio);
    promise.catch(erroEnvioQuizz)

}

function finalizandoEnvio() {
    console.log("quizz enviado")
}
function erroEnvioQuizz() {
    console.log("Erro no envio do Quizz")
}


buscandoQuizzes();