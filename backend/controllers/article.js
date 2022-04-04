'use strict'

var validator = require('validator');

var fs = require('fs');
var path = require('path');

var Article = require('../models/article')

var controller = {
    test: (req,res) => {
        return res.status(200).send({
            message: 'Soy la acción test de mi controlador de articulos'
        })
    },
    save: (req, res) => {
        var params = req.body;
        
        // validar datos (Validator)
        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);

        } catch (err){
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar.'
            })
        }

        if(validate_title && validate_content){

            var article = new Article();

            article.title = params.title;
            article.content = params.content;
            article.image = null;

            article.save((err, articleStored) => {

                if(err || !articleStored){
                    return res.status(404).send({
                        status: 'error',
                        message: 'El articulo no se ha guardado'
                    });
                }

                return res.status(200).send({
                   status: 'success',
                   article: articleStored
                })

            });
  
        } else {
            return res.status(200).send({
                status: 'error',
                message: "Los datos no son válidos"
            });
        }
    },
    getArticles: (req,res) => {
        var query = Article.find({});
        var last = req.params.last;
        
        if(last || last != undefined){
            query.limit(5);
        }
        // Find
        query.sort('-_id').exec((err, articles) => {

            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver los articulos'
                }); 
            }
            if(!articles){
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay articulos para mostrar'
                }); 
            }
            return res.status(200).send({
                status: 'success',
                articles
            });
        })

    },
    getArticle: (req, res) =>{
        // Recoger el id de la url
        var articleId = req.params.id;
        // Comprobar que existe
        if(!articleId || articleId == null){
            return res.status(404).send({
                status: 'error',
                message: 'No existe el articulo'
            }); 
        }
        // Buscar el articulo
        Article.findById(articleId, (err, article) => {
            if(err ||!article) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el articulo'
                }); 
            }
        // Devolverlo en json
            return res.status(200).send({
             status: 'success',
             article
            })
        })
    },
    update: (req, res) => {
        // Recoger id del articulo por la url
        var articleId = req.params.id;
        // Recoger los datos
        var params = req.body;
        // Validar datos
        try{
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
        } catch(err){
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar.'
            }); 
        }

        if(validate_title && validate_content){
            // Find and update
            Article.findOneAndUpdate({_id: articleId}, params, {new:true}, (err, articleUpdated) => {
                if(err){
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar.'
                    }); 
                }
                if(!articleUpdated){
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe el articulo'
                    });
                }
                return res.status(200).send({
                    status: 'success',
                    article: articleUpdated
                });
    
            })
        } else {
            return res.status(200).send({
                status: 'error',
                message: 'La validacion de datos no es correcta'
            });
        }
       
    },
    delete: (req,res) => {

        // Recoger el id de la url
        var articleId = req.params.id;
        // Find and delete
        Article.findOneAndDelete({_id: articleId}, (err, articleRemoved) => {
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al borrar'
                }) 
            }
            if(!articleRemoved){
                return res.status(404).send({
                    status: 'error',
                    message: 'No se ha borrado el articulo, posiblemente no exista'
                })   
            }
            return res.status(200).send({
                status: 'success',
                article: articleRemoved
            })
        })

        
    },
    upload: (req, res) => {
        // configurar el modulo connect multiparty router/article.js

        // Recoger el fichero de la petición
        var file_name = 'Imagen no subida...';
        
        if(!req.files){
            return res.status(404).send({
                status: 'error',
                message: file_name  
            })   
        }
        
        
        // Conseguir nombre y la extensión del archivo
        var file_path = req.files.file0.path;
        // NOTA IMPORTANTE: el split \\ solo funciona en windows
        var file_split = file_path.split("\\")
        // Comprobar la extension, solo imagenes, si es valida borrar el fichero
        var file_name = file_split[2];
        var extension_split = file_name.split('\.')
        var file_ext = extension_split[1];

        if(file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif'){
            fs.unlink(file_path, (err) => {
                return res.status(200).send({
                 status: 'error',
                 message: 'La extension de la imagen no es valida'   
                });
            })
        } else {
            // Si todo es valido

        // Buscar el articulo, asignarle el nombre de la imagen y actualizarlo
            var articleId = req.params.id;
            Article.findOneAndUpdate({_id: articleId}, {image: file_name}, {new: true}, (err, articleUpdated) => {
            
                if(err || !articleUpdated){
                    return res.status(200).send({
                        status: 'error',
                        message: 'Error al guardar la imagen de articulo'
                    }) 
                }
                return res.status(200).send({
                    status: 'success',
                    article: articleUpdated
                })
            });

        }
        
    },
    getImage: (req, res) => {
        var file = req.params.image;
        var path_file = './upload/articles/'+file;

        fs.exists(path_file, (exists) => {
            console.log(exists)
            if(exists){
                return res.sendFile(path.resolve(path_file))
            } else {
                return res.status(404).send({
                    status: 'error',
                    message: 'La imagen no existe'
                })
            }
        })

       
    },
    search: (req, res) => {
        // Sacar el string a buscar
        var searchString = req.params.search;
        // Find or
        Article.find({ "$or": [
            { "title": { "$regex": searchString, "$options": "i"}},
            { "content": { "$regex": searchString, "$options": "i"}}
        ]})
        .sort([['date,','descending']])
        .exec((err, articles) => {

            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error en la petición'
                })   
            }
            if(!articles || articles.length <= 0){
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay articulos que coincidan con tu busqueda'
                }) 
            }
            return res.status(200).send({
                status: 'success',
                articles
            })
        });


    }
}

module.exports = controller;