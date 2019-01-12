var app={
  inicio: function(){

    this.iniciaBotones();
    this.iniciaFastClick();
    this.iniciaHammer();
  },

  iniciaFastClick: function() {
    FastClick.attach(document.body);
  },

  iniciaBotones: function() {
    var botonClaro = document.querySelector('#claro');
    var botonOscuro = document.querySelector('#oscuro');
    
    botonClaro.addEventListener('click',this.ponloClaro,false);
    botonOscuro.addEventListener('click',this.ponloOscuro,false);
  },

  iniciaHammer: function () {
    var zona = document.getElementById('zona-gestos');
    var hammertime = new Hammer(zona);

    hammertime.get('pinch').set ({enable: true});
    hammertime.get('rotate').set ({enable: true});;
    
    // hammertime.on('tap doubletap pan swipe press pinch rotate', function(ev) {
    //   document.querySelector('#info').innerHTML= ev.type+'!';
    // });

    zona.addEventListener('webkitAnimationEnd', function(e){
      zona.className='';
    })

    hammertime.on('doubletap', function(ev) {
      zona.className = 'doubletap';
      document.querySelector('#info').innerHTML= ev.type+'!';
    });

    hammertime.on('press', function(ev) {
      zona.className = 'press';
      document.querySelector('#info').innerHTML= ev.type+'!';
    });

    hammertime.on('swipe', function(ev) {
      var clase=undefined;
      var eventString='';
      direccion=ev.direction;
      if (direccion==4) {
        clase='swipe-derecha';
        eventString='derecha';
      }
      if (direccion==2) { 
        clase='swipe-izquierda';
        eventString='izquierda';
      }
    zona.className=clase;
      document.querySelector('#info').innerHTML= ev.type+'! ' + eventString;
    });

    hammertime.on('rotate', function(ev) {
      var umbral=25;
      if (ev.distance > umbral){
        zona.className='rotate';
      }
      document.querySelector('#info').innerHTML= ev.type+'!';
    });

  },

  ponloClaro: function(){
    document.body.className = 'claro';
  },

  ponloOscuro: function(){
    document.body.className = 'oscuro';
  },

};

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
      app.inicio();
  }, false);
}




