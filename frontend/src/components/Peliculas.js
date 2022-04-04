import React, { Component } from 'react';
import Pelicula from './Pelicula.js';
import Slider from './Slider';
import Sidebar from './Sidebar';
class Peliculas extends Component {
    state = {
        peliculas: [
            { titulo: "Kickboxer", image: '' },
            { titulo: 'Pokemon', image: '' },
            { titulo: 'Ong bak', image: '' },
        ],
        nombre: 'Mike',
        favorita: {}
    };

    cambiarTitulo = () => {
        // var random = Math.floor(Math.random()*3);
        var { peliculas } = this.state;
        peliculas[0].titulo = "Digimon";
        this.setState({
            peliculas: peliculas
        })
    }

    favorita = (pelicula, indice) => {
        console.log("favorita marcada")
        console.log(pelicula, indice);
        this.setState({
            favorita: pelicula
        });
    }


    render() {
        var pStyle = {
            background: 'green',
            color: 'white',
            padding: '10px'
        }

        var favorita;
        if (this.state.favorita.titulo) {
            favorita = (
                <p className="favorita" style={pStyle}>
                    <strong>La pelicula favorita es:</strong>
                    <span>{this.state.favorita.titulo}</span>
                </p>
            )
        } else {
            favorita = (
                <p>No hay pelicula favorita</p>
            )
        }
        return (
            <React.Fragment>


                <Slider
                    title="Peliculas"
                    size="slider-small"
                />
                <div className="center">

                    <div id="content" className="peliculas">

                        <h2 className="subheader">Listado de peliculas</h2>
                        <p>Selección de las peliculas favoritas de {this.state.nombre}</p>
                        <div><button onClick={this.cambiarTitulo}>
                            Cambiar titulo de batman
                    </button>
                        </div>
                        {/*
                    this.state.favorita.titulo ? (
                        <p className="favorita" style={pStyle}>
                            <strong>La pelicula favorita es:</strong>
                            <span>{this.state.favorita.titulo}</span>
                        </p>
                    ) : (
                            <p>No hay pelicula favorita</p>
                        )
                    */}
                        {favorita}

                        <div id="articles" className="peliculas">
                            {
                                this.state.peliculas.map((pelicula, i) => {
                                    return (
                                        <Pelicula
                                            key={i}
                                            pelicula={pelicula}
                                            indice={i}
                                            marcarFavorita={this.favorita}
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>


                </div>
            </React.Fragment>
        );

    }
}

export default Peliculas;