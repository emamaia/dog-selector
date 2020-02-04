import React from 'react'
import Select from '../../components/Select'
import Input from '../../components/Input'
import Button from '../../components/Button'
import CardDog from '../../components/CardDog'
import { getDogs } from '../../service/base'
import { getImagem } from '../../service/baseImagem'



import './style.css'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: {
                valor: '',
                erro: ''
            },
            dogList: [],
            cor: '',
            fonte: '',
            raca: '',
            urlImagem: '',
            sucesso: true
        }
        this.listaCards = []
    }

    componentDidMount() {
        getDogs()
            .then(response => {
                let listaDog = []
                for (var dog in response.data.message) {
                    let racaAuxiliar = response.data.message[dog]
                    if(racaAuxiliar.length === 0){
                        listaDog.push(dog)
                    } else{
                        racaAuxiliar.map(item=>{
                            listaDog.push(item+" "+ dog)
                        })
                    }
                }
                this.setState({
                    dogList: listaDog
                })
            })
            .catch(error => {
                console.error(error)
            })

        let lista = localStorage.getItem('dogs')
        console.log(lista)
        if (lista !== null) {
            this.listaCards = JSON.parse(lista)
        }

    }

    handleChange = (nomeDoCampo, valorDoCampo, erroDoCampo = '') => {
        this.setState({
            [nomeDoCampo]: {
                valor: valorDoCampo,
                erro: erroDoCampo
            }
        })
        console.log(valorDoCampo);
    }

    changeColor = (ev) => {
        this.setState({
            cor: ev.target.value
        })
    }

    changeFont = (ev) => {
        this.setState({
            fonte: ev.target.value
        })
    }

    changeRaca = (ev) => {
        this.setState({
            raca: ev.target.value
        })
    }


    handleClick = (ev) => {
        ev.preventDefault()

        let caminhoRaca= this.state.raca
        if(caminhoRaca.includes(' ')){
            let racas= caminhoRaca.split(' ')
            caminhoRaca= racas[1]+'/'+racas[0]
        } 

        getImagem(caminhoRaca)
            .then(response => {
                this.setState({
                    urlImagem: response.data.message,
                    sucesso: false

                })
                const card = {
                    dog: this.state.nome.valor,
                    corFonte: this.state.cor,
                    fonte: this.state.fonte,
                    dogRaca: this.state.raca,
                    imagem: this.state.urlImagem,
                    data: new Date()
                }

                console.log(card)
                let dogs = localStorage.getItem('dogs')
                if (dogs === null) {
                    dogs = []
                } else {
                    dogs = JSON.parse(dogs)
                }

                dogs.push(card)
                localStorage.setItem('dogs', JSON.stringify(dogs))

            })
            .catch(error => {
                console.error(error)
            })

    }
    mostraCard = () => {
        this.props.history.push({
            pathname: '/card'
        })
    }

    render() {
        return (
            <div className='container-home'>
                <div className='container-title'>
                    <h1>Crie card de cãezinhos:</h1>
                </div>

                <div className='container-input'>
                    <h2>Crie um nome para o pet:</h2>
                    <form>
                        <Input
                            required
                            mudaEstado={this.handleChange}
                            name='nome'
                            type='text'
                            classeInput='input'
                            placeholder='Digite o nome do seu cão'
                        />

                        <div className='selects'>
                            <p>Depois é só escolher a raça, fonte e cor preferidos.</p>
                            <label>Escolha a cor da fonte:</label>
                            <Select
                                classeSelect='home-select'
                                onChange={this.changeColor}
                            >
                                <option value="EmBranco">Escolha a cor da fonte</option>
                                <option value='vermelho'>Vermelho</option>
                                <option value='azul'>Azul</option>
                                <option value='verde'>Verde</option>
                                <option value='branco'>Branco</option>
                                <option value='preto'>Preto</option>
                            </Select>

                        </div>
                        <div className='selects'>
                            <label>Escolha a fonte:</label>
                            <Select
                                classeSelect='home-select'
                                onChange={this.changeFont}
                            >
                                <option value="EmBranco">Escolha a fonte</option>
                                <option value='cambay'>Cambay</option>
                                <option value='montserrat'>Montserrat</option>
                                <option value='roboto'>Roboto Mono</option>
                                <option value='open'>Open Sans Condensed</option>
                                <option value='playfair'>Playfair Display</option>
                            </Select>
                        </div>
                        <div className='selects'>
                            <label>Escolha a raça do seu cão:</label>
                            <Select
                                classeSelect='home-select'
                                onChange={this.changeRaca}
                            >
                                <option value="EmBranco">Escolha a raça</option>
                                {this.state.dogList.map(item => {

                                    return (
                                        <option value={item}>{item}</option>
                                    )
                                })
                                }
                            </Select>
                        </div>

                        <div className='container-btn'>
                            <Button
                                classeButton='btn'
                                handleClick={this.handleClick}
                            >Salvar card
                            </Button>

                            <Button
                                classeButton='btn'
                                handleClick={this.mostraCard}
                            >
                                MOSTRAR CARDS
                            </Button>
                        </div>
                        {this.state.sucesso === true ? " " : <h4>Card cadastrado com sucesso</h4>}

                    </form>

                    <div className='container-card'>
                        {this.listaCards.map(item => {
                            return (
                                <div className='container-imagem'>
                                    <CardDog
                                        imagem={item.imagem}
                                    />
                                    <span className={item.corFonte + " " + item.fonte}>{item.dog}</span>
                                    <p className={item.corFonte + " " + item.fonte +" "+'data'}>{item.data}</p>
                                </div>
                            )
                        })
                        }

                    </div>

                </div>

            </div>
        )
    }
}

export default Home