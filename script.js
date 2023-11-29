function limparForm() {
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("cidade").value = "";
    document.getElementById("tel").value = "";
    document.getElementById("mensagem").value = "";
}

function formatarData(date) {
    const dia = date.getDate();
    const mes = date.getMonth() + 1; 
    const ano = date.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

function salvarItem(id, nome, email, cidade, telefone, mensagem) {

    let listaContatos = JSON.parse(localStorage.getItem('listaContatos')) || [];

    var contato = {
        id: id || Date.now(),
        nome: nome,
        email: email,
        cidade: cidade,
        tel: telefone,
        mensagem: mensagem,
        data: formatarData(new Date())
    };

    listaContatos.push(contato);

    localStorage.setItem('listaContatos', JSON.stringify(listaContatos));
}

function addElemento() {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const cidade = document.getElementById("cidade").value;
    const telefone = document.getElementById("tel").value;
    const mensagem = document.getElementById("mensagem").value;
    const idItem = Date.now();

    salvarItem(idItem, nome, email, cidade, telefone, mensagem);

    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("cidade").value = "";
    document.getElementById("tel").value = "";
    document.getElementById("mensagem").value = "";
}

function excluirItemLista(id) {
    const elemento = document.getElementById(`contato-${id}`);
        
    if (elemento && elemento.parentNode) {
        elemento.parentNode.removeChild(elemento);
    }
        
    const listaContatos = JSON.parse(localStorage.getItem('listaContatos')) || [];
    const novaLista = listaContatos.filter((contato) => contato.id !== id);
    localStorage.setItem('listaContatos', JSON.stringify(novaLista));

    carregarLista();
}

function carregarLista() {
    const listaContatos = JSON.parse(localStorage.getItem('listaContatos')) || [];
    const listaElementos = document.getElementById("itemLista");

    listaElementos.innerHTML = "";

    listaContatos.forEach((contato) => {
        const li = document.createElement("li");
        li.className = "item";
        const txtItem = `${contato.data} - ${contato.nome.toUpperCase()} : ${contato.mensagem}`;
        const t = document.createTextNode(txtItem);

        const btnExcluir = document.createElement("button");
        btnExcluir.className = "close";
        btnExcluir.textContent = "X";
        btnExcluir.addEventListener("click", () => excluirItemLista(contato.id));

        li.appendChild(btnExcluir);
        li.appendChild(t);
        listaElementos.appendChild(li);
    });
}

function limparLista() {
    const listaElementos = document.getElementById("itemLista");
    listaElementos.innerHTML = "";
    
    localStorage.removeItem('listaContatos');
}

function filtrarPorNome() {
    const termoPesquisa = document.getElementById("pesqBarra").value.toLowerCase();
    const listaContatos = JSON.parse(localStorage.getItem('listaContatos')) || [];
    const listaElementos = document.getElementById("itemLista");

    listaElementos.innerHTML = "";

    const resultadosFiltrados = listaContatos.filter((contato) =>
        contato.nome.toLowerCase().includes(termoPesquisa)
    );

    resultadosFiltrados.forEach((contato) => {
        const li = document.createElement("li");
        li.className = "item";
        li.id = `contato-${contato.id}`;

        const txtItem = `${contato.data} - ${contato.nome.toUpperCase()} : ${contato.mensagem}`;

        const btnExcluir = document.createElement("button");
        btnExcluir.className = "close";
        btnExcluir.textContent = "x";
        btnExcluir.addEventListener("click", () => excluirItemLista(contato.id));

        li.appendChild(btnExcluir);
        li.appendChild(document.createTextNode(txtItem));
        listaElementos.appendChild(li);
    });
}

function textChanged() {
    filtrarPorNome();
}

document.getElementById("pesqBarra").addEventListener("input", textChanged);


carregarLista();





