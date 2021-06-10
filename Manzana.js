import * as THREE from '../libs/three.module.js'
import { ThreeBSP } from '../libs/ThreeBSP.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'

class Manzana extends THREE.Object3D {
  constructor(padre) {
    super();
    this.padre=padre;
    var Manzana = new THREE.Object3D();

    this.cuerpo=this.crearCascara();

    Manzana.add(this.cuerpo);
    
    
    var Manzana2 = new THREE.Object3D();
    Manzana.rotation.y= THREE.Math.degToRad(45);
    Manzana2.add(Manzana);
    this.ojos=this.crearOjos();
    Manzana2.add(this.ojos);
   
    this.palo=this.crearPalo();
    Manzana2.add(this.palo);
    this.hoja=this.crearHoja();
    
    Manzana2.add(this.hoja);
    Manzana2.traverseVisible(function (unNodo){
      unNodo.castShadow=true;
      unNodo.receiveShadow=true;
    });
    Manzana2.scale.set(0.9,0.9,0.9)
    this.add(Manzana2);
    
    

   

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
    var textura = loader.load('imgs/texturaManzana.png');
    var materialManzana  =  new THREE.MeshPhongMaterial({map: textura});
    var cilindroFuera= new THREE.CylinderGeometry(1.2,1.0,1.5,4.0);
    var esferaGeom = new THREE.SphereGeometry(0.4,32.0,32.0);
    
    
    esferaGeom.translate(0.0,1.0,0.0);
    
    var CocoFuerabsp=new ThreeBSP(cilindroFuera);
    var esferabsp= new ThreeBSP(esferaGeom);
    

    var totalResult=CocoFuerabsp.subtract(esferabsp);

    var geometry= totalResult.toGeometry();
    var bufferGeometry= new THREE.BufferGeometry().fromGeometry(geometry);
    var result= new THREE.Mesh(bufferGeometry,materialManzana);

    result.userData=this.padre;
    
    Cascara.add(result);

    return Cascara;
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

  crearPalo()
  {

    
    var materialPalo  =  new THREE.MeshPhongMaterial({color: 0xA15429});
        // Puntos
    this.points = [];
    // Se añaden puntos al array, del ply de IG

    this.points.push(new THREE.Vector3(0.0, 0, 0.0));
    this.points.push(new THREE.Vector3(1.0, 4.0, 0.0));
    this.points.push(new THREE.Vector3(1.0, 7.0, 0.0));
    this.points.push(new THREE.Vector3(1.25, 12.0, 0.0));
    this.points.push(new THREE.Vector3(1.5, 15.0, 0.0));
    this.points.push(new THREE.Vector3(1.75, 17, 0.0));
    this.points.push(new THREE.Vector3(0, 17, 0.0));
    

    var palo = new THREE.Mesh ( new THREE.LatheGeometry (this.points, 32.0, 1, 2*Math.PI), materialPalo);
    palo.scale.z=0.1
    palo.scale.y=0.09
    palo.scale.x=0.1
    palo.userData=this.padre;
    return palo;
    
   
  }


  crearHoja()
  {
    var hojaRaiz= new THREE.Object3D();
    
    var cilindroGeom = new THREE.CylinderBufferGeometry(0.2,0.2,17,32.0);
    var raizMat =  new THREE.MeshPhongMaterial({color: 0x335400});

    cilindroGeom.translate(0.0,6.25,0.15)
    var raiz = new THREE.Mesh (cilindroGeom, raizMat);
    raiz.userData=this.padre;

    var hojaMat =  new THREE.MeshPhongMaterial({color: 0x4F8101});
    this.shapeHoja=new THREE.Shape();
    const x = 0, y = 0;

    this.shapeHoja.moveTo(x,y);
    this.shapeHoja.quadraticCurveTo(x+9.2, y, x+4, y+9);
    this.shapeHoja.lineTo(x,y+15);
    this.shapeHoja.lineTo(x-4,y+9);
    this.shapeHoja.quadraticCurveTo( x-9.2, y,x, y);
    
    const intrusionesHoja = {
      steps: 50,
      depth: 0.3,
      bevelEnabled: false,
      bevelThickness: 0.3,
      bevelSize: 0.3,
      bevelOffset: 0,
      bevelSegments:50
    };

    var geomHoja=new THREE.ExtrudeGeometry(this.shapeHoja,intrusionesHoja);
    var hoja=new THREE.Mesh(geomHoja,hojaMat);
    hoja.userData=this.padre;
    
    hojaRaiz.add(hoja)
    hojaRaiz.add(raiz)

    hojaRaiz.scale.x=0.04
    hojaRaiz.scale.y=0.04
    hojaRaiz.scale.z=0.04

    hojaRaiz.rotation.z=THREE.Math.degToRad(-90);
    hojaRaiz.rotation.x=THREE.Math.degToRad(-45);
    
    hojaRaiz.position.y+=1.25;
    hojaRaiz.position.x+=0.2;
    return hojaRaiz;
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

export { Manzana };
