import * as THREE from '../libs/three.module.js'
import { ThreeBSP } from '../libs/ThreeBSP.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'

class Cereza extends THREE.Object3D {
  constructor(padre) {
    super();
    this.padre=padre;
    var Cereza = new THREE.Object3D();
  

    this.cereza= this.CrearCereza();
    this.cereza.scale.z=0.5
    this.cereza.scale.y=0.5
    this.cereza.scale.x=0.5
    this.cereza.position.y=-0.5;
    Cereza.add(this.cereza);

    Cereza.traverseVisible(function (unNodo){
      unNodo.castShadow=true;
      unNodo.receiveShadow=true;
    });
    
    this.add(Cereza);
    
    


  }

  crearCerIzq(){
    var cerIzq = new THREE.Object3D();
    var materialCereza  =  new THREE.MeshPhongMaterial({color: 0xCE0000});
    var cilindroCere= new THREE.CylinderGeometry(1.2,1.0,1.5,4.0);
    
    var cereza= new THREE.Mesh(cilindroCere,materialCereza);
    cereza.rotation.y=THREE.Math.degToRad(45);
    cereza.userData=this.padre;

    var palo=this.crearPalo();
    palo.rotation.z=THREE.Math.degToRad(-30);
    palo.position.set(-0.3,0.3,0.0)
    
    var ojos = this.crearOjos();

    
    cerIzq.add(cereza);
    cerIzq.add(palo);
    cerIzq.add(ojos);

    return cerIzq;
  }

  crearCerDer(){
    var cerIzq = new THREE.Object3D();
    var materialCereza  =  new THREE.MeshPhongMaterial({color: 0xCE0000});
    var cilindroCere= new THREE.CylinderGeometry(1.2,1.0,1.5,4.0);
    
    var cereza= new THREE.Mesh(cilindroCere,materialCereza);
    cereza.rotation.y=THREE.Math.degToRad(45);
    cereza.userData=this.padre;

    var palo=this.crearPalo();
    palo.rotation.z=THREE.Math.degToRad(30);
    palo.position.set(0.3,0.3,0.0)
    
    
    var ojos = this.crearOjos();
    

    
    cerIzq.add(cereza);
    cerIzq.add(palo);
    cerIzq.add(ojos);
    return cerIzq;
  }

  CrearCereza(){
    var entero = new THREE.Object3D();

    var cerDer=this.crearCerDer();

    var cerIzq = this.crearCerIzq();

    cerDer.position.set(0.99,0.0,0.0);
    cerIzq.position.set(-0.99,0.0,0);
    
    
    entero.add(cerDer);
    entero.add(cerIzq);
   

    return entero;
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

    
    var materialPalo  =  new THREE.MeshPhongMaterial({color: 0x6DC36D});
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
    palo.scale.y=0.15
    palo.scale.x=0.1

    

    palo.userData=this.padre;
    return palo;
    
   
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

export { Cereza };
