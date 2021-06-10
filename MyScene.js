
// Clases de la biblioteca

import * as THREE from '../libs/three.module.js'
import { GUI } from '../libs/dat.gui.module.js'
import { TrackballControls } from '../libs/TrackballControls.js'
import { ThreeBSP } from '../libs/ThreeBSP.js'
import * as TWEEN from '../libs/tween.esm.js'
// Clases de mi proyecto

import { Juego } from './Juego.js'


/// La clase fachada del modelo
/**
 * Usaremos una clase derivada de la clase Scene de Three.js para llevar el control de la escena y de todo lo que ocurre en ella.
 */

class MyScene extends THREE.Scene {
  constructor(myCanvas) {
    super();
    this.objetoSeleccionado1 = null;
    this.objetoSeleccionado2 = null;

   
      this.listener = new THREE.AudioListener();
      const sound2 = new THREE.Audio(this.listener);
      const audioLoader2 = new THREE.AudioLoader();
      audioLoader2.load('sounds/MusicaFondo.mp3', function (buffer) {
      sound2.setBuffer(buffer);
      sound2.setLoop(true);
      sound2.setVolume(0.1);
      sound2.play();
    });
    
    

    // Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
    this.renderer = this.createRenderer(myCanvas);

    // Construimos los distinos elementos que tendremos en la escena

    // Todo elemento que se desee sea tenido en cuenta en el renderizado de la escena debe pertenecer a esta. Bien como hijo de la escena (this en esta clase) o como hijo de un elemento que ya esté en la escena.
    // Tras crear cada elemento se añadirá a la escena con   this.add(variable)
    this.createLights();

    // Tendremos una cámara con un control de movimiento con el ratón
    this.createCamera();

  
    this.empezar = false;
    this.finalizar=false
   
    
    this.nivel1=document.getElementById('Nivel1');
    this.nivel2=document.getElementById('Nivel2');
    this.nivel3=document.getElementById('Nivel3');

    // Por último creamos el modelo.
    // El modelo puede incluir su parte de la interfaz gráfica de usuario. Le pasamos la referencia a 
    // la gui y el texto bajo el que se agruparán los controles de la interfaz que añada el modelo.

    

    this.background = new THREE.TextureLoader().load('../imgs/playa.png');
   
  }



  crearNivel(nivel){

    document.getElementById('inicio').style.display="none";

    if(nivel==1){
      
      this.juego = new Juego(5);
      this.setCamera(5);
      this.movimientos = 25;
      this.objetivo = 7000;
      document.getElementById('movs').innerHTML = this.movimientos;
      document.getElementById('obj').innerHTML = this.objetivo;
      document.getElementById('punt').innerHTML = this.juego.getPuntuacion();
      this.add(this.juego);

    }else if(nivel==2){
      this.juego = new Juego(4);
      this.setCamera(4);
      this.movimientos = 20;
      this.objetivo = 5000;
      document.getElementById('movs').innerHTML = this.movimientos;
      document.getElementById('obj').innerHTML = this.objetivo;
      document.getElementById('punt').innerHTML = this.juego.getPuntuacion();
      this.add(this.juego);
    
    }else if(nivel==3){
      this.juego = new Juego(3);
      this.setCamera(3);
      this.movimientos = 20;
      this.objetivo = 3000;
      document.getElementById('punt').innerHTML = this.juego.getPuntuacion();
      document.getElementById('movs').innerHTML = this.movimientos;
      document.getElementById('obj').innerHTML = this.objetivo;
      this.add(this.juego);
    }

  }

  
  

  onDocumentMouseDown(event) {

    if(this.empezar==true){
      
    var mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = 1 - 2 * (event.clientY / window.innerHeight);

    var raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, this.camera);

    var pickedObjects = raycaster.intersectObjects(this.juego.getTablero(), true);

    


    if (this.movimientos == 0 && this.juego.getPuntuacion()<this.objetivo) {
      document.getElementById('box').style.display="block";
      document.getElementById('info').style.display="none";
      document.getElementById('puntFinal1').innerHTML=this.juego.getPuntuacion();
      this.finalizar=true;
    }
    else if(this.juego.getPuntuacion()>=this.objetivo){
      document.getElementById('box2').style.display="block";
      document.getElementById('info').style.display="none";
      document.getElementById('puntFinal2').innerHTML=this.juego.getPuntuacion();
      this.finalizar=true;
    }
    else {
      if (pickedObjects.length > 0) {
        if (this.objetoSeleccionado1 == null) {
          this.objetoSeleccionado1 = pickedObjects[0].object;
          this.objetoSeleccionado1.userData.animarFiguraSeleccion(false);

          this.juego.resetCombo();
          //console.log(this.objetoSeleccionado1.userData);
        }
        else if (this.objetoSeleccionado2 == null) {
          //Condiciones de intercambio

          this.objetoSeleccionado1.userData.animarFiguraSeleccion(true);
          //console.log(this.objetoSeleccionado1.userData.getY());
          this.objetoSeleccionado2 = pickedObjects[0].object;
          if (this.objetoSeleccionado1.userData.getX() - this.objetoSeleccionado2.userData.getX() == 2.5 || this.objetoSeleccionado1.userData.getX() - this.objetoSeleccionado2.userData.getX() == -2.5 ||
            this.objetoSeleccionado1.userData.getY() - this.objetoSeleccionado2.userData.getY() == 2.5 || this.objetoSeleccionado1.userData.getY() - this.objetoSeleccionado2.userData.getY() == -2.5) {
            let intercambiado = this.objetoSeleccionado1.userData.animarIntercambio(this.objetoSeleccionado2.userData);
            if (intercambiado == false) {
              this.juego.intercambiarMatrices(this.objetoSeleccionado1.userData, this.objetoSeleccionado2.userData);
              this.movimientos--;

              document.getElementById('movs').innerHTML = this.movimientos;



            }

            var that = this;

            setTimeout(function () {
              that.juego.seRompe()
            }, 1100);

            this.objetoSeleccionado1 = null;
            this.objetoSeleccionado2 = null;
          }
          else {
            const sound = new THREE.Audio(this.listener);
            const audioLoader = new THREE.AudioLoader();
            audioLoader.load('sounds/Fallo.mp3', function (buffer) {
              sound.setBuffer(buffer);
              sound.setLoop(false);
              sound.setVolume(0.7);
              sound.play();
            });
            this.objetoSeleccionado1 = null;
            this.objetoSeleccionado2 = null;
          }

          //this.objetoSeleccionado2= pickedObjects[0].object;
        }


      }
    }

    }
  }

  setCamera(valor) {
    if(valor==5)
    {
      this.camera.position.set(5, 5, 25);
      // Y hacia dónde mira
      var look = new THREE.Vector3(5, 5, 0);
      this.camera.lookAt(look);
    }
    else if(valor==4)
    {
      this.camera.position.set(3.75, 3.75, 25);
      // Y hacia dónde mira
      var look = new THREE.Vector3(3.75, 3.75, 0);
      this.camera.lookAt(look);
    }
    else if(valor==3)
    {
      this.camera.position.set(2.5, 2.5, 25);
      // Y hacia dónde mira
      var look = new THREE.Vector3(2.5, 2.5, 0);
      this.camera.lookAt(look);
    }
  }

  createCamera() {
    // Para crear una cámara le indicamos
    //   El ángulo del campo de visión en grados sexagesimales
    //   La razón de aspecto ancho/alto
    //   Los planos de recorte cercano y lejano
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    // También se indica dónde se coloca
    this.camera.position.set(5, 5, 25);
    // Y hacia dónde mira
    var look = new THREE.Vector3(5, 5, 0);
    this.camera.lookAt(look);

    //Añadimos un audio a la camara para cuando falla


    this.camera.add(this.listener);

    this.add(this.camera);
    // Para el control de cámara usamos una clase que ya tiene implementado los movimientos de órbita

    this.cameraControl = new TrackballControls(this.camera, this.renderer.domElement);
    // Se configuran las velocidades de los movimientos
    this.cameraControl.rotateSpeed = 0;
    this.cameraControl.zoomSpeed = 0;
    this.cameraControl.panSpeed = 0;
    //Debe orbitar con respecto al punto de mira de la cámara
    this.cameraControl.target = look;
  }

  

  createLights() {
    // Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
    // La luz ambiental solo tiene un color y una intensidad
    // Se declara como   var   y va a ser una variable local a este método
    //    se hace así puesto que no va a ser accedida desde otros métodos
    var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);

    // La añadimos a la escena
    this.add(ambientLight);

    // Se crea una luz focal que va a ser la luz principal de la escena
    // La luz focal, además tiene una posición, y un punto de mira
    // Si no se le da punto de mira, apuntará al (0,0,0) en coordenadas del mundo
    // En este caso se declara como   this.atributo   para que sea un atributo accesible desde otros métodos.
    
    this.spotLight = new THREE.SpotLight(0xffffff, 0.75);
    this.spotLight.position.set(60, 60, 40);
    this.add(this.spotLight);

    
    this.luzSeleccion=new THREE.SpotLight(0xFF8000, 0.6);
    this.luzSeleccion.position.set(11, 11, 10);

    this.luzSeleccion.castShadow=true;
  
   
    this.add(this.luzSeleccion);

    
    
    
  }

  createRenderer(myCanvas) {
    // Se recibe el lienzo sobre el que se van a hacer los renderizados. Un div definido en el html.

    // Se instancia un Renderer   WebGL
    var renderer = new THREE.WebGLRenderer();

    // Se establece un color de fondo en las imágenes que genera el render
    renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);

    // Se establece el tamaño, se aprovecha la totalidad de la ventana del navegador
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.shadowMap.enabled=true;
    renderer.shadowMap.type=THREE.PCFSoftShadowMap;

    // La visualización se muestra en el lienzo recibido
    $(myCanvas).append(renderer.domElement);

    return renderer;
  }

  getCamera() {
    // En principio se devuelve la única cámara que tenemos
    // Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
    return this.camera;
  }

  setCameraAspect(ratio) {
    // Cada vez que el usuario modifica el tamaño de la ventana desde el gestor de ventanas de
    // su sistema operativo hay que actualizar el ratio de aspecto de la cámara
    this.camera.aspect = ratio;
    // Y si se cambia ese dato hay que actualizar la matriz de proyección de la cámara
    this.camera.updateProjectionMatrix();
  }

  onWindowResize() {
    // Este método es llamado cada vez que el usuario modifica el tamapo de la ventana de la aplicación
    // Hay que actualizar el ratio de aspecto de la cámara
    this.setCameraAspect(window.innerWidth / window.innerHeight);

    // Y también el tamaño del renderizador
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }




  update() {
    // Se actualizan los elementos de la escena para cada frame
    // Se actualiza la intensidad de la luz con lo que haya indicado el usuario en la gui
    //this.spotLight.intensity = this.guiControls.lightIntensity;

    var that=this;
    this.nivel1.onclick = function(){
      that.crearNivel(1);
      that.empezar=true;
      
    }
    this.nivel2.onclick = function(){
      that.crearNivel(2);
      that.empezar=true;
    }
    this.nivel3.onclick = function(){
      that.crearNivel(3);
      that.empezar=true;
    }

    document.addEventListener('keydown', (ev) =>{
      if(this.finalizar==true && ev.key=="Enter")
      {
        this.finalizar=false;
        //console.log("Entro");
        location.reload();
      }
    });
    

    // Se muestran o no los ejes según lo que idique la GUI
    TWEEN.update();

    // Se actualiza la posición de la cámara según su controlador
    this.cameraControl.update();

    // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
    this.renderer.render(this, this.getCamera());

    // Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.
    // Literalmente le decimos al navegador: "La próxima vez que haya que refrescar la pantalla, llama al método que te indico".
    // Si no existiera esta línea,  update()  se ejecutaría solo la primera vez.
    requestAnimationFrame(() => this.update())
  }
}



/// La función   main
$(function () {

  // Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
  var scene = new MyScene("#WebGL-output");

  // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
  window.addEventListener("resize", () => scene.onWindowResize());

  //Click para firefox
  window.addEventListener("mousedown", (event) => scene.onDocumentMouseDown(event), true);
  //Click para Chrome
  window.addEventListener("pointerdown", (event) => scene.onDocumentMouseDown(event), true);

 

  // Que no se nos olvide, la primera visualización.
  scene.update();

});
