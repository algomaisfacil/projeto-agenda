const meses = document.querySelectorAll(".meses");
const h1MesTitulo = document.getElementById("mesTitulo");
const botaoVoltar = document.getElementById("botaoVoltar");
const ulCalendario = document.getElementById("calendario");
const tooltip = document.getElementById("tooltip");
const divHorario = document.getElementById("horario");
const ulListaHorarios = document.getElementById("ulListaHorarios");
const horarioFechar = document.getElementById("horarioFechar");
const h1DiaHorario = document.getElementById("diaHorario");
const buttonAdicionarHorario = document.getElementById("adicionarHorario");
const divContainerInfo = document.getElementById("containerInfo");
const buttonCancelarAgendamento = document.getElementById("buttonCancelarAgendamento");
const buttonAgendar = document.getElementById("buttonAgendar");
const inputTituloAgendamento = document.getElementById("inputTituloAgendamento");
const inputHorario1 = document.getElementById("inputHorario1");
const inputHorario2 = document.getElementById("inputHorario2");

const feriados2026 = [
    "2026-01-01", // Confraternização Universal
    "2026-02-16", // Carnaval (Recesso)
    "2026-02-17", // Carnaval (Feriado)
    "2026-02-18", // Quarta-feira de Cinzas (Recesso)
    "2026-04-03", // Sexta-feira Santa
    "2026-04-20", // Tiradentes (Emenda)
    "2026-04-21", // Tiradentes
    "2026-05-01", // Dia do Trabalho
    "2026-06-04", // Corpus Christi (Campinas)
    "2026-06-05", // Corpus Christi (Emenda)
    "2026-07-09", // Revolução Constitucionalista (Estadual SP)
    "2026-08-12", // Dia do Evangélico (Campinas)
    "2026-09-07", // Independência do Brasil
    "2026-10-12", // Nossa Senhora Aparecida
    "2026-10-15", // Dia do Professor (Feriado Escolar Fatec)
    "2026-11-02", // Finados
    "2026-11-20", // Dia da Consciência Negra
    "2026-12-08", // Nossa Senhora da Conceição (Padroeira de Campinas)
    "2026-12-25"  // Natal
];

let mesTitulo = localStorage.getItem("mesSelecionadoTitulo");
let mesNumero = Number(localStorage.getItem("mesSelecionadoNumero"));
let diaAtual = null;
const anoAtual = new Date().getFullYear();
const primeiroDiaSemana = new Date(anoAtual, mesNumero, 1).getDay();
const diasMes = new Date(anoAtual, mesNumero + 1, 0).getDate();

let agendamentos =  localStorage.getItem("meusAgendamentos") ? JSON.parse(localStorage.getItem("meusAgendamentos")) : [];

//Adiciona li horarios
function carregarHorarios(){
    ulListaHorarios.innerHTML = "";
    const agendamentosDoDia = agendamentos.filter(agenda => 
        agenda.ano === anoAtual &&
        agenda.mes === mesNumero &&
        agenda.dia === diaAtual
    );

    for (let i = 0; i < 24; i++){
        let horaStr = i.toString().padStart(2, '0');
        let textoHora = `${horaStr}:00`;

        const ocupado = agendamentosDoDia.some(agenda => {
            let hInicio = parseInt(agenda.inicio.split(':')[0]);
            let hFim = parseInt(agenda.fim.split(':')[0]);
            return i >= hInicio && i <= hFim;
        });

        const variosAgendamentos = agendamentosDoDia.filter(agenda => {
            let hInicio = parseInt(agenda.inicio.split(':')[0]);
            return i === hInicio;
        });


        criarHorario(textoHora, ocupado, variosAgendamentos);
    }
}

function criarHorario(texto, isOcupado, isMultiplos){
    let liPlace = document.createElement("li");
    liPlace.classList.add("itemHorario");
    let liContainer = document.createElement("div");
    liContainer.classList.add("agendas");

    /*
    if(isOcupado){
        li.classList.add("horarioOcupado");
    }
    */

    /*
    if(isMultiplos && isMultiplos.length > 0){
        let spanHora = document.createElement("span");
        spanHora.textContent = texto;
        li.appendChild(spanHora);
    

    let divTitulos = document.createElement("div");
    divTitulos.id = "divTitulosAgendados"

    isMultiplos.forEach(agenda => {
        let label = document.createElement("label");
        label.textContent = `- ${agenda.titulo} (${agenda.inicio})`;
        divTitulos.appendChild(label);
        li.classList.add('ocupadoMultiplos');
        li.textContent = texto;
    });
    
    li.appendChild(divTitulos);
    
    } else {
        li.textContent = texto;
    }
    */
    liPlace.textContent = texto;

    /*
    li.addEventListener("click", function(){
        divContainerInfo.style.display = "flex";
        inputHorario1.value = texto;
        inputHorario2.value = null;
        inputTituloAgendamento.value = null;
    });
    */
    ulListaHorarios.appendChild(liPlace);
    ulListaHorarios.appendChild(liContainer);
    
}

function validarHorario(valor) {
    // Regex para o formato HH:mm (de 00:00 até 23:59)
    const regexHorario = /^([01]\d|2[0-3]):[0-5]\d$/;
    return regexHorario.test(valor);
}

//verefica os inputs de agendamento
function verificarInputs(){
    const h1 = inputHorario1.value;
    const h2 = inputHorario2.value;
    const titulo = inputTituloAgendamento.value;

    inputTituloAgendamento.classList.toggle("inputError", !titulo);

    const h1Valido = h1 && validarHorario(h1);
    inputHorario1.classList.toggle("inputError", !h1Valido);

    const h2Valido = h2 && validarHorario(h2);
    inputHorario2.classList.toggle("inputError", !h2Valido);

    if (h1Valido && h2Valido) {
        const ordemCerta = h1 < h2;
        if (!ordemCerta) {
            inputHorario1.classList.add("inputError");
            inputHorario2.classList.add("inputError");
        }
    }
}

//Entrar na tela do mês
meses.forEach(function(botao, index) {
    botao.addEventListener("click", function () {
        
        localStorage.setItem("mesSelecionadoTitulo", botao.textContent);
        localStorage.setItem("mesSelecionadoNumero", index);
        
        window.location.href = "./mes.html";
    });
});

//Troca o h1 para o html do mes
document.addEventListener("DOMContentLoaded", function(){

    if(h1MesTitulo){
        const mesSalvo = localStorage.getItem("mesSelecionadoTitulo");


        if(mesSalvo){
            h1MesTitulo.textContent = mesSalvo;
        } else {
            h1MesTitulo.textContent = "Mês Desconhecido";
        }
    }
});

if(botaoVoltar){
    botaoVoltar.addEventListener("click", function(){
            window.location.href = "./index.html";
    });
}

if(ulCalendario){
    for (let i = 0; i < primeiroDiaSemana; i++) {
        const liVazio = document.createElement("li");
        liVazio.classList.add("dia-vazio");
        ulCalendario.appendChild(liVazio);
    }

    for (let i = 1; i <= diasMes; i++){
        let liDia = document.createElement("li");
        liDia.textContent = i;
        liDia.classList.add("dia");
        let dataAtual = new Date(anoAtual, mesNumero, i); 
        let diaSemana = dataAtual.getDay();
        let stringData = dataAtual.toISOString().split('T')[0];
        let eFolga = (dataAtual.getDay() === 0 || dataAtual.getDay() === 6 || feriados2026.includes(stringData));
        if (eFolga) liDia.classList.add("folga");

        ulCalendario.appendChild(liDia);
    
        liDia.addEventListener("mouseenter", function(){
            tooltip.style.display = "block";
            if (eFolga){
                tooltip.textContent = `Dia ${i}: Folga/Feriado`; 
                tooltip.style.backgroundColor = `grey`;
            } else {
                tooltip.textContent = `Dia ${i}: Aula Normal`
                tooltip.style.backgroundColor = `black`
            }
        });

        liDia.addEventListener("mousemove", function(e){
            tooltip.style.left = e.pageX + 10 + "px";
            tooltip.style.top = e.pageY + 10 + "px";
        });

        liDia.addEventListener("mouseleave", function(){
            tooltip.style.display = "none";
        });

        liDia.addEventListener("click", function(){
            divHorario.style.display = "grid";
            h1DiaHorario.textContent = `${i} de ${mesTitulo}`;
            diaAtual = i;
            carregarHorarios();
        });
    }

    if(horarioFechar){
            horarioFechar.addEventListener("click", function(){
                divHorario.style.display = "none";
            });
    }

    if(buttonAdicionarHorario){
        buttonAdicionarHorario.addEventListener("click", function(){
            divContainerInfo.style.display = "flex";     
            inputHorario1.value = null;
            inputHorario2.value = null;
            inputTituloAgendamento.value = null;      
        });
    }
    
    if(buttonCancelarAgendamento){
        buttonCancelarAgendamento.addEventListener("click", function(){
            divContainerInfo.style.display = "none";         
        });
    }

    if(buttonAgendar){
        buttonAgendar.addEventListener("click", function(){
        const h1 = inputHorario1.value;
        const h2 = inputHorario2.value;
        const titulo = inputTituloAgendamento.value;


        if (!h1 || !h2 || !titulo){
            alert("Preencha todos os campos!");
            verificarInputs();
            return;
        }
        
        if (!validarHorario(h1) || !validarHorario(h2)) {
            alert("Formatação de horários incorretos! (Ex: '13:00')");
            verificarInputs();
            return;
        }

        if (h1 >= h2){
            alert("O horário de início não pode ser maior ou igual ao de término!");
            verificarInputs();
            return;
        }

        const agendamentoExiste = agendamentos.find(agenda => {

            return agenda.ano === anoAtual &&
                   agenda.mes === mesNumero &&
                   agenda.dia === diaAtual &&
                   (agenda.fim >  h1 && agenda.inicio < h2);
        });

        if (agendamentoExiste) {
            const querContinuar = confirm(`Atenção: Já existe um agendamento ("${agendamentoExiste.titulo}") neste horário. Deseja salvar o novo agendamento mesmo assim?`);
            
            if (!querContinuar) {
                return; 
            }
        }

        const novoAgendamento = {
            ano: anoAtual,
            mes: mesNumero,
            dia: diaAtual,
            inicio: inputHorario1.value,
            fim: inputHorario2.value,
            titulo: inputTituloAgendamento.value
        };

        agendamentos.push(novoAgendamento);

        localStorage.setItem("meusAgendamentos", JSON.stringify(agendamentos));
        
        alert(`Agendado!`);
        verificarInputs();
        carregarHorarios();

        });
    }
}