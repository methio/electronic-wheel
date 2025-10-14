
  
  // --- PARAMETRAGE ROUE DE GAUCHE ---
  const roueLeft = new Winwheel({
    canvasId: 'canvasRoueLeft',
    numSegments: 7,
    textFillStyle: '#ffdfe602',//texte en transparent pour pas le voir sur la roue
    outerRadius: 220,
    segments: [
      { fillStyle: '#E20C1E', image: 'meteore.png', text:'1' },
      { fillStyle: '#E20C1E', image: 'meteore.png', text:'2' },
      { fillStyle: '#E20C1E', image: 'meteore.png', text:'3' },
      { fillStyle: '#E20C1E', image: 'meteore.png', text:'4' },
      { fillStyle: '#E20C1E', image: 'meteore.png', text:'5' },
      { fillStyle: '#E20C1E', image: 'meteore.png', text:'6' },
      { fillStyle: '#E20C1E', image: 'meteore.png', text:'7' },
    ],
    animation: {
      type: 'spinToStop',
      duration: 6,
      spins: 10,
      callbackAfter: dessinerImagesSegmentsLeft
    }
  });

  // --- PARAMETRAGE ROUE DE DROITE ---
  const roueRight = new Winwheel({
    canvasId: 'canvasRoueRight',
    numSegments: 8,
    textFillStyle: '#ffdfe602',//texte en transparent pour pas le voir sur la roue
    outerRadius: 220,
    segments: [
    { fillStyle: '#E20C1E', text: '10kΩ rotary potentiometer', image:'img/rotary-potentiometer.png' },
    { fillStyle: '#E20C1E', text: 'Analog microphone module', image:'img/rotary-potentiometer.png' },
    { fillStyle: '#E20C1E', text: 'Temperature sensor TMP36', image:'img/rotary-potentiometer.png' },
    { fillStyle: '#E20C1E', text: 'Humidity sensor DHT11', image:'img/rotary-potentiometer.png' },
    { fillStyle: '#E20C1E', text: 'Ultrasonic sensor HC-SR04', image:'img/rotary-potentiometer.png' },
    { fillStyle: '#E20C1E', text: 'Ball switch SW200D', image:'img/rotary-potentiometer.png' },
    { fillStyle: '#E20C1E', text: 'Photoresistor module', image:'img/rotary-potentiometer.png' },
    { fillStyle: '#E20C1E', text: 'Push button', image:'img/rotary-potentiometer.png' },
    ],
    animation: {
      type: 'spinToStop',
      duration: 6,
      spins: 10,
      callbackAfter: dessinerImagesSegmentsRight
    }
  });

  // ------------------------------
  // Préchargement des images
  // ------------------------------
function prechargerImages(roue, callback) {
  let imagesChargees = 0;
  const totalImages = roue.numSegments;

  for (let i = 1; i <= roue.numSegments; i++) {
    const seg = roue.segments[i];
    if (seg && seg.image) {
      const img = new Image();
      img.src = seg.image;

      img.onload = () => {
        imagesChargees++;
        if (imagesChargees === totalImages) {
          callback(); // Toutes les images sont chargées => on peut dessiner
        }
      };

      seg.imgElement = img;
    }
  }
}

// Exemple d’utilisation pour la roue gauche :
prechargerImages(roueLeft, () => {
  roueLeft.draw();
  dessinerImagesSegmentsLeft();
});

// Et pour la roue droite :
prechargerImages(roueRight, () => {
  roueRight.draw();
  dessinerImagesSegmentsRight();
});

  // ------------------------------
  // Fonction pour dessiner les images
  // ------------------------------
  function dessinerImagesSegmentsLeft() { dessinerImages(roueLeft); }
  function dessinerImagesSegmentsRight() { dessinerImages(roueRight); }

  function dessinerImages(roue) {
    const ctx = roue.ctx;
    const centreX = roue.centerX;
    const centreY = roue.centerY;
    const rayon = roue.outerRadius - 60;
    const angleParSegment = 360 / roue.numSegments;

    for (let i = 1; i <= roue.numSegments; i++) {
      const seg = roue.segments[i];
      if (!seg || !seg.imgElement) continue;
      const img = seg.imgElement;
      if (!img.complete) continue;

      const angleDeg = (i - 1) * angleParSegment + angleParSegment / 2 + roue.rotationAngle;
      const angleRad = (angleDeg - 90) * Math.PI / 180;

      const x = centreX + Math.cos(angleRad) * rayon;
      const y = centreY + Math.sin(angleRad) * rayon;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angleRad + Math.PI/2);
      const taille = 80;
      ctx.drawImage(img, -taille/2, -taille/2, taille, taille);
      ctx.restore();
    }
  }

  // ------------------------------
  // Affichage  des images dès le chargement
  // ------------------------------
  roueLeft.draw(); dessinerImagesSegmentsLeft();
  roueRight.draw(); dessinerImagesSegmentsRight();

  // ---------------------------------
  // FONCTION DE LANCEMENT DES DEUX ROUES
  // ---------------------------------
  let enRotation = false;
  function lancerLesDeuxRoues() {
    if (enRotation) return; 
    enRotation = true;

    document.getElementById('resultatLeft').textContent = '';
    document.getElementById('resultatRight').textContent = '';

    for (let i = 1; i <= roueLeft.numSegments; i++) {
      if (roueLeft.segments[i]) roueLeft.segments[i].fillStyle = '#E20C1E';
    }
    for (let i = 1; i <= roueRight.numSegments; i++) {
      if (roueRight.segments[i]) roueRight.segments[i].fillStyle = '#E20C1E';
    }
    roueLeft.draw(); dessinerImagesSegmentsLeft();
    roueRight.draw(); dessinerImagesSegmentsRight();

    let vitesse = 30;
    const deceleration = 0.2;
    const interval = 30;

    const timer = setInterval(() => {
      if (vitesse > 0) {
        roueLeft.rotationAngle += vitesse;
        roueRight.rotationAngle += vitesse;

        roueLeft.draw(); dessinerImagesSegmentsLeft();
        roueRight.draw(); dessinerImagesSegmentsRight();

        vitesse -= deceleration;
      } else {
        clearInterval(timer);
        enRotation = false;

        const segmentLeft = roueLeft.getIndicatedSegment();
        const segmentRight = roueRight.getIndicatedSegment();

        if (segmentLeft) segmentLeft.fillStyle = '#fc5c40ff';
        if (segmentRight) segmentRight.fillStyle = '#fc5c40ff';

        roueLeft.draw(); dessinerImagesSegmentsLeft();
        roueRight.draw(); dessinerImagesSegmentsRight();

        console.log(roueLeft.getIndicatedSegment)
        document.getElementById('resultatLeft').textContent =
        `segmentLeftcomposant séléctionné ${segmentLeft.text}`
        document.getElementById('resultatRight').textContent =
        `segmentLeftcomposant séléctionné ${segmentRight.text}`
      }
    }, interval);
  }

  document.getElementById('boutonLancer').addEventListener('click', lancerLesDeuxRoues);

