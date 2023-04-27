const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || []

itens.forEach((elemento) => {
    criaElemento(elemento)
})

form.addEventListener("submit", (evento) => {

    evento.preventDefault()

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    const existe = itens.find(elemento => elemento.nome === nome.value)

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if (existe){
        itemAtual.id = existe.id
        atualizaElemento(itemAtual)
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    } else {
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0;

        criaElemento(itemAtual)

        itens.push(itemAtual)
    }

    localStorage.setItem("itens", JSON.stringify(itens))

    nome.value = ""
    quantidade.value = ""
})

function criaElemento(item){
    //criar um elemento li na minha ul
    const novoItem = document.createElement("li")
    //declarar a class do meu li
    novoItem.classList.add("item")
    //adicionar strong em volta da quantidade com inner
    const numeroItem = document.createElement("strong")
    numeroItem.innerHTML = item.quantidade
    numeroItem.dataset.id = item.id
    //adicionar o nome com inner fora da strong com append
    novoItem.appendChild(numeroItem)
    novoItem.innerHTML += item.nome
    novoItem.appendChild(botaoDeleta(item.id))
    //aplicar o li dentro da ul com id
    lista.appendChild(novoItem)
}

function atualizaElemento(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function botaoDeleta(id){
    const elementoBotao = document.createElement("button")
    elementoBotao.classList.add("botaodeleta")
    elementoBotao.innerText = "X"

    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id)
    })

    return elementoBotao
}

function deletaElemento(tag, id) {
    tag.remove()
    itens.splice(itens.findIndex(elemento => elemento.id == id), 1)
    localStorage.setItem("itens", JSON.stringify(itens))
}

const caixaDeSugestoes = document.getElementById("nome")
const listaDeSugestoes = document.getElementById("sugestaoLista")

listaDeSugestoes.querySelectorAll('li').forEach(item =>{
    item.addEventListener('click', () =>{
        const itemSugerido = item.querySelector('span').textContent
        caixaDeSugestoes.value = itemSugerido
    })
})