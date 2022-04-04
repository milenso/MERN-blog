import React, { Component } from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';
import Articles from './Articles';
class Blog extends Component {

    render() {

        var buttonString = "Ver más"
        return (
            <div id="blog">
                
                <Slider
                    title="Blog"
                    size="slider-small"
                />
                <div className="center">
                    <div id="content">
                       
                        
                        {/* Listado de articulos que vendran del api rest de node */}
                        <Articles />
                    </div>

                <Sidebar
                blog="true" />
                </div> {/* END DIV CENTER */}
            </div>
        )
    }
}

export default Blog;