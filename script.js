    /* ---------------------------------
    ROUE DE GAUCHE  
    ---------------------------------*/
    
    // Création de la roue
    const roueLeft = new Winwheel({
      canvasId: 'canvasRoueLeft',
      numSegments: 7,
      outerRadius: 220,
      textFontSize: 12,
      textFillStyle: '#FFDFE6',
      textFontFamily: 'Poppins',
      segments: [
        { fillStyle: '#E20C1E', text: 'LED' },
        { fillStyle: '#E20C1E', text: 'RGB LED' },
        { fillStyle: '#E20C1E', text: 'passive buzzer' },
        { fillStyle: '#E20C1E', text: '12 leds neopixels ring' },
        { fillStyle: '#E20C1E', text: 'microservo' },
        { fillStyle: '#E20C1E', text: 'motoreductor' },
        { fillStyle: '#E20C1E', text: 'I2C LCD screen' },
      ],
      animation: {
        type: 'spinToStop',
        duration: 6,
        spins: 10,
        callbackFinished: afficherResultat,
      },
    });




    roueLeft.draw(); // Dessine la roue au démarrage

    let roueEnRotationLeft = false;

    // role : lancer la roue
    // parametre : rien
    // return : rien
    function lancerRoue() {
      if (roueEnRotationLeft) return; // Empêche un second clic pendant l'animation

      document.getElementById('resultatLeft').textContent = '';
      roueEnRotationLeft = true;

    
      roueLeft.stopAnimation(false);    // Arrête une animation éventuellement en cours
      roueLeft.rotationAngle = 0;       // Remet l’angle de départ à zéro
      roueLeft.draw();                  // Redessine la roue dans sa position initiale

      // Redémarre l’animation
      roueLeft.startAnimation();
          console.log("left")
    }

    // role : afficher le resultat 
    // parametre : le resultat
    // return : rien
    function afficherResultat(segmentIndique) {
      document.getElementById('resultatLeft').textContent =
        'Composant sélectionné : ' + segmentIndique.text ;
      roueEnRotationLeft = false;
    }

     document.getElementById('boutonLancerLeft').addEventListener('click',lancerRoue);


    /* ---------------------------------
    ROUE DE DROITE  
    ---------------------------------*/

     // Création de la roue
    const roueRight = new Winwheel({
      canvasId: 'canvasRoueRight',
      numSegments: 8,
      outerRadius: 220,
      textFontSize: 14,
      textFillStyle: '#FFDFE6',
      textFontFamily: 'Poppins',
      segments: [
        { fillStyle: '#E20C1E', text: '10kΩ rotary \n potentiometer' },
        { fillStyle: '#E20C1E', text: 'Analog microphone \n module' },
        { fillStyle: '#E20C1E', text: 'Temperature sensor \n TMP36' },
        { fillStyle: '#E20C1E', text: 'Humidity sensor \n DHT11' },
        { fillStyle: '#E20C1E', text: 'ultrasonic sensor \n HC-SR04' },
        { fillStyle: '#E20C1E', text: 'Ball switch SW200D' },
        { fillStyle: '#E20C1E', text: 'Photoresistor module' },
        { fillStyle: '#E20C1E', text: 'push button' },
      ],
      animation: {
        type: 'spinToStop',
        duration: 6,
        spins: 10,
        callbackFinished: afficherResultatRight,
      },
    });




    roueRight.draw(); // Dessine la roue au démarrage

    let roueEnRotationRight = false;

    // role : lancer la roue
    // parametre : rien
    // return : rien
    function lancerRoueRight() {
      if (roueEnRotationRight) return; // Empêche un second clic pendant l'animation

      document.getElementById('resultatRight').textContent = '';
      roueEnRotationRight = true;

    
      roueRight.stopAnimation(false);    // Arrête une animation éventuellement en cours
      roueRight.rotationAngle = 0;       // Remet l’angle de départ à zéro
      roueRight.draw();                  // Redessine la roue dans sa position initiale

      // Redémarre l’animation
      roueRight.startAnimation();
      console.log("right")
    }

    // role : afficher le resultat 
    // parametre : le resultat
    // return : rien
    function afficherResultatRight(segmentIndique) {
      document.getElementById('resultatRight').textContent =
        'Composant sélectionné : ' + segmentIndique.text ;
      roueEnRotationRight = false;
    }

    // lancer focntion au clic du bouton

    
    document.getElementById('boutonLancerRight').addEventListener('click',lancerRoueRight);
