
    // --- 1️⃣ Création de la roue ---
    const roue = new Winwheel({
      canvasId: 'canvasRoue',
      numSegments: 4,
      outerRadius: 220,
      textFontSize: 16,
      textFillStyle: '#fff',
      segments: [
        {
          fillStyle: '#ff6384',
          text: 'Résistance',
          image: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Resistor.svg'
        },
        {
          fillStyle: '#36a2eb',
          text: 'Condensateur',
          image: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Capacitor.svg'
        },
        {
          fillStyle: '#ffcd56',
          text: 'Diode',
          image: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Diode_symbol.svg'
        },
        {
          fillStyle: '#4bc0c0',
          text: 'LED',
          image: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/LED_symbol.svg'
        },
      ],
      animation: {
        type: 'spinToStop',
        duration: 6,
        spins: 10,
        callbackFinished: afficherResultat,
        callbackAfter: dessinerImagesSegments, // pour redessiner les images
      },
    });

    // --- 2️⃣ Préchargement des images ---
    roue.segments.forEach(segment => {
      if (segment.image) {
        const img = new Image();
        img.src = segment.image;
        segment.imgElement = img; // on stocke directement l'objet image
      }
    });

    // --- 3️⃣ Fonction de dessin des images ---
    function dessinerImagesSegments() {
      const ctx = roue.ctx;
      const centreX = roue.centerX;
      const centreY = roue.centerY;
      const rayon = roue.outerRadius - 70;
      const angleSegment = 360 / roue.numSegments;

      for (let i = 0; i < roue.numSegments; i++) {
        const segment = roue.segments[i];
        if (!segment.imgElement) continue;

        // Calcul de la position angulaire du centre du segment
        const angle = (i * angleSegment + angleSegment / 2 - 90 + roue.rotationAngle) * Math.PI / 180;

        // Position de l’image
        const x = centreX + Math.cos(angle) * rayon;
        const y = centreY + Math.sin(angle) * rayon;

        // Dessin de l’image
        const img = segment.imgElement;
        if (img.complete) {
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(angle + Math.PI / 2);
          ctx.drawImage(img, -25, -25, 50, 50);
          ctx.restore();
        }
      }
    }

    // --- 4️⃣ Initialisation ---
    roue.draw();
    dessinerImagesSegments();

    let roueEnRotation = false;

    // --- 5️⃣ Fonction pour lancer la roue ---
    function lancerRoue() {
      if (roueEnRotation) return;
      document.getElementById('resultat').textContent = '';
      roueEnRotation = true;

      // Réinitialisation avant chaque nouveau tour
      roue.stopAnimation(false);
      roue.rotationAngle = 0;
      roue.draw();
      dessinerImagesSegments();

      // Lancer l’animation
      roue.startAnimation();
    }

    // --- 6️⃣ Fonction de fin ---
    function afficherResultat(segment) {
      document.getElementById('resultat').textContent =
        'Composant sélectionné : ' + segment.text + ' ⚡';
      roueEnRotation = false;
    }

    document.getElementById('boutonLancer').addEventListener('click', lancerRoue);

