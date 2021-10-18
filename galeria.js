"use strict";
//<a href="#8" class="items"><img src="img/PT.jpg" alt=""></a>

const pesquisarImagens = async (raca = '') => {
    const json = await fetch(`https://dog.ceo/api/breed/${raca}/images`).then(r => r.json())

    let xx

    while( (xx = document.querySelector('container').lastChild) ?? false )
        xx.remove();

    while( (xx = document.querySelector('.slide-container').lastChild) ?? false )
        xx.remove();

    carregarGaleria(json.message)
    carregarSlide(json.message)
}

const listarRacas = async () => {
    const json = await fetch('https://dog.ceo/api/breeds/list/all').then(r => r.json())

    let datalist = document.createElement("datalist")
    datalist.id = 'pesquisas'

    for(let y of new Map(Object.entries(json.message))){
        let x = document.createElement('option')
        x.value = y[0]
        datalist.appendChild(x)
    }

    document.body.appendChild(datalist)
    

    
    /*
    json.message.forEach( 
        (text) => datalist.appendChild(document.createElement(text))
        )
         */
}

const obterId = (string = '') =>
    string.substring(string.lastIndexOf('/') + 1, string.lastIndexOf('.'));


const criarItem = url => {
    const content = document.querySelector('container')

    const novoLink = document.createElement('a')
    novoLink.href = '#' + obterId(url)
    novoLink.classList.add("items")
    novoLink.innerHTML = `<img src="${url}" alt="">`

    content.appendChild(novoLink)
}

const carregarGaleria = imgs => imgs.forEach(criarItem);

/*
<slide id="1">
            <a href="" class="sair">&#128473;</a>
            <a href="#8" class="voltar navega"><<</a>
            <img src="img/20200106160156_35a5521d-ab8b-4c42-a813-03ed6078a169.jpeg">
            <a href="#2" class="ir navega">>></a>
        </slide>
 */

const criarSlide = (url, indice, array) => {
    const content = document.querySelector('.slide-container')

    const idAnterior = obterId(
        array[indice <= 0 ? array.length - 1 : indice - 1]
    );
    const idProximo = obterId(
        array[indice >= array.length - 1 ? 0 : indice + 1]
    );

    const novoLink = document.createElement('slide')
    novoLink.id = obterId(url);
    novoLink.innerHTML = `<a href="" class="sair">&#128473;</a>
            <a href="#${idAnterior}" class="voltar navega"><<</a>
            <img src="${url}">
            <a href="#${idProximo}" class="ir navega">>></a>`;


    content.appendChild(novoLink)
}

const carregarSlide = imgs => imgs.forEach(criarSlide)
listarRacas()

document.querySelector('.pesquisa>input').addEventListener('change', e => {
    pesquisarImagens(e.target.value)
})