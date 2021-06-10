import * as THREE from '../libs/three.module.js'
import { ThreeBSP } from '../libs/ThreeBSP.js'

class Coco extends THREE.Object3D {
  constructor(padre) {
    super();
    this.padre=padre;
    var Coco1 = new THREE.Object3D();

    this.parteFuera=this.crearCascara();
    this.parteDentro=this.crearRelleno();
    this.parteDentro.position.y+=0.1;
    Coco1.add(this.parteFuera);
    Coco1.add(this.parteDentro);

    var Coco2 = new THREE.Object3D();
    Coco1.rotation.y= THREE.Math.degToRad(45);
    Coco2.add(Coco1);
    this.ojos=this.crearOjos();
    Coco2.add(this.ojos);
    Coco2.scale.set(0.9,0.9,0.9)

    Coco2.traverseVisible(function (unNodo){
      unNodo.castShadow=true;
      unNodo.receiveShadow=true;
    }); 
    
    this.add(Coco2);
    
    

   

    // Un Mesh se compone de geometría y material
    
    // Como material se crea uno a partir de un color

    
    
    // Las geometrías se crean centradas en el origen.
    // Como queremos que el sistema de referencia esté en la base,
    // subimos el Mesh de la caja la mitad de su altura
    


  }



  crearCascara()
  {
   


    var Cascara = new THREE.Object3D();

    var loader = new THREE.TextureLoader();
    var textura = loader.load('imgs/texturaCoco.png');
    var materialCoco  =  new THREE.MeshPhongMaterial({map: textura});

    var cilindroFuera= new THREE.CylinderGeometry(1.2,1.0,1.5,4.0);
    var cilindroDentro=new THREE.CylinderGeometry(1.0,0.8,1.5,4.0);
    

    cilindroDentro.translate(0.0,0.2,0.0);

    
    
    var CocoFuerabsp=new ThreeBSP(cilindroFuera);
    var CocoDentrobsp=new ThreeBSP(cilindroDentro);

    var totalResult=CocoFuerabsp.subtract(CocoDentrobsp);

    var geometry= totalResult.toGeometry();
    var bufferGeometry= new THREE.BufferGeometry().fromGeometry(geometry);
    var result= new THREE.Mesh(bufferGeometry,materialCoco);

    result.userData=this.padre;
    
    Cascara.add(result);

    return Cascara;
  }

  
  crearRelleno()
  {
      
    var Relleno = new THREE.Object3D();
    var materialRelleno  =  new THREE.MeshPhongMaterial({color: 0xFFEFE6});
    var cilindroFuera= new THREE.CylinderGeometry(0.97,0.8,1.3,4.0);
    var cilindroDentro=new THREE.CylinderGeometry(0.8,0.6,1.3,4.0);
    

    cilindroDentro.translate(0.0,0.2,0.0);

    
    
    var CocoFuerabsp=new ThreeBSP(cilindroFuera);
    var CocoDentrobsp=new ThreeBSP(cilindroDentro);

    var totalResult=CocoFuerabsp.subtract(CocoDentrobsp);

    var geometry= totalResult.toGeometry();
    var bufferGeometry= new THREE.BufferGeometry().fromGeometry(geometry);
    var result= new THREE.Mesh(bufferGeometry,materialRelleno);
    result.userData=this.padre;
    Relleno.add(result);

    return Relleno;
  }

  crearOjos()
  {
    var ojos = new THREE.Object3D();
    
    var materialOjo  =  new THREE.MeshPhongMaterial({color: 0x000000});
    var materialPupila  =  new THREE.MeshPhongMaterial({color: 0xFFFFFF});
    
    var ojo= new THREE.BoxGeometry(0.2,0.5,0.05);
    var pupila=new THREE.BoxGeometry(0.1,0.2,0.05);
    
    var pupila1= new THREE.Mesh(pupila,materialPupila);
    pupila1.rotation.x=THREE.Math.degToRad(8);
    pupila1.position.x=-0.3;
    pupila1.position.y=0.25;
    pupila1.position.z=0.83;
    pupila1.userData=this.padre;

    var pupila2= new THREE.Mesh(pupila,materialPupila);
    pupila2.rotation.x=THREE.Math.degToRad(8);
    pupila2.position.x=0.3;
    pupila2.position.y=0.25;
    pupila2.position.z=0.83;
    pupila2.userData=this.padre;
    
    ojos.add(pupila1);
    ojos.add(pupila2);

    var ojo1= new THREE.Mesh(ojo,materialOjo);
    
    ojo1.rotation.x=THREE.Math.degToRad(8);
    ojo1.position.x=-0.3;
    ojo1.position.y=0.25;
    ojo1.position.z=0.82;
    ojo1.userData=this.padre;

    var ojo2= new THREE.Mesh(ojo,materialOjo);

    ojo2.rotation.x=THREE.Math.degToRad(8);
    ojo2.position.x=0.3;
    ojo2.position.y=0.25;
    ojo2.position.z=0.82;
    ojo2.userData=this.padre;
    
    ojos.add(ojo1);
    ojos.add(ojo2);

    return ojos;

  }

 

  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
   
  }
}

export { Coco };
