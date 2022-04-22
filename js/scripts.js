//Variáveis globais
let quizzesApi = [];

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
                <div class="quiz">
                    <img src="${quizzesApi[i].image}" alt="">
                    <h3>${quizzesApi[i].title}</h3>
                </div>
                
            `
        }
}


//função crarQuizz
function criarQuizz() {
    let removendotela1 = document.querySelector(".criar-quizz");
    let removendotela2 = document.querySelector(".quizzes-api")
    removendotela1.classList.add("removendo-tela");
    removendotela2.classList.add("removendo-tela");

   infoBasica()
}

//Criação da tela Tela 3.1 - Info básica do Quiz
function infoBasica(){
    const infoQuizz = document.querySelector('.tela-3-1');
    let formularioBasico =`
        <h1>Comece pelo começo</h1>
        <div class="infoQuizz">
            <input class="tituloQuizz" type=""text placeholder="Título do seu quizz">
            <input class="urlImage" type=""text placeholder="URL da imagem do seu quizz">
            <input class="quantidadePerguntas" type=""text placeholder="Quantidade de perguntas do quizz">
            <input class="quantidadeNiveis" type=""text placeholder="Quantidade de níveis do quizz">
        </div>
        <button onclick="funcao()">Prosseguir pra criar perguntas</button>
    `;
    infoQuizz.innerHTML += formularioBasico;
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
