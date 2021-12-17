var editID = null

// function carregamentoPagina() {
//     alert("Mensagem apresentada no carregamento do sistema");
// }

function apagarProduto(idProduto) {
    let result = confirm("Tem a certeza que deseja apagar este produto?")

    if (result) {
        let listaProdutos = JSON.parse(localStorage.getItem("produtos"))

        for (let i = 0; i < listaProdutos.length; i++) {
            const { id } = listaProdutos[i]
            if (id === idProduto) {
                listaProdutos.splice(i, 1)
                break;
            }
        }

        localStorage.setItem("produtos", JSON.stringify(listaProdutos))
        populaTabela()
    }
}

function editarProduto(idProduto) {
    let listaProdutos = JSON.parse(localStorage.getItem("produtos"))

    for (let i = 0; i < listaProdutos.length; i++) {
        const { id } = listaProdutos[i]
        if (id === idProduto) {
            editID = idProduto
            const { nome, quantidade, valor } = listaProdutos[i]
            $("#nmProduto").val(nome)
            $("#quantidade").val(quantidade)
            $("#vlrProduto").val(valor)
            break;
        }
    }
}

function populaTabela() {
    if (localStorage.getItem("produtos")) {
        let produtos = JSON.parse(localStorage.getItem("produtos"))

        $("#tblProdutos tbody").html("")
        produtos.forEach((produto) => {
            $("#tblProdutos tbody").append(`<tr>
                <td>${produto.nome}</td>
                <td>${produto.quantidade}</td>
                <td>${produto.valor}</td>
                <td style="width: 50px">
                    <button type="button" class="btn btn-info" onclick="editarProduto(${produto.id})"><i class="fas fa-edit"></i></button>
                </td>
                <td style="width: 50px">
                    <button type="button" class="btn btn-danger" onclick="apagarProduto(${produto.id})"><i class="far fa-trash-alt"></i></button>
                </td>
            </tr>`)
        })
    }
}

$(() => {
    //Código executado no carregamento da página
    populaTabela()

    $("#btnSalvar").click(() => {
        let listaProdutos = []
        if (localStorage.getItem("produtos")) {
            listaProdutos = JSON.parse(localStorage.getItem("produtos"))
        }

        if (!editID) { //ESTADO DE INSERÇÃO
            // let produto = { nome: "", quantidade: 0, valor: 0 }
            let produto = {}
            produto.nome = $("#nmProduto").val()
            produto.quantidade = $("#quantidade").val()
            produto.valor = $("#vlrProduto").val()

            produto.id = listaProdutos.length + 1
            listaProdutos.push(produto)
        }
        else { //ESTADO DE EDIÇÃO
            for (let i = 0; i < listaProdutos.length; i++) {
                const { id } = listaProdutos[i]
                if (id === editID) {
                    listaProdutos[i].nome = $("#nmProduto").val()
                    listaProdutos[i].quantidade = $("#quantidade").val()
                    listaProdutos[i].valor = $("#vlrProduto").val()
                    editID = null
                    break;
                }
            }
        }

        localStorage.setItem("produtos", JSON.stringify(listaProdutos))

        alert("Produto salvo com sucesso")

        $("#nmProduto").val("")
        $("#quantidade").val("")
        $("#vlrProduto").val("")

        populaTabela()
    })
})