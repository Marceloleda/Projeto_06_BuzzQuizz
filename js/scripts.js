function criarQuizz() {
    let removendotela = document.querySelector(".criar-quizz")
    removendotela.classList.add("removendo-tela")
    
  

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
    <h4>Nível 2</h4>
    <img src="imagens/Vector.png" alt="">
</div>

<div class="nivel-3">
    <h4>Nível 3</h4>
    <img src="imagens/Vector.png" alt="">
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


    
    let titulo = document.getElementById("nivel-1-titulo").value
    let porcentagem = document.getElementById("nivel-1-porcentagem").value
    let url = document.getElementById("nivel-1-url").value
    let descricao = document.getElementById("nivel-1-descricao").value
    console.log(descricao.length)
    console.log(url.substr(0,7))
    if(titulo.length > 10) {
        alert("O título tem mais que 10 caracteres. Preencha novamente")
    } else if((porcentagem <0) || (porcentagem > 100)) {
        alert("A porcentagem deve ser um número entre 0 e 100. Preencha novamente")
    } else if(url.substr(0,7) !== "http://") {
        alert("Você não colocou um formato de ULR válido. Inicie com 'http://'")
    } else if(descricao.length < 30) {
        alert("A sua descrição deve conter mais que 30 caracteres")
    }
    
 
}

// Final da função finalizar Quizz