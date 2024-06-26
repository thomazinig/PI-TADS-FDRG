import { useEffect, useState } from "react";
import axios from "axios";
import "./login.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { useUser } from "../userId";
export function Login() {
  const { innerHeight: altura } = window;
  const [email, setemail] = useState();
  const [senha, setSenha] = useState();
  const { setUserData } = useUser(); // Acesso ao contexto

  const navigate = useNavigate()
  useEffect(() => {
    localStorage.clear();

    if (localStorage.token) {
      authToken(localStorage.token)
    }
  }, [])
  function authToken(token) {
    if (token) {
      axios.get("http://localhost:3001/authToken", {
        headers: {
          'Authorization': `Bearer ${token}`
        }

      }).then((res => {
        console.log(res)
        navigate("/segundaTela")
      })).catch((err => {
        console.log(err)
        console.log("token invalido")

      }))

    }
  }
  function handleChange(event) {
    setemail(event.target.value);
  }
  function handleChangeSenha(event) {
    setSenha(event.target.value);
  }
  function login1() {

    var data = { email, senha }
    axios
      .post("http://localhost:3001/login", data)
      .then((res) => {
        const { idUser, grupUser } = res.data;
        localStorage.token = res.data.token
        setUserData({ idUser,grupUser });
        navigate("/segundaTela", {
          state: {
            id: res.data.idUser,
            grupo: res.data.grupUser
          }
        })
      })
      .catch((err) => {
        console.log(err);
        window.alert(err.response.data.message);
      });
  }

  return (
    <div className="telaLogin" style={{
      height: `${altura}px`,
    }}>
      <div className="campoLogin">
      <h1><b>ENTRAR</b></h1>
        <div>
          <label htmlFor="" className="labelLogin">E-mail</label>
          <br />
          <input className="form-control larguraInputBtn" type="text" value={email} onChange={handleChange} />
        </div>
        <div >
          <label htmlFor="" className="labelLogin mt-4 ">Senha</label>
          <br />

          <input className="form-control larguraInputBtn" type="password" value={senha} onChange={handleChangeSenha} />
        </div>
        <input style={{ width: "350px" }} className="btnLogin mt-5" onClick={login1} type="submit" value="Entar" />
      </div>

    </div>
  );
}
