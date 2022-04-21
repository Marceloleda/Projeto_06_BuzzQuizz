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

