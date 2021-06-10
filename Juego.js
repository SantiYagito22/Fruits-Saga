import * as THREE from '../libs/three.module.js'
import {Fruta} from './Fruta.js'

class Juego extends THREE.Object3D {

    constructor(tam){
        super();

        this.TAM_MAX=tam;
        this.frutas=new THREE.Object3D();
        this.vecFrut=[];
        this.tablero = new Array(this.TAM_MAX);
        this.puntuacion=0;
        this.combo=1;

        for(var i=0;i < this.TAM_MAX;i++)
            this.tablero[i]= new Array(this.TAM_MAX);

        this.generarFiguras(this.TAM_MAX);
        this.generarFondo();
        this.add(this.frutas);
    }

    

    generarFiguras(tam){
        
        if(tam==5)
        {
            for(var i=0;i < this.TAM_MAX;i++)
            {
                for(var j=0;j<this.TAM_MAX;j++)
                {
                    var random=Math.floor(Math.random() * 4);  
                    
                    //this.add(new Fruta(random,i*2.5,j*2.5));
                    this.tablero[i][j]= new Fruta(random,i*2.5,j*2.5);
                    this.frutas.add(this.tablero[i][j]);
                    this.vecFrut.push(this.tablero[i][j]);
                }
            }
        }
        //Genera la matriz con la que trabajaremos
        else if(tam==3)
        {
            this.tablero[0][0]= new Fruta(3,0,0);
            this.frutas.add(this.tablero[0][0]);
            this.vecFrut.push(this.tablero[0][0]);
            
            this.tablero[0][1]= new Fruta(2,0,2.5);
            this.frutas.add(this.tablero[0][1]);
            this.vecFrut.push(this.tablero[0][1]);
    
            this.tablero[0][2]= new Fruta(1,0,5);
            this.frutas.add(this.tablero[0][2]);
            this.vecFrut.push(this.tablero[0][2]);

            this.tablero[1][0]= new Fruta(3,2.5,0);
            this.frutas.add(this.tablero[1][0]);
            this.vecFrut.push(this.tablero[1][0]);

            this.tablero[1][1]= new Fruta(2,2.5,2.5);
            this.frutas.add(this.tablero[1][1]);
            this.vecFrut.push(this.tablero[1][1]);

            this.tablero[1][2]= new Fruta(1,2.5,5);
            this.frutas.add(this.tablero[1][2]);
            this.vecFrut.push(this.tablero[1][2]);

            this.tablero[2][0]= new Fruta(0,5,0);
            this.frutas.add(this.tablero[2][0]);
            this.vecFrut.push(this.tablero[2][0]);

            this.tablero[2][1]= new Fruta(3,5,2.5);
            this.frutas.add(this.tablero[2][1]);
            this.vecFrut.push(this.tablero[2][1]);

            this.tablero[2][2]= new Fruta(2,5,5);
            this.frutas.add(this.tablero[2][2]);
            this.vecFrut.push(this.tablero[2][2]);
        }
        else{
                    
        this.tablero[0][0]= new Fruta(1,0,0);
        this.frutas.add(this.tablero[0][0]);
        this.vecFrut.push(this.tablero[0][0]);
        
        this.tablero[0][1]= new Fruta(1,0,2.5);
        this.frutas.add(this.tablero[0][1]);
        this.vecFrut.push(this.tablero[0][1]);

        this.tablero[0][2]= new Fruta(2,0,5);
        this.frutas.add(this.tablero[0][2]);
        this.vecFrut.push(this.tablero[0][2]);

        this.tablero[0][3]= new Fruta(1,0,7.5);
        this.frutas.add(this.tablero[0][3]);
        this.vecFrut.push(this.tablero[0][3]);

        this.tablero[1][0]= new Fruta(1,2.5,0);
        this.frutas.add(this.tablero[1][0]);
        this.vecFrut.push(this.tablero[1][0]);

        this.tablero[1][1]= new Fruta(1,2.5,2.5);
        this.frutas.add(this.tablero[1][1]);
        this.vecFrut.push(this.tablero[1][1]);

        this.tablero[1][2]= new Fruta(0,2.5,5);
        this.frutas.add(this.tablero[1][2]);
        this.vecFrut.push(this.tablero[1][2]);

        this.tablero[1][3]= new Fruta(2,2.5,7.5);
        this.frutas.add(this.tablero[1][3]);
        this.vecFrut.push(this.tablero[1][3]);

        this.tablero[2][0]= new Fruta(0,5,0);
        this.frutas.add(this.tablero[2][0]);
        this.vecFrut.push(this.tablero[2][0]);

        this.tablero[2][1]= new Fruta(2,5,2.5);
        this.frutas.add(this.tablero[2][1]);
        this.vecFrut.push(this.tablero[2][1]);

        this.tablero[2][2]= new Fruta(2,5,5);
        this.frutas.add(this.tablero[2][2]);
        this.vecFrut.push(this.tablero[2][2]);

        this.tablero[2][3]= new Fruta(1,5,7.5);
        this.frutas.add(this.tablero[2][3]);
        this.vecFrut.push(this.tablero[2][3]);

        this.tablero[3][0]= new Fruta(1,7.5,0);
        this.frutas.add(this.tablero[3][0]);
        this.vecFrut.push(this.tablero[3][0]);

        this.tablero[3][1]= new Fruta(2,7.5,2.5);
        this.frutas.add(this.tablero[3][1]);
        this.vecFrut.push(this.tablero[3][1]);

        this.tablero[3][2]= new Fruta(0,7.5,5);
        this.frutas.add(this.tablero[3][2]);
        this.vecFrut.push(this.tablero[3][2]);

        this.tablero[3][3]= new Fruta(2,7.5,7.5);
        this.frutas.add(this.tablero[3][3]);
        this.vecFrut.push(this.tablero[3][3]);
        }

        

    }
    
    getCombo()
    {
        return this.combo;
    }

    getPuntuacion()
    {
        return this.puntuacion;
    }

    setCombo(v)
    {
        this.combo=this.combo+v;
        document.getElementById('x').style.display="flex";
        document.getElementById('comb').innerHTML=this.combo;
    }

    resetCombo()
    {
        this.combo=1;
        document.getElementById('x').style.display="none";
        document.getElementById('comb').innerHTML="";
    }

    setPuntuacion(v)
    {
        this.puntuacion=this.puntuacion+v;
        document.getElementById('suma').style.display="flex";
        document.getElementById('suma').innerHTML="+"+v;
        document.getElementById('punt').innerHTML=this.puntuacion;
    }
    
    generarFondo(){
        for(var i=0;i < this.TAM_MAX;i++)
        {
            for(var j=0;j<this.TAM_MAX;j++)
            {
                this.fondo=this.createFondo(i*2.5,j*2.5);
                this.fondo.castShadow=true;
                this.fondo.receiveShadow=true;
                this.add(this.fondo);
            }
            
        }
    }

    createFondo(x,y) {
        // El suelo es un Mesh, necesita una geometría y un material.
        
        // La geometría es una caja con muy poca altura
        var geometryFondo = new THREE.BoxGeometry (2.5,2.5,0.1);
        
        // El material se hará con una textura de madera
        var texture = new THREE.TextureLoader().load('../imgs/Fondo.jpg');
        var materialFondo = new THREE.MeshPhongMaterial ({map: texture});
        
        // Ya se puede construir el Mesh
        var fondoFigura = new THREE.Mesh (geometryFondo, materialFondo);
        fondoFigura.position.x= x;
        fondoFigura.position.y= y;
        fondoFigura.position.z= -1;
       
        return fondoFigura;
      }

      getTablero()
      {
        return this.frutas.children;
      }

    seRompe() {
        //var v=false;
        //setTimeout(function() {

            let numeroSeguido=1;
            let tipoFigura=-1;
            let vectorRomper=[];
            let sigue=false;
            
            for(var k=0;k<this.TAM_MAX;k++)
            {
                for(var i=0;i < this.TAM_MAX ;i++)
                {
                  
                    vectorRomper=[];
                    tipoFigura=this.tablero[i][k].getTipoFigura();
                    numeroSeguido=0;
                    sigue=false;
                    for(var j=k;j<this.TAM_MAX && !sigue ;j++)
                    {
                        if(this.tablero[i][j].getTipoFigura()==tipoFigura)
                        {
                            vectorRomper.push(this.tablero[i][j]);
                            numeroSeguido++;
                        }
                        else{
                            sigue=true;
                        }
                    }
                    if(numeroSeguido>=3)
                    {
                        
                        this.setPuntuacion(Math.round((this.combo*numeroSeguido*100)/this.TAM_MAX),1);
                        this.eliminarFiguras(vectorRomper);
                        
                        return true;
                    }
                }
            }
            
            
            for(var k=0;k<this.TAM_MAX;k++)
            {
                for(var j=0;j < this.TAM_MAX ;j++)
                {
                    
                    vectorRomper=[];
                    tipoFigura=this.tablero[k][j].getTipoFigura();
                    numeroSeguido=0;
                    sigue=false;
                    for(var i=k;i<this.TAM_MAX && !sigue ;i++)
                    {
                        if(this.tablero[i][j].getTipoFigura()==tipoFigura)
                        {
                            vectorRomper.push(this.tablero[i][j]);
                            numeroSeguido++;
                        }
                        else{
                            sigue=true;
                        }
                    }
                    if(numeroSeguido>=3)
                    {
                        this.setPuntuacion((this.combo*numeroSeguido*100)/this.TAM_MAX);
                        this.eliminarFiguras(vectorRomper);
                        return true;
                    }
                }
            }
            
          //}, 4);
      }

      

    intercambiarMatrices(objetoSelec1,objetoSelec2){
      
        this.tablero[objetoSelec1.getMatrizX()][objetoSelec1.getMatrizY()]=objetoSelec1;
        this.tablero[objetoSelec2.getMatrizX()][objetoSelec2.getMatrizY()]=objetoSelec2;
        
    }

    eliminarFiguras(vectorRomper){
        var direccion;
        if(vectorRomper[0].getMatrizX()==vectorRomper[1].getMatrizX())
        {
            direccion="vertical";
        }
        else if(vectorRomper[0].getMatrizY()==vectorRomper[1].getMatrizY())
        {
            direccion="horizontal";
        }
        

        
        for(var i=0;i<vectorRomper.length ;i++)
        {

            this.tablero[vectorRomper[i].getMatrizX()][vectorRomper[i].getMatrizY()].animacionEliminar();
        }

        var that=this;
        setTimeout(function(){
            
            for(var i=0;i<vectorRomper.length ;i++)
            {
                
                that.frutas.remove(that.tablero[vectorRomper[i].getMatrizX()][vectorRomper[i].getMatrizY()]);
                that.tablero[vectorRomper[i].getMatrizX()][vectorRomper[i].getMatrizY()]=null;
            }
    
    
            if(direccion=="vertical")
            {
                that.caerFigurasVertical(vectorRomper[0].getMatrizX());
               
            }
            else if(direccion=="horizontal")
            {
               that.caerFigurasHorizontal(vectorRomper);
            }
    
            
            setTimeout(function(){
                that.rellenarHuecos();
                },1000);
                
            document.getElementById('suma').style.display="none";
            setTimeout(function(){
                if(that.seRompe()){
                    that.setCombo(1);
                }},2100);
    



            },900);

      
        
    }

    caerFigurasHorizontal(vectorRomper){
            
        for(var i=0;i < vectorRomper.length ;i++)
        {
            this.caerFigurasVertical(vectorRomper[i].getMatrizX());
        }
        
    }



    caerFigurasVertical(posX)
    {

        let sigue=false;

        for(var i=0;i < this.TAM_MAX ;i++)
        {       
            sigue=false;

            if(this.tablero[posX][i]==null)
            {
                
                for(var j=i+1;j<this.TAM_MAX && !sigue;j++)
                {
                    if(this.tablero[posX][j]!=null)
                    {
                        
                        this.tablero[posX][j].setY(i*2.5);
                        this.tablero[posX][i]=this.tablero[posX][j];
                        this.tablero[posX][j]=null;
                        sigue=true;
                    }
                }

            }
        }

      


    }

    rellenarHuecos(){
        for(var i=0;i < this.TAM_MAX ;i++)
        {

            for(var j=0;j<this.TAM_MAX;j++)
            {
                if(this.tablero[i][j]==null){
                    var random=Math.floor(Math.random() * 4);  
                    let frut=new Fruta(random,i*2.5,j*2.5);
                    frut.animacionGenerar();
                    this.tablero[i][j]=frut;
                    this.frutas.add(frut);
                   
                 
                    

                }
            }
        }
    }

      
}

export{Juego};