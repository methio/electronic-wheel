// --- PARAMETRAGE ROUE DE GAUCHE ---
const roueLeft = new Winwheel({
  canvasId: 'canvasRoueLeft',
  numSegments: 7,
  lineWidth: 1,
  outerRadius: 220,
  textFontSize: 14,
  textFillStyle: '#FFDFE6',
  textFontFamily: 'Poppins',
  segments: [
    { fillStyle: '#2b2b2b', text: 'LED', strokeStyle: '#4b4b4bff',  },
    { fillStyle: '#2b2b2b', text: 'RGB LED', strokeStyle: '#4b4b4bff',  },
    { fillStyle: '#2b2b2b', text: 'passive buzzer', strokeStyle: '#4b4b4bff',  },
    { fillStyle: '#2b2b2b', text: '12 leds neopixels ring', strokeStyle: '#4b4b4bff',  },
    { fillStyle: '#2b2b2b', text: 'microservo', strokeStyle: '#4b4b4bff',  },
    { fillStyle: '#2b2b2b', text: 'motoreductor', strokeStyle: '#4b4b4bff',  },
    { fillStyle: '#2b2b2b', text: 'I2C LCD screen', strokeStyle: '#4b4b4bff',  },
  ]
});
roueLeft.draw();

// --- PARAMETRAGE ROUE DE DROITE ---
const roueRight = new Winwheel({
  canvasId: 'canvasRoueRight',
  numSegments: 8,
  outerRadius: 220,
  textFontSize: 14,
  textFillStyle: '#FFDFE6',
  lineWidth: 1, 
  textFontFamily: 'Poppins',
  textAlignment: 'center',
  segments: [
    { fillStyle: '#2b2b2b', text: '10kΩ rotary \n potentiometer', strokeStyle: '#4b4b4bff', },
    { fillStyle: '#2b2b2b', text: 'Analog microphone \n module', strokeStyle: '#4b4b4bff', },
    { fillStyle: '#2b2b2b', text: 'Temperature sensor \n TMP36', strokeStyle: '#4b4b4bff' },
    { fillStyle: '#2b2b2b', text: 'Humidity sensor \n DHT11', strokeStyle: '#4b4b4bff' },
    { fillStyle: '#2b2b2b', text: 'Ultrasonic sensor \n HC-SR04', strokeStyle: '#4b4b4bff' },
    { fillStyle: '#2b2b2b',text: 'Ball switch SW200D', strokeStyle: '#4b4b4bff' },
    { fillStyle: '#2b2b2b', text: 'Photoresistor module', strokeStyle: '#4b4b4bff' },
    { fillStyle: '#2b2b2b', text: 'Push button', strokeStyle: '#4b4b4bff' },
  ]
});
roueRight.draw();

let enRotation = false;



// LANCEMENT DES DEUX ROUES
function lancerLesDeuxRoues() {

  if (enRotation) return; // Empêche un double clic
  enRotation = true;

  // Réinitialisation affichage et couleurs
  document.getElementById('resultatLeft').textContent = '';
  document.getElementById('resultatRight').textContent = '';

  // Réinitialise couleurs des segments poiur eviter l'erreur seg=null

  for (let i = 1; i <= roueLeft.numSegments; i++) {
    if (roueLeft.segments[i]) roueLeft.segments[i].fillStyle = '#2b2b2b';
  }
  for (let i = 1; i <= roueRight.numSegments; i++) {
    if (roueRight.segments[i]) roueRight.segments[i].fillStyle = '#2b2b2b';
  }
  roueLeft.draw();
  roueRight.draw();

  // Paramètres de rotation
  let vitesse = 30;
  const deceleration = 0.2;
  const interval = 30;

  const timer = setInterval(() => {
    if (vitesse > 0) {
      roueLeft.rotationAngle += vitesse;
      roueRight.rotationAngle += vitesse;

      roueLeft.draw();
      roueRight.draw();

      vitesse -= deceleration;
    } else {
      clearInterval(timer);
      enRotation = false;

      // Sélection des segments gagnants
      const segmentLeft = roueLeft.getIndicatedSegment();
      const segmentRight = roueRight.getIndicatedSegment();

      // chanfge couleur segment gagnant
      if (segmentLeft) segmentLeft.fillStyle = '#fc5c40ff';
      if (segmentRight) segmentRight.fillStyle = '#fc5c40ff';
      if (segmentLeft) segmentLeft.textFillStyle = '#2b2b2b';
      if (segmentRight) segmentRight.textFillStyle = '#2b2b2b';

      roueLeft.draw();
      roueRight.draw();

      // Affichage des résultats
      document.getElementById('resultatLeft').textContent =
       'Composant sélectionné : ' + segmentLeft.text 
      document.getElementById('resultatRight').textContent =
       'Composant sélectionné : ' + segmentRight.text 
    }
  }, interval);
}


document.getElementById('boutonLancer').addEventListener('click', lancerLesDeuxRoues);
