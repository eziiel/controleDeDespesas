const ulDocument = document.querySelector(".lista-transacoes");
const saldoAtual = document.querySelector(".span-first");
const saldoAtualPositovo = document.querySelector(".span-second");
const saldoAtualNegativo = document.querySelector(".span-third");
const form = document.querySelector(".form-add");
const transacaoNome = document.querySelector("#texto");
const transacaoValor = document.querySelector("#valor");

// let valores = [
//   { id: "1", transacao: "mercado", valor: -900 },
//   { id: "2", transacao: "coca-cola", valor: -300 },
//   { id: "3", transacao: "i-food", valor: 1350 },
//   { id: "4", transacao: "matheus", valor: 50 },
// ];

const localStorageTransacoes = JSON.parse(localStorage.getItem("transactions"));
//function 6
let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransacoes : [];
  //function 7
const adicionarValor = ({ valor, transacao, id }) => {
  const li = document.createElement("li");
  const operador = valor < 0 ? "-" : "+";
  const cssClass = valor < 0 ? "receita-negativa" : "receita-positiva";
  const mathOperador = Math.abs(valor);
  li.classList.add(cssClass);

  li.innerHTML = `${transacao}
  <span>${operador}${mathOperador}</span>
  <button onClick="removerItem(${id})">x</button>`;
  ulDocument.append(li);
};
//function 13
const removerItem = (ID) => {
  transactions = transactions.filter((item) => item.id != ID);
  upDateLocalStorage();
  transacoes();
};

//function 3
const transacoes = () => {
  ulDocument.textContent = "";
  transactions.forEach(adicionarValor);
  totalSaldo();
};
//function 9
const totalArray = (arryValores) => {
  const resultado = arryValores
    .reduce((a, value) => {
      a += value;
      return a;
    }, 0)
    .toFixed(2);
  return resultado;
};
//function 10
const totalPositivoArray = (arryValores) => {
  const resultado = arryValores
    .filter((item) => item > 0)
    .reduce((a, value) => {
      a += value;
      return a;
    }, 0)
    .toFixed(2);
  return resultado;
};
//function 11
const totalNegativoivoArray = (arryValores) => {
  const resultado = Math.abs(
    arryValores
      .filter((item) => item < 0)
      .reduce((a, value) => {
        a += value;
        return a;
      }, 0),
  ).toFixed(2);
  return resultado;
};
//function 8
const totalSaldo = () => {
  const arryValores = transactions.map(({ valor }) => valor);

  const total = totalArray(arryValores);
  const totalPositivo = totalPositivoArray(arryValores);
  const totalNegativo = totalNegativoivoArray(arryValores);

  saldoAtual.textContent = `R$ ${total}`;
  saldoAtualPositovo.textContent = `R$ ${totalPositivo}`;
  saldoAtualNegativo.textContent = `R$ ${totalNegativo}`;
  colorTransactions(total);
};
//function 12
const colorTransactions = (total) => {
  if (+total < 0) {
    saldoAtual.classList.add("ativo");
  } else {
    saldoAtual.classList.remove("ativo");
  }
};

transacoes();

//function 4
const upDateLocalStorage = () => {
  localStorage.setItem("transactions", JSON.stringify(transactions));
};

const idConfig = () => Math.round(Math.random() * 1000);


//function 2
const ObjectTransacoes = (valueTransacaoNome, valueTransacaoValor) => {
  const valoresTransacoes = {
    id: idConfig(),
    transacao: valueTransacaoNome,
    valor: Number(valueTransacaoValor),
  };
  transactions.push(valoresTransacoes);
};
//function 5
const clearTransacition = () => {
  valueTransacaoNome = "";
  valueTransacaoValor = "";
};
//function 1
const handleFormSend = (event) => { 
  event.preventDefault();
  let valueTransacaoNome = transacaoNome.value.trim();
  let valueTransacaoValor = transacaoValor.value.trim();
  let valueGeral = valueTransacaoNome == "" || valueTransacaoValor == "";

  if (valueGeral) {
    alert(
      "preencha o campo de transações e de valor corretamente seu merda(a)",
    );
    return;
  }
  ObjectTransacoes(valueTransacaoNome, valueTransacaoValor);//function 2
  transacoes();//function 3
  upDateLocalStorage();//function 4
  clearTransacition();//function 5
};
// event
form.addEventListener("submit", handleFormSend);

//----------------------->

