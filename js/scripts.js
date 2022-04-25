//Variáveis globais
let quizzesApi = [];
let quiz_api = [];
let tituloQuizz = "";
let urlImage = "";
let quantidadePerguntas = "";
let quantidadeNiveis = "";
// let textoPergunta = document.querySelector(".textoPergunta").value;
let corPergunta = ""; 
let respostaIncorreta1 = "";
let urlDaImage1 = ""; 
let respostaIncorreta2 = "";
let urlDaImage2 = ""; 
let respostaIncorreta3 = "";
let urlDaImage3 = ""; 
let respostaIncorreta4 = "";
let urlDaImage4 = ""; 
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
    let i = 0;
    let alternativa = "" 
  //uma solução é colocar outro loop de i aqui dentro
        for (let j= 0; j<resposta[0].length;j++) {
        alternativa += `
        <div class="conteudo-pergunta">
            <img src="${resposta[i][j].image}" alt="">
            <h3>${resposta[i][j].text} </h3>
        </div>           
    `
    }


    paginaDoQuizz.innerHTML = ""

    for(let i=0; i < quiz_api.questions.length;i++) {

            paginaDoQuizz.innerHTML += `
        <div class="pergunta${i}">
            <div class="pergunta${i}-titulo">
                ${quiz_api.questions[i].title} 
            </div>
             
            <div class="imagens-perguntas">
            ${alternativa}
                
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
                <button class="reiniciar-quizz"> Reiniciar Quizz</button>
                <button onclick="reiniciar()" class="voltar-home"> Voltar para Home</button>
             </div>
        </div>
    `
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
//Validação para proxima tela 3.2
function validacaoTela1(){
    let input = document.querySelector(".infoQuizz input:invalid");
    let inputNull = document.querySelectorAll("input");
    let validacao1;
    let validacao2;
    if(inputNull[0].value == "" || inputNull[1].value == "" || inputNull[2].value == "" || inputNull[3].value == ""){
        alert("Ops! Preencha todos os campos para prosseguir! ;)");
    }else{validacao1 = true;}
   
    if(input){
        alert("Ops! Algo de errado não está certo...Coloque o mouse em cima da caixa vermelha e veja os critérios para prosseguir! ;)");
    }else{validacao2 = true;}

    if(validacao1 && validacao2 ){
        guardaDadosTelaInfoBasicas();
    }
}
function proximoFormulario(){
    validacaoTela1();
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

//Criação da tela Tela 3.1 - Info básica do Quiz
function infoBasica(){
    let infoQuizz = document.querySelector('.tela-3-1');
    let formularioBasico =`
        <h1>Comece pelo começo</h1>
        <div class="infoQuizz">
            <input class="tituloQuizz" type="text" minlength="20" maxlength="65" x-moz-errormessage="" placeholder="Título do seu quizz" >
            <input class="urlImage" type="url" placeholder="URL da imagem do seu quizz">
            <input class="quantidadePerguntas" type="number" min="3" placeholder="Quantidade de perguntas do quizz">
            <input class="quantidadeNiveis" type="number" min="2" placeholder="Quantidade de níveis do quizz">
        </div>
        <button type="submit" onclick="proximoFormulario()">Prosseguir pra criar perguntas</button>
    `;
    infoQuizz.innerHTML += formularioBasico;
}
//Validação tela 3.2
function validacaoTela2(){
    let input = document.querySelector(".perguntasQuizz input:invalid");
    let inputNull = document.querySelectorAll("input");
    let validacao3;
    let validacao4;
    
    if(inputNull[0].value == "" || inputNull[1].value == "" || inputNull[2].value == "" || inputNull[3].value == "" || inputNull[4].value == "" || inputNull[5].value == ""){
        alert("Ops! Preencha todos os campos para prosseguir! Preencha pelo menos até uma resposta incorreta ;)");
    }else{validacao3 = true;}
   
    if(input){
        alert("Ops! Algo de errado não está certo...Coloque o mouse em cima da caixa vermelha e veja os critérios para prosseguir! ;)");
    }else{validacao4 = true;}

    if(validacao3 && validacao4 ){
        guardaDadosTelaPerguntas();
    }
}

//função para criar a Tela 3.2 - Perguntas do Quiz
function perguntasQuizz(){
    let criaPergunta = document.querySelector('.tela-3-2');
    let perguntas =`
        <h1>Crie suas perguntas</h1>
        <div class="perguntasQuizz">
            <div> <h1>Pergunta 1</h1> </div>
            <input class="textoPergunta" type="text" minlength="20" x-moz-errormessage="" placeholder="Texto da pergunta" >
            <div class="colocaCor">
                <input class="corPergunta" type="color" maxlength="8" placeholder="Cor de fundo da pergunta">
            </div>

            <div> <h2>Resposta correta</h2> </div>
            <input class="respostaIncorreta1" type="text" minlength="3" placeholder="Resposta correta">
            <input class="urlDaImage1" type="url" placeholder="URL da imagem">

            <div> <h2>Respostas incorretas</h2> </div>
            <input class="respostaIncorreta2" type="text" minlength="3" placeholder="Resposta incorreta 1">
            <input class="urlDaImage2" type="url" placeholder="URL da imagem 1">

            <input class="respostaIncorreta3" type="text" placeholder="Resposta incorreta 2">
            <input class="urlDaImage3" type="url" placeholder="URL da imagem 2">

            <input class="respostaIncorreta4" type="text" placeholder="Resposta incorreta 3">
            <input class="urlDaImage4" type="url" placeholder="URL da imagem 3">
        </div>
        <div class="pergunta2-tela-3-2">
            <div><h1>Pergunta 2</h1></div>
            <img src="./imagens/Vector.png" alt="botao de editar" />
        </div>
        <div class="pergunta2-tela-3-2">
            <div><h1>Pergunta 3</h1></div>
            <img src="./imagens/Vector.png" alt="botao de editar" />
        </div>
    `;
    criaPergunta.innerHTML += perguntas;
    let addPergunta = document.querySelector(".tela-3-2");

    for(let i = 3; i < quantidadePerguntas; i++){
        let perguntaAdicional = `
        <div class="pergunta2-tela-3-2">
            <div><h1>Pergunta ${[i+1]}</h1></div>
            <img src="./imagens/Vector.png" alt="botao de editar" />
        </div>
        `;
        addPergunta.innerHTML += perguntaAdicional;
    }
    addPergunta.innerHTML += `<button onclick="validacaoTela2()">Prosseguir pra criar níveis</button>`;
}
// ============Guardar respostas do formulario de perguntas da tela 3.2==========================================================

function guardaDadosTelaPerguntas(){
    textoPergunta = document.querySelector(".textoPergunta").value;
    corPergunta = document.querySelector(".corPergunta").value;

    respostaIncorreta1 = document.querySelector(".respostaIncorreta1").value;
    urlDaImage1 = document.querySelector(".urlDaImage1").value;

    respostaIncorreta2 = document.querySelector(".respostaIncorreta2").value;
    urlDaImage2 = document.querySelector(".urlDaImage2").value;

    respostaIncorreta3 = document.querySelector(".respostaIncorreta3").value;
    urlDaImage3 = document.querySelector(".urlDaImage3").value;

    respostaIncorreta4 = document.querySelector(".respostaIncorreta4").value;
    urlDaImage4 = document.querySelector(".urlDaImage4").value;

    console.log(textoPergunta)
    console.log(corPergunta)
    console.log(respostaIncorreta1)
    console.log(urlDaImage1)
    console.log(respostaIncorreta2)
    console.log(urlDaImage2)
    console.log(respostaIncorreta3)
    console.log(urlDaImage3)
    console.log(respostaIncorreta4)
    console.log(urlDaImage4)

}
//função para caixa de texto cor
// function corText(){
//     let corText = document.querySelector(".corPergunta").value;
    
//     console.log(corText)
//     // if(corText != "#"){
//     // }
// }
function enviarPerguntas(){
    validacaoTela2();
}

// Função tela33: Essa função escreve a tela 3-3 e será ativada ao final da tela 3-2

function tela33() {
    let escrevendotela = document.querySelector(".tela-3-3")
    escrevendotela.classList.remove("removendo-tela")
    escrevendotela.innerHTML = `<div class="titulo-tela-3-3">
    <h3>Agora, decida os níveis</h3>
</div>

<div class="nivel-1">
    <h4>Nível 1</h4>
    
    <input id="nivel-1-titulo" placeholder="Título do nível" type="text" value=""> <br> <br>
    <input id="nivel-1-porcentagem" placeholder="% de acerto mínima" type="text" value="">  <br> <br>
    <input id="nivel-1-url" placeholder="URL da imagem do nível" type="text" value="">  <br> <br>
    <input id="nivel-1-descricao" placeholder="Descrição do nível" type="text" value="">
</div>

<div class="nivel-2">
    <div class="nivel-2-cabecalho">
        <h4>Nível 2</h4>
        <img class="imagem-nivel-2" src="imagens/Vector.png" alt="">
    </div>

    <input id="nivel-2-titulo" placeholder="Título do nível" type="text" value=""> <br> <br>
    <input id="nivel-2-porcentagem" placeholder="% de acerto mínima" type="text" value="">  <br> <br>
    <input id="nivel-2-url" placeholder="URL da imagem do nível" type="text" value="">  <br> <br>
    <input id="nivel-2-descricao" placeholder="Descrição do nível" type="text" value="">

</div>

<div class="nivel-3">
    <div class="nivel-3-cabecalho">
        <h4>Nível 3</h4>
        <img class="imagem-nivel-2" src="imagens/Vector.png" alt="">
    </div>

    <input id="nivel-3-titulo" placeholder="Título do nível" type="text" value=""> <br> <br>
    <input id="nivel-3-porcentagem" placeholder="% de acerto mínima" type="text" value="">  <br> <br>
    <input id="nivel-3-url" placeholder="URL da imagem do nível" type="text" value="">  <br> <br>
    <input id="nivel-3-descricao" placeholder="Descrição do nível" type="text" value="">

</div>

<div class="botao-finalizar-quizz">
    <button onclick="finalizarQuizz()" value="">
        <h3> Finalizar Quizz</h3>
    </button>
</div>
    
    `
}
// final da função tela33

// Função finalizarQuizz: Essa função será ativada ao final da tela 3-3, quando clicarmos no botão de finalizar Quizz

function finalizarQuizz() {

    

    let titulo1 = document.getElementById("nivel-1-titulo").value
    let porcentagem1 = document.getElementById("nivel-1-porcentagem").value
    let url1 = document.getElementById("nivel-1-url").value
    let descricao1 = document.getElementById("nivel-1-descricao").value
    let titulo2 = document.getElementById("nivel-2-titulo").value
    let porcentagem2 = document.getElementById("nivel-2-porcentagem").value
    let url2 = document.getElementById("nivel-2-url").value
    let descricao2 = document.getElementById("nivel-2-descricao").value
    let titulo3 = document.getElementById("nivel-3-titulo").value
    let porcentagem3 = document.getElementById("nivel-3-porcentagem").value
    let url3 = document.getElementById("nivel-3-url").value
    let descricao3 = document.getElementById("nivel-3-descricao").value
    
    console.log(porcentagem1)
    console.log(porcentagem2)
    console.log(porcentagem3)

    if(niveis == 2) {
        if((titulo1.length > 10) || (titulo2.length > 10) ) {
            alert("O título tem mais que 10 caracteres. Preencha novamente")
        } else if((porcentagem1 <0) || (porcentagem1 > 100) || (porcentagem2 <0) || (porcentagem2 > 100)) {
            alert("A porcentagem deve ser um número entre 0 e 100. Preencha novamente")
        } else if((url1.substr(0,7) !== "http://") || (url2.substr(0,7) !== "http://")) {
            alert("Você não colocou um formato de ULR válido. Inicie com 'http://'")
        } else if((descricao1.length < 30) ||(descricao2.length < 30)) {
            alert("A sua descrição deve conter mais que 30 caracteres")
        } else if((porcentagem1 !==0) || (porcentagem2 !==0)) { 
        alert("Pelo menos uma das porcentagens mínimas deve ser zero") 
        }
    }

    if(niveis == 3) {
        if((titulo1.length > 10) || (titulo2.length > 10) || (titulo3.length > 10) ) {
            alert("O título tem mais que 10 caracteres. Preencha novamente")
        } else if((porcentagem1 <0) || (porcentagem1 > 100) || (porcentagem2 <0) || (porcentagem2 > 100) || (porcentagem3 <0) || (porcentagem3 > 100)) {
            alert("A porcentagem deve ser um número entre 0 e 100. Preencha novamente")
        } else if((url1.substr(0,7) !== "http://") || (url2.substr(0,7) !== "http://") || (url3.substr(0,7) !== "http://")) {
            alert("Você não colocou um formato de ULR válido. Inicie com 'http://'")
        } else if((descricao1.length < 30) ||(descricao2.length < 30) || (descricao3.length < 30)) {
            alert("A sua descrição deve conter mais que 30 caracteres")
        } else if((porcentagem1 == 0) || (porcentagem2 == 0) || (porcentagem3 == 0)) { 
        alert("finalizado") 
        } else {
            alert("Pelo menos uma das porcentagens mínimas deve ser zero")
        }
    }
    
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
 
buscandoQuizzes();
