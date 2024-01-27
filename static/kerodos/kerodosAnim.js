const DeleteTags = {
  TUSK1: "tusk1",
  TUSK2: "tusk2",
  ANTLERS: "antlers",
  WINGS: "wing",
  BLACK_LEG1: "blackLeg1",
  BLACK_LEG2: "blackLeg2",
  BLACK_LEG3: "blackLeg3",
  BLACK_LEG4: "blackLeg4",
  BLACK_LEG5: "blackLeg5",
  UDDERS: "udders",
  WHITE_LEG1: "whiteLeg1",
  WHITE_LEG2: "whiteLeg2",
  WHITE_LEG3: "whiteLeg3",
  WHITE_LEG4: "whiteLeg4",
  DINO_TAIL: "dinoTail",
};

const kerodosAnim = (function () {
  let parent,
    hasInited = false,
    imgElement,
    imagePath,
    lastFrameTime = 0,
    internalTime,
    recoilCounter = 0,
    recoilTime = 0,
    recoilOffset = 0,
    isSadFishy = false,
    isDed = false;

  const fps = 60,
    speed = 1 / 500,
    parts = [],
    path = [],
    circleWidth = 600,
    circleHeight = 200,
    keroX = 0,
    keroY = 200;

  const bodySingle = [{ name: "bodysingle.png" }];

  const bodySegment = [
    { name: "body1.png" },
    { name: "body2.png" },
    { name: "body3.png" },
    { name: "body4.png" },
    { name: "body5.png" },
    { name: "body6.png" },
    { name: "body7.png" },
    { name: "body8.png" },
    { name: "body9.png" },
    { name: "body10.png" },
  ];

  const head = [
    { name: "head1.png", zIncr: 1 },
    { name: "tusk1.png", zIncr: 0, tag: DeleteTags.TUSK1 },
    { name: "tusk2.png", zIncr: 0, tag: DeleteTags.TUSK2 },
    { name: "w.png", zIncr: 0, isW: true },
    { name: "head2.png", zIncr: 1 },
    { name: "head3.png", zIncr: 1 },
    { name: "u.png", zIncr: 0, isU: true },
    { name: "head4.png", zIncr: 1 },
    { name: "head5.png", zIncr: 1 },
    { name: "head6.png", zIncr: 1 },
    { name: "antler1.png", zIncr: 0, tag: DeleteTags.ANTLERS },
    { name: "antler2.png", zIncr: 0, tag: DeleteTags.ANTLERS },
    { name: "head7.png", zIncr: 1 },
    { name: "head8.png", zIncr: 1 },
    { name: "head9.png", zIncr: 1 },
    { name: "head10.png", zIncr: 1 },
  ];

  const frontWing = [
    { name: "body1.png" },
    { name: "body2.png" },
    { name: "body3.png" },
    { name: "body4.png" },
    { name: "body5.png" },
    { name: "leftwing1.png", zIncr: 0 },
    { name: "rightwing1.png", zIncr: 0 },
  ];

  const backWing = [
    { name: "leftwing2.png", zIncr: 0 },
    { name: "rightwing2.png", zIncr: 0 },
    { name: "body6.png" },
    { name: "body7.png" },
    { name: "body8.png" },
    { name: "body9.png" },
    { name: "body10.png" },
  ];

  const udders = [{ name: "udders.png", zIncr: 0 }];

  const blackLeg = [{ name: "leg1.png", zIncr: 0 }];
  const whiteLeg = [{ name: "leg2.png", zIncr: 0 }];

  const fishTail = [
    { name: "tail1.png", zIncr: 1 },
    { name: "tail2.png", zIncr: 1 },
    { name: "tail3.png", zIncr: 1 },
    { name: "tail4.png", zIncr: 1 },
    { name: "tail5.png", zIncr: 1 },
    { name: "tail6.png", zIncr: 1 },
  ];

  const partsLeft = Object.values(DeleteTags);
  /**
   * Quake! The evil Kero Dos doth appear, in #kero div!
   */
  function init(parentParam, imagePathParam) {
    if (hasInited) return;
    hasInited = true;
    parent = parentParam;
    imagePath = imagePathParam;
    parts.z = 0;

    addPart(head, "head");
    addPart(bodySegment, DeleteTags.BLACK_LEG1);
    addPart(blackLeg, DeleteTags.BLACK_LEG1);
    addPart(whiteLeg, DeleteTags.WHITE_LEG1);
    addPart(bodySegment, DeleteTags.WHITE_LEG1);
    addPart(frontWing, DeleteTags.WINGS);
    addPart(bodySingle, "body");
    addPart(backWing, DeleteTags.WINGS);
    addPart(bodySegment, DeleteTags.BLACK_LEG2);
    addPart(blackLeg, DeleteTags.BLACK_LEG2);
    addPart(whiteLeg, DeleteTags.WHITE_LEG2);
    addPart(bodySegment, DeleteTags.WHITE_LEG2);
    addPart(bodySegment, DeleteTags.UDDERS);
    addPart(udders, DeleteTags.UDDERS);
    addPart(bodySegment, DeleteTags.UDDERS);
    addPart(bodySegment, DeleteTags.BLACK_LEG3);
    addPart(blackLeg, DeleteTags.BLACK_LEG3);
    addPart(whiteLeg, DeleteTags.WHITE_LEG3);
    addPart(bodySegment, DeleteTags.WHITE_LEG3);
    addPart(bodySegment, DeleteTags.BLACK_LEG4);
    addPart(blackLeg, DeleteTags.BLACK_LEG4);
    addPart(whiteLeg, DeleteTags.WHITE_LEG4);
    addPart(bodySegment, DeleteTags.WHITE_LEG4);
    addPart(bodySegment, DeleteTags.BLACK_LEG5);
    addPart(blackLeg, DeleteTags.BLACK_LEG5);
    addDinoTail();
    addPart(fishTail, "fishTail");

    internalTime = Date.now();
    for (let i = 0; i < parts.length * 2; i++) {
      const x = Math.cos((internalTime - i * 1000 / fps) * speed / 2 + Math.PI / 4) * circleWidth + keroX;
      const y = Math.cos((internalTime - i * 1000 / fps) * speed) * circleHeight + keroY;
      path.push({ x, y });
    }

    loop(); // modified
  }

  function addPart(part, tag, scale = 1) {
    for (const subpart of part) {
      const img = document.createElement("img");
      if (subpart.hasOwnProperty("zIncr")) {
        parts.z += subpart.zIncr;
        img.zIncr = subpart.zIncr;
      } else {
        parts.z += 2;
      } 
      img.z = parts.z;
      img.classList.add("kerodos-anim-kero-part");
      img.style.zIndex = - parts.length;
      if (scale != 1) {
        img.style.transform = `scale(${scale})`;
      }
      img.src = imagePath + subpart.name;
      parent.appendChild(img);
      if (subpart.hasOwnProperty("tag")) {
        img.deleteTag = subpart.tag;
      } else {
        img.deleteTag = tag;
      }

      const isU = subpart.isU || false;
      const isW = subpart.isW || false;
      if (isU) {
        img.id = "kerodos-anim-u";
      } else if (isW) {
        img.id = "kerodos-anim-w";
      }
      if (isU || isW) {
        img.classList.add("kerodos-anim-come-in-hot");
      } else {
        img.classList.add("kerodos-anim-slow-fade-in");
      }
      parts.push(img);
    }
  }

  function addDinoTail() {
    for (let i = 1; i > 0; i -= 0.025) {
      addPart(bodySingle, DeleteTags.DINO_TAIL, i);
    }
  }

  function loop() { // modified
    requestAnimationFrame(loop);
    const now = Date.now();
    if (now - lastFrameTime < 1000 / fps) return;
    lastFrameTime = now;
    internalTime += 1000 / fps;

    const recoilFn = function (x) {
      return 50 * (Math.sin((x / 20) - Math.PI * 3 / 8) - x / (20 * Math.PI) - Math.sin(-Math.PI * 3 / 8));
    };

    const piecewiseFn = function (x) {
      if (x < 49) {
        return recoilFn(x);
      } if (x < 69) {
        return recoilFn(49.5);
      } if (x < 100) {
        return recoilFn(x - 20);
      }
      return 0;
    };

    let recoil = 0;
    if (recoilCounter > 0) {
      // Don't move forward when recoiling
      recoilCounter--;
      if (recoilCounter == 0) {
        endRecoil(internalTime);
      }
      recoil = piecewiseFn(recoilCounter);
    } else {
      const x = Math.cos((internalTime - recoilOffset - recoil * 10) * speed / 2 + Math.PI / 4) * circleWidth + keroX;
      const y = Math.cos((internalTime - recoilOffset - recoil * 10) * speed) * circleHeight + keroY;
      path.unshift({ x, y });
      path.pop();
    }

    for (let i = 0; i < parts.length; i++) {
      // When we delete a part, we keep it moving for a while so we can fade
      // it out and prevent a jarring transition. We also gradually shift the
      // following parts forward to fill the gap. There's probably a better
      // way to do this.
      if (parts[i].fadeCounter) {
        parts[i].fadeCounter--;
        parts[i].style.opacity = parts[i].fadeCounter / 100;
        if (parts[i].fadeCounter == 0) parts[i].remove();
      }
      if (parts[i].zCounter) {
        parts[i].z -= parts[i].zDecrement / parts[i].zCounter;
        parts[i].zDecrement -= parts[i].zDecrement / parts[i].zCounter;
        parts[i].zCounter--;
      }
      const index = Math.max(0, Math.round(parts[i].z + recoil));
      //parts[i].style.transform = `translate(${path[index].x}px,${path[index].y}px)`;
      parts[i].style.left = `${path[index].x / window.devicePixelRatio}px`;
      parts[i].style.top = `${path[index].y / window.devicePixelRatio}px`;
    }
  }

  function startRecoil(time) {
    recoilTime = time;
    recoilCounter = 100;
    document.getElementById("kerodos-anim-u").src = imagePath + "hurt-u.png";
    document.getElementById("kerodos-anim-w").src = imagePath + "hurt-w.png";
  }

  function endRecoil(time) {
    recoilOffset += time - recoilTime;
    document.getElementById("kerodos-anim-u").src = imagePath + "u.png";
    document.getElementById("kerodos-anim-w").src = imagePath + "w.png";
  }

  // For demo purposes
  function deleteRandomPart() {
    if (isSadFishy) {
      turnIntoDedFishy();
      return;
    }
    const removeIndex = Math.floor(Math.random() * partsLeft.length);
    deletePart(partsLeft[removeIndex]);
    partsLeft.splice(removeIndex, 1);
    if (partsLeft.length == 0) turnIntoSadFishy();
  }

  /**
   * Whem Kero Dos loses all his extra powers, he turms back into kero uno.
   */
  function turnIntoSadFishy() {
    isSadFishy = true;
    // remove all remaining parts
    for (let i = 0; i < parts.length; i++) {
      if (parts[i].fadeEnable == true) continue;
      parts[i].fadeEnable = true;
      parts[i].fadeCounter = 100;
    }
    // Add sad fishy
    imgElement = document.createElement("img");
    imgElement.classList.add("kerodos-anim-kero-part");
    imgElement.classList.add("kerodos-anim-fade-in");
    imgElement.src = imagePath + "sadfishy.gif";
    parent.appendChild(imgElement);
  }

  /**
   * Only works on sad fishy. Whem sad fishy dies Kero Dos vanishes without a tres.
   */
  function turnIntoDedFishy() {
    if (!isSadFishy || isDed) return;
    isDed = true;
    if (imgElement) {
      imgElement.src = imagePath + "ded.png";
      imgElement.classList.remove("kerodos-anim-fade-in");
      imgElement.classList.add("kerodos-anim-fade-out");
    }
  }

  /**
   * Cause that part of Kero Dos to go explody
   * @param{DeleteTags} tag Type of part to delete, e.g. DeleteTags.BLACK_LEG_1 deletes a black leg
   */
  function deletePart(tag) { // modified
    startRecoil(internalTime);
    let counter = 0;
    for (let i = 0; i < parts.length; i++) {
      if (parts[i].deleteTag != tag || parts[i].fadeEnable == true) continue;
      let z = 2;
      if (parts[i].hasOwnProperty("zIncr")) z = parts[i].zIncr;
      parts[i].fadeEnable = true;
      parts[i].style.rotate = `${Math.floor(Math.random() * 360)}deg`;
      parts[i].classList.remove("kerodos-anim-slow-fade-in");
      if (parts[i].src.includes("body")) {
        parts[i].classList.add("kerodos-anim-splody");
        parts[i].style.animationDelay = `${counter++ * 50}ms`;
      } else {
        parts[i].classList.add("kerodos-anim-spinny");
      }
      parts[i].fadeCounter = 100;
      for (let j = i; j < parts.length; j++) {
        parts[j].zDecrement = (parts[j].zDecrement || 0) + z;
        parts[j].zCounter = 100;
      }
    }
  }

  function updateState(state) {
    if (isSadFishy && state.size == 0) {
      turnIntoDedFishy();
      return;
    }

    for (let i = 0; i < partsLeft.length; i++) {
      if (!state.has(partsLeft[i])) {
        deletePart(partsLeft[i]);
        partsLeft.splice(i, 1);
        i--;
      }
      if (partsLeft.length == 0) turnIntoSadFishy();
    }
  }

  return {
    init,
    deletePart,
    deleteRandomPart,
    turnIntoSadFishy,
    turnIntoDedFishy,
    updateState,
  };
}());

export default kerodosAnim;
