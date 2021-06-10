import * as THREE from '../libs/three.module.js'
import { Coco } from './Coco.js'
import * as TWEEN from '../libs/tween.esm.js'
import { Manzana } from './Manzana.js'
import { Uva } from './Uva.js'
import { Cereza } from './Cereza.js'

class Fruta extends THREE.Object3D {
    constructor(tipoFigura, posicionX, posicionY) {
        super();

        this.tipoFigura=tipoFigura;

        this.posicionX = posicionX;
        this.posicionY = posicionY;
        this.figura;

        if (this.tipoFigura == 0) {
            
            this.coco = new Coco(this);
            this.coco.position.x = this.posicionX;
            this.coco.position.y = this.posicionY;
            this.figura=this.coco
            this.add(this.coco);
        }

        if (this.tipoFigura == 1) {
            this.manzana=new Manzana(this);
            this.manzana.position.x = this.posicionX;
            this.manzana.position.y = this.posicionY;
            this.figura=this.manzana;
            this.add(this.manzana);
        }

        if (this.tipoFigura == 2) {
            this.uva=new Uva(this);
            this.uva.position.x = this.posicionX;
            this.uva.position.y = this.posicionY;
            this.figura=this.uva;
            this.add(this.uva);
        }
        if (this.tipoFigura == 3) {
            this.cereza=new Cereza(this);
            this.cereza.position.x = this.posicionX;
            this.cereza.position.y = this.posicionY;
            this.figura=this.cereza;
            this.add(this.cereza);
        }


    }

    getX() {
        return this.figura.position.x;
    }

    getY() {
        return this.figura.position.y;
    }

    getTipoFigura()
    {
        return this.tipoFigura;
    }

    setX(x)
    {
        this.posicionX=x;
        this.figura.position.x=this.posicionX;
    }

    setY(y)
    {
        var aux=this.posicionY;
        this.posicionY=y;
        
        this.animarCaida(aux);
        
    }
    
    getMatrizX() {
        return this.posicionX / 2.5;
    }
    getMatrizY() {
        return this.posicionY / 2.5;
    }

    animarCaida(aux){
        var origenY = { y: aux };
        var destinoY = { y: this.posicionY };
        
        var that = this;
        
        this.movimientoSeleccion1 = new TWEEN.Tween(origenY)
        .to(destinoY, 500)
        .easing(TWEEN.Easing.Linear.None)
        .onUpdate(function () {
            that.figura.position.y = origenY.y;

        }).start();

    }

    animarFiguraSeleccion(parar) {
        if (!parar) {
            var origenY = { y: 0 };
            var destinoY = { y: 2*Math.PI };

            var that = this;

            this.movimientoSeleccion1 = new TWEEN.Tween(origenY)
                .to(destinoY, 3000)
                .easing(TWEEN.Easing.Linear.None)
                .onUpdate(function () {
                    that.figura.rotation.y = origenY.y;

                }).repeat(Infinity);


            this.movimientoSeleccion1.start();


        } else {

            this.movimientoSeleccion1.stop();

            var origenY2 = { y: this.figura.rotation.y };
            var destinoY2 = { y: 0 };
            var that = this;

            var movimientoSeleccion2 = new TWEEN.Tween(origenY2)
                .to(destinoY2, 1000)
                .easing(TWEEN.Easing.Linear.None)
                .onUpdate(function () {
                    that.figura.rotation.y = origenY2.y;

                }).start();

        }

    }


    animarIntercambio(objetoIntercambiar) {
        //Si estan en la misma columna

        if (this.getMatrizX() == objetoIntercambiar.getMatrizX()) {
            
            let posIntercambio=this.getY();
            let posIntercambio2=objetoIntercambiar.getY();
           
            var origenZ = { z: 0 };
            var destinoZ = { z: 2.0 };

            var that = this;

            var movimientoZ = new TWEEN.Tween(origenZ)
                .to(destinoZ, 1000)
                .easing(TWEEN.Easing.Linear.None)
                .onUpdate(function () {
                    that.figura.position.z = origenZ.z;
                    
                }).start();
                
            
          
            var origenY1 = { y: this.getY() };
            var destinoY1 = { y: objetoIntercambiar.getY() };
                
            var that = this;
    
            var movimientoY1 = new TWEEN.Tween(origenY1)
                .to(destinoY1, 1000)
                .easing(TWEEN.Easing.Linear.None)
                .onUpdate(function () {
                    that.figura.position.y = origenY1.y;
    
                }).start();
            
            
            var origenY2 = { y: posIntercambio2 };
            var destinoY2 = { y: posIntercambio };
                
            var movimientoY2 = new TWEEN.Tween(origenY2)
                .to(destinoY2, 1000)
                .easing(TWEEN.Easing.Linear.None)
                .onUpdate(function () {
                    objetoIntercambiar.figura.position.y = origenY2.y;
        
                }).start();

            var origenZ2 = { z: 2.0 };
            var destinoZ2 = { z: 0.0 };
    
            var that = this;
    
            var movimientoZ2 = new TWEEN.Tween(origenZ2)
                    .to(destinoZ2, 1000)
                    .easing(TWEEN.Easing.Linear.None)
                    .onUpdate(function () {
                        that.figura.position.z = origenZ2.z;
                        
                }).start();

            
            var auxY=this.posicionY;
            this.posicionY=objetoIntercambiar.posicionY;
            objetoIntercambiar.posicionY=auxY;
            //console.log("Llego");
          
            return false;
          
          
        }
        else if(this.getMatrizY() == objetoIntercambiar.getMatrizY())
        {
            let posIntercambio=this.getX();
            let posIntercambio2=objetoIntercambiar.getX();
            
            

            var origenZ = { z: 0 };
            var destinoZ = { z: 2.0 };

            var that = this;

            var movimientoZ = new TWEEN.Tween(origenZ)
                .to(destinoZ, 1000)
                .easing(TWEEN.Easing.Linear.None)
                .onUpdate(function () {
                    that.figura.position.z = origenZ.z;
                    
                }).start();
                
            var origenX1 = { x: this.getX() };
            var destinoX1 = { x: objetoIntercambiar.getX() };
                
            var that = this;
    
            var movimientoX1 = new TWEEN.Tween(origenX1)
                .to(destinoX1, 1000)
                .easing(TWEEN.Easing.Linear.None)
                .onUpdate(function () {
                    that.figura.position.x = origenX1.x;
    
                }).start();
            
            
            var origenX2 = { x: posIntercambio2 };
            var destinoX2 = { x: posIntercambio };
                
            var movimientoX2 = new TWEEN.Tween(origenX2)
                .to(destinoX2, 1000)
                .easing(TWEEN.Easing.Linear.None)
                .onUpdate(function () {
                    objetoIntercambiar.figura.position.x = origenX2.x;
        
                }).start();

            var origenZ2 = { z: 2.0 };
            var destinoZ2 = { z: 0.0 };
    
            var that = this;
    
            var movimientoZ2 = new TWEEN.Tween(origenZ2)
                    .to(destinoZ2, 1000)
                    .easing(TWEEN.Easing.Linear.None)
                    .onUpdate(function () {
                        that.figura.position.z = origenZ2.z;
                        
                }).start();

                
            var auxX=this.posicionX;
            this.posicionX=objetoIntercambiar.posicionX;
            objetoIntercambiar.posicionX=auxX;

           
            return false;
           
        }

        else{
            return true;
        }
    }

    animacionEliminar(){
              
        let listener = new THREE.AudioListener();
                        const sound = new THREE.Audio(listener);
                        const audioLoader = new THREE.AudioLoader();
                        audioLoader.load( 'sounds/aparicion.mp3', function( buffer ) {
                        sound.setBuffer( buffer );
                        sound.setLoop( false );
                        sound.setVolume( 0.1 );
                        sound.play();
                        });

        var origenY = { y: -Math.PI };
        var destinoY = { y: Math.PI };

        var that = this;

        this.movimientoSeleccion1 = new TWEEN.Tween(origenY)
            .to(destinoY, 300)
            .easing(TWEEN.Easing.Linear.None)
            .onUpdate(function () {
                that.figura.rotation.y = origenY.y;

            }).repeat(Infinity);


        this.movimientoSeleccion1.start();

        var escaladoInicial= {s: 1};
        var escaladoFinal={s: 0};
        
        var that = this;

        this.movimientoSeleccion2 = new TWEEN.Tween(escaladoInicial)
            .to(escaladoFinal, 900)
            .easing(TWEEN.Easing.Linear.None)
            .onUpdate(function () {
                that.figura.scale.set(escaladoInicial.s, escaladoInicial.s, escaladoInicial.s);

            }).start();
    }

    


    animacionGenerar(){
            
       
        
        
        var origenY = { y: -Math.PI*2 };
        var destinoY = { y: Math.PI*2 };

        var that = this;

        this.movimientoSeleccion1 = new TWEEN.Tween(origenY)
            .to(destinoY, 400)
            .easing(TWEEN.Easing.Linear.None)
            .onUpdate(function () {
                that.figura.rotation.y = origenY.y;

            }).repeat(1);
        

        this.movimientoSeleccion1.start();

        var escaladoInicial= {s: 0.1};
        var escaladoFinal={s: 1};
        
        var that = this;

        
        this.movimientoSeleccion2 = new TWEEN.Tween(escaladoInicial)
            .to(escaladoFinal, 900)
            .easing(TWEEN.Easing.Linear.None)
            .onUpdate(function () {
                that.figura.scale.set(escaladoInicial.s, escaladoInicial.s, escaladoInicial.s);

            }).start();

        
    }



    

    update() {
        TWEEN.update();
    }
}

export { Fruta };