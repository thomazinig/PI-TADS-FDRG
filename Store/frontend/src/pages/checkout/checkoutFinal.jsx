import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export function CheckoutFinal() {
    const navigate = useNavigate();
    const [produtos, setProduto] = useState(null)
    const [endereco, setEndereco] = useState(null)
    function listarProduto() {
        axios.get(`http://localhost:3001/pedido`).then((res => {
            console.log(res)
            setProduto(res.data)
        }))

    }
    function ListarEndereco() {
        axios.get(`http://localhost:3001/listarEnderecoUnico/${localStorage.idEndereco}`).then((res) => {
            setEndereco(res.data)

        })
    }
    useEffect(() => {
        ListarEndereco()
        listarProduto()
    }, [])
    return (
        <>
            {
                produtos !== null ?
                    <div style={{ background: "white" }}>
                        {produtos.map((produto) => {
                            return (
                                < div >
                                    <span>Produto:{produto.nomeProdutoPedido}</span>
                                    <br />
                                    <span>quantidade:{localStorage.testeQtd}</span>
                                    <br />
                                    <span>preco:{produto.precoProdutoPedido}</span>
                                    <br />
                                <hr />
                                </div >
                            )

                        })
                        }
                        {endereco ?
                            <div>

                                <span>{endereco.endereco}</span>
                                <span>{endereco.numero}</span>
                            </div>
                            :
                            <span>endereco entrega</span>
                        }
                        <br />
                        <span>{localStorage.dadosCartao}</span>
                        <br />
                        <button> <a href="/checkoutPagamento">voltar</a></button>
                        <button onClick={() => {
                            alert("compra concluida")
                            navigate("/")
                        }}> <a >concluir compra</a></button>
                    </div>


                    :
                    <h2>carregando</h2>
            }
        </>
    )
}