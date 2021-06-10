import * as THREE from '../libs/three.module.js'
import { ThreeBSP } from '../libs/ThreeBSP.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'

class Uva extends THREE.Object3D {
  constructor(padre) {
    super();
    this.padre=padre;
    var Uva = new THREE.Object3D();

    
    this.uva= this.CrearUva();
    this.uva.scale.set(1.1,1.1,1.1)
    this.uva.position.set(0.0,-0.2,0.0)

    this.uva.traverseVisible(function (unNodo){
      unNodo.castShadow=true;
      unNodo.receiveShadow=true;
    });
    Uva.add(this.uva);
    this.add(Uva);

   

    // Un Mesh se compone de geometría y material
    
    // Como material se crea uno a partir de un color

    
    
    // Las geometrías se crean centradas en el origen.
    // Como queremos que el sistema de referencia esté en la base,
    // subimos el Mesh de la caja la mitad de su altura
    


  }

  crearGajo(radio){
    var gajo = new THREE.Object3D();
    var materialUva  =  new THREE.MeshPhongMaterial({color: 0x76008B});
    
    var esferaGeom = new THREE.SphereGeometry(radio,32.0,32.0);
    
    var result= new THREE.Mesh(esferaGeom,materialUva);

    result.userData=this.padre;
    
    gajo.add(result);

    return gajo;
  }

  CrearUva(){
    var cuerpo = new THREE.Object3D();

    var radio1=0.15
    var radio2=0.2
    var radio3=0.25

    var gajo1= this.crearGajo(radio1);
    var gajo2= this.crearGajo(radio1);
    var gajo3= this.crearGajo(radio1);
    var gajo4= this.crearGajo(radio1);
    var gajo5= this.crearGajo(radio1);
    var gajo6= this.crearGajo(radio1);
    var gajo7= this.crearGajo(radio1);
    var gajo8= this.crearGajo(radio1);
    var gajo9= this.crearGajo(radio1);

    var gajo10= this.crearGajo(radio2);
    var gajo11= this.crearGajo(radio2);
    var gajo12= this.crearGajo(radio2);
    var gajo13= this.crearGajo(radio2);
    var gajo14= this.crearGajo(radio2);
    var gajo15= this.crearGajo(radio2);
    var gajo16= this.crearGajo(radio2);
    var gajo17= this.crearGajo(radio2);
    var gajo18= this.crearGajo(radio2);

    var gajo19= this.crearGajo(radio3);
    var gajo20= this.crearGajo(radio3);
    var gajo21= this.crearGajo(radio3);
    var gajo22= this.crearGajo(radio3);
    var gajo23= this.crearGajo(radio3);
    var gajo24= this.crearGajo(radio3);
    var gajo25= this.crearGajo(radio3);
    var gajo26= this.crearGajo(radio3);
    var gajo27= this.crearGajo(radio3);

    
    gajo1.position.set(0.3,-0.35,0.3);
    gajo2.position.set(0.3,-0.35,0.0);
    gajo3.position.set(0.3,-0.35,-0.3);

    gajo4.position.set(0.0,-0.35,0.3);
    gajo5.position.set(0.0,-0.35,0.0);
    gajo6.position.set(0.0,-0.35,-0.3);

    gajo7.position.set(-0.3,-0.35,0.3);
    gajo8.position.set(-0.3,-0.35,0.0);
    gajo9.position.set(-0.3,-0.35,-0.3);


    gajo10.position.set(0.0,0.0,0.0);
    gajo11.position.set(0.0,0.0,0.4);
    gajo12.position.set(0.0,0.0,-0.4);

    gajo13.position.set(0.4,0.0,0.0);
    gajo14.position.set(0.4,0.0,0.4);
    gajo15.position.set(0.4,0.0,-0.4);

    gajo16.position.set(-0.4,0.0,0.0);
    gajo17.position.set(-0.4,0.0,0.4);
    gajo18.position.set(-0.4,0.0,-0.4);
    

    gajo19.position.set(0.0,0.45,0.0);
    gajo20.position.set(0.0,0.45,0.5);
    gajo21.position.set(0.0,0.45,-0.5);

    gajo22.position.set(0.5,0.45,0.0);
    gajo23.position.set(0.5,0.45,0.5);
    gajo24.position.set(0.5,0.45,-0.5);

    gajo25.position.set(-0.5,0.45,0.0);
    gajo26.position.set(-0.5,0.45,0.5);
    gajo27.position.set(-0.5,0.45,-0.5);

    cuerpo.add(gajo1);
    cuerpo.add(gajo2);
    cuerpo.add(gajo3);
    cuerpo.add(gajo4);
    cuerpo.add(gajo5);
    cuerpo.add(gajo6);
    cuerpo.add(gajo7);
    cuerpo.add(gajo8);
    cuerpo.add(gajo9);
    
    cuerpo.add(gajo10);
    cuerpo.add(gajo11);
    cuerpo.add(gajo12);
    cuerpo.add(gajo13);
    cuerpo.add(gajo14);
    cuerpo.add(gajo15);
    cuerpo.add(gajo16);
    cuerpo.add(gajo17);
    cuerpo.add(gajo18);
    
    cuerpo.add(gajo19);
    cuerpo.add(gajo20);
    cuerpo.add(gajo21);
    cuerpo.add(gajo22);
    cuerpo.add(gajo23);
    cuerpo.add(gajo24);
    cuerpo.add(gajo25);
    cuerpo.add(gajo26);
    cuerpo.add(gajo27);
    
    this.ojos=this.crearOjos();
    this.palo=this.crearPalo();
    this.hoja=this.crearHoja();

    this.ojos.position.set(0.0,0.1,-0.1);
    this.palo.position.set(0.0,0.5,0);
    this.hoja.position.set(0.15,0.95,0.0);
    cuerpo.add(this.ojos);
    cuerpo.add(this.palo);
    cuerpo.add(this.hoja);

   

    return cuerpo;
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
    palo.scale.z=0.05
    palo.scale.y=0.04
    palo.scale.x=0.05
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

export { Uva };
