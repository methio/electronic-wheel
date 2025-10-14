// --- COULEURS

let primary = '#2276AA'
let secondary = '#D4EAF8'
let tertiary = '#EAF4FB'

// --- TABLEAU OUTPU ET INPUT ---
const inputArray = [
    { nom: 'LED', src: 'img/input/led.png' },
    { nom: 'RGB LED', src: 'img/input/rgb-led.png' },
    { nom: '12 leds neopixels ring', src: 'img/input/ring-led.png' },
    { nom: 'microservo', src: 'img/input/microservo.png' },
    { nom: 'motoreductor', src: 'img/input/motoreductor.png' },
    { nom: 'I2C LCD screen', src: 'img/input/LCD-screen.png' },
];

const outputArray = [
    { nom: '10kΩ rotary potentiometer', src: 'img/output/rotary-potentiometer.png' },
    { nom: 'Analog microphone module', src: 'img/output/analog-microphone.png' },
    { nom: 'Temperature sensor TMP36', src: 'img/output/temperatur-sensor.png' },
    { nom: 'Humidity sensor DHT11', src: 'img/output/humidity-sensor.png' },
    { nom: 'Ultrasonic sensor HC-SR04', src: 'img/output/ultrasonic-sensor.png' },
    { nom: 'Ball switch SW200D', src: 'img/output/ball-switch.png' },
    { nom: 'Photoresistor module', src: 'img/output/photoresistor.png' },
    { nom: 'Push button', src: 'img/output/push-button.png' },
];



// --- PARAMÉTRAGE ROUE DE GAUCHE ---
const roueLeft = new Winwheel({
    canvasId: 'canvasRoueLeft',
    numSegments: 6,
    lineWidth: 1,
    outerRadius: 220,
    textFontSize: 14,
    textFillStyle: `${primary}`,
    textFontFamily: 'Inter',
    segments: [
        { fillStyle: `${tertiary}`, text: 'LED', strokeStyle: `${primary}` },
        { fillStyle: `${tertiary}`, text: 'RGB LED', strokeStyle: `${primary}` },
        { fillStyle: `${tertiary}`, text: '12 leds neopixels ring', strokeStyle: `${primary}` },
        { fillStyle: `${tertiary}`, text: 'microservo', strokeStyle: `${primary}` },
        { fillStyle: `${tertiary}`, text: 'motoreductor', strokeStyle: `${primary}` },
        { fillStyle: `${tertiary}`, text: 'I2C LCD screen', strokeStyle: `${primary}` },
    ]
});
roueLeft.draw();

// --- PARAMÉTRAGE ROUE DE DROITE ---
const roueRight = new Winwheel({
    canvasId: 'canvasRoueRight',
    numSegments: 8,
    outerRadius: 220,
    textFontSize: 14,
    textFillStyle: `${primary}`,
    lineWidth: 1,
    textFontFamily: 'Inter',
    textAlignment: 'center',
    segments: [
        { fillStyle: `${tertiary}`, text: '10kΩ rotary \n potentiometer', strokeStyle: `${primary}` },
        { fillStyle: `${tertiary}`, text: 'Analog microphone \n module', strokeStyle: `${primary}` },
        { fillStyle: `${tertiary}`, text: 'Temperature sensor \n TMP36', strokeStyle: `${primary}` },
        { fillStyle: `${tertiary}`, text: 'Humidity sensor \n DHT11', strokeStyle: `${primary}` },
        { fillStyle: `${tertiary}`, text: 'Ultrasonic sensor \n HC-SR04', strokeStyle: `${primary}` },
        { fillStyle: `${tertiary}`, text: 'Ball switch SW200D', strokeStyle: `${primary}` },
        { fillStyle: `${tertiary}`, text: 'Photoresistor module', strokeStyle: `${primary}` },
        { fillStyle: `${tertiary}`, text: 'Push button', strokeStyle: `${primary}` },
    ]
});
roueRight.draw();

let enRotation = false;


// --- LANCEMENT DES DEUX ROUES ---
function lancerLesDeuxRoues() {
    if (enRotation) return; // empêche un double clic
    enRotation = true;

    document.getElementById('resultatLeft').innerHTML = '';
    document.getElementById('resultatRight').innerHTML = '';

    // réinitialisation des couleurs
    for (let i = 1; i <= roueLeft.numSegments; i++) {
        if (roueLeft.segments[i]) {
            roueLeft.segments[i].fillStyle = `${tertiary}`;
            roueLeft.segments[i].textFillStyle = `${primary}`
        }

    }
    for (let i = 1; i <= roueRight.numSegments; i++) {
        if (roueRight.segments[i]) {
            roueRight.segments[i].fillStyle = `${tertiary}`;
            roueRight.segments[i].textFillStyle = `${primary}`

        }
    }
    roueLeft.draw();
    roueRight.draw();

    // vitesses aléatoires + décelération -> necessaire sinon toujorus le même ordre de compsoant tiré au sort 
    let vitesseLeft = Math.random() * 15 + 25;   // entre 25 et 40
    let vitesseRight = Math.random() * 15 + 25;  // entre 25 et 40
    const decelerationLeft = Math.random() * 0.15 + 0.15;
    const decelerationRight = Math.random() * 0.15 + 0.15;
    const interval = 30;

    const timer = setInterval(() => {
        let encoreEnRotation = false;

        // roue gauche
        if (vitesseLeft > 0) {
            roueLeft.rotationAngle += vitesseLeft;
            roueLeft.draw();
            vitesseLeft -= decelerationLeft;
            encoreEnRotation = true;
        }

        // roue droite
        if (vitesseRight > 0) {
            roueRight.rotationAngle += vitesseRight;
            roueRight.draw();
            vitesseRight -= decelerationRight;
            encoreEnRotation = true;
        }

        // arrêt des deux roues
        if (!encoreEnRotation) {
            clearInterval(timer);
            enRotation = false;

            const segmentInput = roueLeft.getIndicatedSegment();
            const segmentOutput = roueRight.getIndicatedSegment();

            let composantInput = segmentInput.text.toLowerCase();
            let composantOutput = segmentOutput.text.toLowerCase();

            // trouver les images à associer au tirage a partir des tableaux
            let srcImgLeft;
            inputArray.forEach(element => {
                let nom = element.nom.toLowerCase();
                if (composantInput.substring(0, 3) === nom.substring(0, 3)) { // substring -> permet de prendre les caractère 1 à 4
                    srcImgLeft = element.src;
                }
            });

            let srcImgRight;
            outputArray.forEach(element => {
                let nom = element.nom.toLowerCase();
                if (composantOutput.substring(0, 3) === nom.substring(0, 3)) {
                    srcImgRight = element.src;
                }
            });

            // mise en surbrillance des segments gagnants
            if (segmentInput) segmentInput.fillStyle = `${primary}`;
            if (segmentOutput) segmentOutput.fillStyle = `${primary}`;
            if (segmentInput) segmentInput.textFillStyle = `${tertiary}`;
            if (segmentOutput) segmentOutput.textFillStyle = `${tertiary}`;
            roueLeft.draw();
            roueRight.draw();

            // affichage des résultats avec image
            document.getElementById('resultatLeft').innerHTML =
                `<div class="flex spaceBetween alignCenter"> 
                <p class="w-45 bigTxt">${composantInput.toUpperCase()}</p><img class ="imageComposant" src="${srcImgLeft}" alt="">
                </div>
                `;

            document.getElementById('resultatRight').innerHTML =
                `<div class="flex spaceBetween alignCenter"> 
                <p class="w-45 bigTxt">${composantOutput.toUpperCase()}</p><img class ="imageComposant" src="${srcImgRight}" alt="">
                </div>
                `;

                //  CONFETTI avec la lib https://www.npmjs.com/package/canvas-confetti
                confetti({
                    particleCount: 400,
                    spread: 70,
                    origin: { y: 0.6 } // départ un peu plus bas que le haut de la page
                });
                        }
                    }, interval);
                }

document.getElementById('boutonLancer').addEventListener('click', lancerLesDeuxRoues);
