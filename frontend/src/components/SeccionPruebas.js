import React, { Component } from 'react';
import MiComponente from './MiComponente';

class SeccionPruebas extends Component {

    contador = 0;

    constructor(props){
        super(props);
    }
    
    state = { contador: 0 };
    HolaMundo(nombre, edad) {

        var presentacion = (
            <div>
                <h2>Hola, soy {nombre}</h2>
                <h3>Tento { edad } años</h3>
            </div>
        )

        return presentacion;
    }

    sumar(){
       //this.conmtador = this.contador+1;
       this.setState({
           contador: (this.state.contador + 1)
       });
    }

    restar = (e) => {
        //this.conmtador = this.contador-1;
        this.setState({
            contador: (this.state.contador - 1)
        });
    }
    render() {

        var nombre = "Mike";
        return (
            <section id="content">
                <h2 className="subheader">Últimos articulos</h2>
                <p>
                    Hola bienvenido al curso de react
                 </p>

                 <h2 className="subheader">Funciones y JSX basico</h2>
                {this.HolaMundo(nombre, 12)}

                <h2 className="subheader">Componentes</h2>
                <section className="componentes">
                    <MiComponente />
                    <MiComponente />

                </section>

                <h2 className="subheader">Estado</h2>
                <p>
                   {this.state.contador}
                </p>
                <p>
                    <input type="button" value="Sumar" onClick={this.sumar.bind(this)} />
                    <input type="button" value="Restar" onClick={this.restar.bind(this)} />
                </p>

            </section>
        );
    }
}

export default SeccionPruebas;