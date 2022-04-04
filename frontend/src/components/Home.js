import React, { Component } from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';
import Articles from './Articles';

class Home extends Component {

    render() {
        var buttonString = "Ver más"
        return (
            <div id="home">
                
                <Slider
                    title="Bienvenido al Curso de React"
                    btn="Ir al blog"
                    size="slider-big"
                />
                <div className="center">
                    <div id="content">
                        <h1 className="subheader">últimos articulos</h1>
                        <Articles 
                            home="true"
                        />
                    </div>
                </div> {/* END DIV CENTER */}

                <Sidebar />
            </div>
        )
    }
}

export default Home;