"use strict";

const imagens = [
    'img/20200106160156_35a5521d-ab8b-4c42-a813-03ed6078a169.jpeg',
    "img/divulgacao-pcdob-960x540.jpg",
    'img/image_processing20200209-23306-1or75tb.jpg',
    'img/LM_Manifestacao-em-defesa-da-democracia-esplanada-ministrios-Brasilia_31032016017-850x509.jpg',
    'img/lula-bandeira-pt-site-do-pt-4.jpg',
    'img/pcdob.png',
    'img/pcdob-pt.jpg.750x0_q95_crop.jpg',
    'img/PT.jpg'
]
//<a href="#8" class="items"><img src="img/PT.jpg" alt=""></a>


const obterId = string => {
    if(!string instanceof String)

        return null;

    return string.substring(string.lastIndexOf('/') + 1, string.lastIndexOf('.'));
}


const criarItem = url => {
    const content = document.querySelector('container')

    const novoLink = document.createElement('a')
    novoLink.href = '#' + obterId(url)
    novoLink.classList.add("items")
    novoLink.innerHTML = `<img src="${url}" alt="">`

    content.appendChild(novoLink)
}

const carregarGaleria = imgs => imgs.forEach ( criarItem )

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
        array[indice <= 0? array.length - 1 : indice - 1]
    );
    const idProximo = obterId(
        array[indice >= array.length - 1? 0 : indice + 1]
    );

    const novoLink = document.createElement('slide')
    novoLink.id = obterId(url);
    novoLink.innerHTML = `<a href="" class="sair">&#128473;</a>
            <a href="#${idAnterior}" class="voltar navega"><<</a>
            <img src="${url}">
            <a href="#${idProximo}" class="ir navega">>></a>`;


    content.appendChild(novoLink)
}

const carregarSlide = imgs => imgs.forEach( criarSlide )

carregarGaleria(imagens)
carregarSlide(imagens)