/**
 * confugura data limite de nascimento
 * @author Takeshita
 * @since 2026-02-24
 * @version 1.0
 */

function confuguraDataLimite(){
    const limite = new Date().toISOString().split("T")[0]
    const inputnasc = document.getElementById('nascimento')
    if (inputnasc){
        inputnasc.setAttribute('max', limite)
    }
}



//inicialização
document.addEventListener('DOMContentLoaded', confuguraDataLimite)

/**
 * Calcular  o IMC
 * @author Takeshita
 * @since 2026-03-03
 * @version 1.0
 * @param {number} peso - o peso da pessoa em kg
 * @param {number} altura - a altura da pessoa em metros
 * @returns {number} o valor do IMC calculado
 */
function calcularIMC(peso , altura) {
    const imc = peso / (altura * altura)
    return imc 
}

//console.log(calcularIMC(66,1.75))


/**
 * Calcular a classificação do IMC
 * @author Takeshita
 * @since 2026-03-03
 * @version 1.0
 * @param {number} imc - o valor do IMC
 * @returns {string} a classificação do IMC. EX: peso normal, sobrepeso, etc.
 */

function obterClassificacaoIMC(imc){
    let resultado = ""
    if (imc < 18.5) {
        resultado = "Abaixo do peso"
    } else if (imc < 25.5) {
        resultado = "Peso Normal"
    } else if (imc < 30) {
        resultado = "Sobrepeso"
    } else {
        resultado = "GORDO OBESO"
    }
    return resultado
}

//console.log(obterClassificacaoIMC(24))

/**
 * função que processa calculo e exibe na UI
 * @param {event} event - O evento de submissão do formulario
 */

function processaCalculo(event){
    if (event) event.preventDefault() //evita o recarregamento da pagina
    //captura os campos
    const nome = document.getElementById('nome').value
    const nascimnto = document.getElementById('nascimento').value
    const peso = document.getElementById('peso').value
    const altura = document.getElementById('altura').value
    const divresultado = document.getElementById('resultado')
    //Validacao basica
    if (!nome || !nascimnto || isNaN(peso) || isNaN(altura)) {
        alert('Por favor, preencha todos os campos')
        return
    }

//efetuando os calculos
const imc = calcularIMC (peso, altura)
const classificacao = obterClassificacaoIMC(imc)
const idade = calcularIdade(nascimnto)
//mostrando o resultado na div
divresultado.style.display = 'block' //exibe a div novamente na UI
divresultado.innerHTML = `
                        Resultado para ${nome}: <br>
                        IMC: ${imc.toFixed(2)} <br>
                        Idade: ${idade} <br>
                        Status: ${classificacao}
                        `
}

/**
 * calcula a idade
 * @param {string} nascimento - a data de nascimento no formato YYYY- MM- DD
 * @returns {number} a idade calculada em anos
 */

function calcularIdade(nascimento){
    const dataNasc = new Date(nascimento)
    const hoje = new Date()
    let idade = hoje.getFullYear() - dataNasc.getFullYear()
    const mes = hoje.getMonth() - dataNasc.getMonth()
    if (mes < 0 || (mes === 0 && hoje.getDate() < dataNasc.getDate() )) {
        idade -- //diminui um ano na idade pois n chegou o aniversario
    
    }

    return idade
    
}


//limoar o resultado
document.addEventListener('reset' , () => {
    const divResultado = document.getElementById('resultado')
    //limpa o texto da div
    divResultado.innerHTML = ''
    //oculta o elemento
    divResultado.style.display = 'none'
})