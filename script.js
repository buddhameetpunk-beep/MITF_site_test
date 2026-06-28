/* Typewriter text */

const CONTACT_BREAK = {
  type: "break",
  pause: 520
};

function contactWord(text, action, accent = false) {
  return {
    text,
    action,
    accent
  };
}

const heroText = [
  "Mobile IT Force",
  "is",
  "a",
  "locally-based",
  "business",
  "that",
  "has",
  "proudly",
  "been",
  "serving",
  "Hawaii",
  "since",
  "2009.",
  "We",
  "are",
  "a",
  "leading",
  "authorized",
  "Lenovo Partner",
  "providing",
  "the",
  "latest",
  "technology",
  "and",
  "services",
  "to",
  "local schools,",
  "government,",
  "and",
  "businesses.",
  "From",
  "Enterprise",
  "to",
  "Esports,",
  "and",
  "the",
  "field",
  "to",
  "the",
  "classroom,",
  "we",
  "have",
  "everything",
  "to",
  "make",
  "sure",
  "your",
  "workflow",
  "stays",
  "modernized."
];

const contactIntroText = [
  "Have",
  "a",
  "question?",
  "Check",
  "out",
  "our",
  contactWord("contact", "contact"),
  contactWord("information", "contact"),
  "below,",
  "or",
  contactWord("come", "visit"),
  contactWord("visit", "visit"),
  "us",
  "at",
  "the",
  contactWord("top", "visit"),
  contactWord("floor", "visit"),
  "of",
  "the",
  contactWord("Interstate", "visit"),
  contactWord("Building!", "visit"),
  CONTACT_BREAK,
  "For",
  contactWord("Lenovo", "warranty"),
  contactWord("warranty", "warranty"),
  contactWord("service,", "warranty"),
  "continue",
  "to",
  "the",
  contactWord("service steps below.", "warranty", true)
];

const servicesIntroText = [
  "Let",
  "us",
  "support",
  "you!"
];

const aboutIntroText = [
  "Our",
  "mission",
  "is",
  "to",
  "nurture",
  "growth",
  "and",
  "creativity",
  "in",
  "our",
  "clients",
  "through",
  "implementation",
  "of",
  "Information",
  "Technology",
  "that",
  "is",
  "purposed",
  "and",
  "value-driven,",
  "and",
  "to",
  "deliver",
  "the",
  "highest",
  "excellence",
  "in",
  "customer",
  "service."
];

const heroTextElement = document.querySelector("#heroText");
const contactIntroElement = document.querySelector("#contactIntro");
const servicesIntroElement = document.querySelector("#servicesIntro");
const aboutIntroElement = document.querySelector("#aboutIntro");

let heroTypingTimer = null;
let contactTypingTimer = null;
let servicesTypingTimer = null;
let aboutTypingTimer = null;
let infoTypingTimer = null;

function clearTimer(timer) {
  if (timer) {
    clearTimeout(timer);
  }
}

function clearHeroTyping() {
  clearTimer(heroTypingTimer);
  heroTypingTimer = null;
  if (heroTextElement) heroTextElement.innerHTML = "";
}

function clearContactTyping() {
  clearTimer(contactTypingTimer);
  contactTypingTimer = null;
  if (contactIntroElement) contactIntroElement.innerHTML = "";
}

function clearServicesTyping() {
  clearTimer(servicesTypingTimer);
  servicesTypingTimer = null;
  if (servicesIntroElement) servicesIntroElement.innerHTML = "";
}

function clearAboutTyping() {
  clearTimer(aboutTypingTimer);
  aboutTypingTimer = null;
  if (aboutIntroElement) aboutIntroElement.innerHTML = "";
}

function createCursor(className) {
  const cursor = document.createElement("span");
  cursor.className = className;
  cursor.textContent = "_";
  return cursor;
}

function getTokenText(token) {
  if (typeof token === "string") return token;
  if (token && typeof token.text === "string") return token.text;
  return "";
}

function getCharacterDelay() {
  return 16 + Math.random() * 14;
}

function getTokenPause(token) {
  if (typeof token !== "string" && token.type === "break") {
    return token.pause || 320;
  }

  const text = getTokenText(token);
  const isSentenceEnd = /[.!?]$/.test(text);
  const isComma = /[,]$/.test(text);
  const isVeryShort = text.length <= 2;
  const isShort = text.length <= 4;

  const isImportant =
    text.includes("Mobile") ||
    text.includes("Hawaii") ||
    text.includes("Lenovo") ||
    text.includes("Enterprise") ||
    text.includes("Esports") ||
    text.includes("workflow") ||
    text.includes("modernized") ||
    text.includes("Interstate") ||
    text.includes("Technology") ||
    text.includes("value-driven") ||
    text.includes("customer") ||
    text.includes("support");

  let pause = 135;

  if (isVeryShort) pause += 20;
  if (isShort) pause += 10;
  if (isImportant) pause += 90;
  if (isComma) pause += 130;
  if (isSentenceEnd) pause += 260;

  return pause;
}

function typeTokens({
  container,
  tokens,
  tokenClass,
  cursorClass,
  timerSetter,
  startDelay = 450
}) {
  if (!container) return;

  container.innerHTML = "";

  let tokenIndex = 0;
  const cursor = createCursor(cursorClass);
  container.appendChild(cursor);

  function createToken(token) {
    const span = document.createElement("span");
    span.className = tokenClass;

    if (typeof token !== "string" && token.action) {
      span.classList.add("is-link");
      span.dataset.action = token.action;
    }

    if (typeof token !== "string" && token.accent) {
      span.classList.add("is-accent");
    }

    container.appendChild(span);
    return span;
  }

  function insertBreak() {
    cursor.remove();

    container.appendChild(document.createElement("br"));
    container.appendChild(document.createElement("br"));
    container.appendChild(cursor);

    tokenIndex += 1;

    const breakTimer = setTimeout(typeNextToken, getTokenPause(CONTACT_BREAK));
    timerSetter(breakTimer);
  }

  function typeNextToken() {
    if (tokenIndex >= tokens.length) {
      const endTimer = setTimeout(() => {
        cursor.remove();
      }, 900);

      timerSetter(endTimer);
      return;
    }

    const token = tokens[tokenIndex];

    if (typeof token !== "string" && token.type === "break") {
      insertBreak();
      return;
    }

    cursor.remove();

    const tokenElement = createToken(token);
    const characters = Array.from(getTokenText(token));

    container.appendChild(cursor);

    let charIndex = 0;

    function typeNextCharacter() {
      if (charIndex >= characters.length) {
        tokenIndex += 1;

        if (
          tokenIndex < tokens.length &&
          !(typeof tokens[tokenIndex] !== "string" && tokens[tokenIndex].type === "break")
        ) {
          container.insertBefore(document.createTextNode(" "), cursor);
        }

        const pauseTimer = setTimeout(typeNextToken, getTokenPause(token));
        timerSetter(pauseTimer);
        return;
      }

      tokenElement.textContent += characters[charIndex];
      charIndex += 1;

      const charTimer = setTimeout(typeNextCharacter, getCharacterDelay());
      timerSetter(charTimer);
    }

    const firstTimer = setTimeout(typeNextCharacter, 22);
    timerSetter(firstTimer);
  }

  const startTimer = setTimeout(typeNextToken, startDelay);
  timerSetter(startTimer);
}

function typeHeroText() {
  clearHeroTyping();

  typeTokens({
    container: heroTextElement,
    tokens: heroText,
    tokenClass: "hero-token",
    cursorClass: "hero-cursor",
    timerSetter: (timer) => {
      heroTypingTimer = timer;
    },
    startDelay: 360
  });
}

function typeContactIntro() {
  clearContactTyping();

  typeTokens({
    container: contactIntroElement,
    tokens: contactIntroText,
    tokenClass: "contact-token",
    cursorClass: "contact-cursor",
    timerSetter: (timer) => {
      contactTypingTimer = timer;
    },
    startDelay: 260
  });
}

function typeServicesIntro() {
  clearServicesTyping();

  typeTokens({
    container: servicesIntroElement,
    tokens: servicesIntroText,
    tokenClass: "services-token",
    cursorClass: "services-cursor",
    timerSetter: (timer) => {
      servicesTypingTimer = timer;
    },
    startDelay: 260
  });
}

function typeAboutIntro() {
  clearAboutTyping();

  typeTokens({
    container: aboutIntroElement,
    tokens: aboutIntroText,
    tokenClass: "about-token",
    cursorClass: "about-cursor",
    timerSetter: (timer) => {
      aboutTypingTimer = timer;
    },
    startDelay: 260
  });
}

/* Bottom info typewriter */

const bottomInfo = document.querySelector("#bottomInfo");

const bottomTexts = {
  front: ["NETWORK", "&", "HARDWARE", "/", "DEPLOYMENT", "MODULE"],
  back: ["AUTHORIZED", "PARTNER", "ECOSYSTEM", "/", "STICKER"]
};

function typeBottomInfo(mode) {
  if (!bottomInfo) return;

  clearTimer(infoTypingTimer);

  const tokens = bottomTexts[mode];
  let tokenIndex = 0;

  bottomInfo.innerHTML = "";
  const cursor = createCursor("info-cursor");
  bottomInfo.appendChild(cursor);

  function createInfoToken() {
    const span = document.createElement("span");
    span.className = "info-token";
    bottomInfo.appendChild(span);
    return span;
  }

  function typeNextInfoToken() {
    if (tokenIndex >= tokens.length) {
      infoTypingTimer = setTimeout(() => {
        cursor.remove();
      }, 650);
      return;
    }

    cursor.remove();

    const token = tokens[tokenIndex];
    const tokenElement = createInfoToken();
    const characters = Array.from(token);

    bottomInfo.appendChild(cursor);

    let charIndex = 0;

    function typeNextInfoCharacter() {
      if (charIndex >= characters.length) {
        tokenIndex += 1;

        if (tokenIndex < tokens.length) {
          bottomInfo.insertBefore(document.createTextNode(" "), cursor);
        }

        const pause = token === "/" ? 110 : 70;
        infoTypingTimer = setTimeout(typeNextInfoToken, pause);
        return;
      }

      tokenElement.textContent += characters[charIndex];
      charIndex += 1;

      infoTypingTimer = setTimeout(typeNextInfoCharacter, 12 + Math.random() * 10);
    }

    infoTypingTimer = setTimeout(typeNextInfoCharacter, 18);
  }

  infoTypingTimer = setTimeout(typeNextInfoToken, 160);
}

/* Page switch */

const pageLinks = document.querySelectorAll("[data-page-link]");
let currentSide = "front";

function clearPageTypingExcept(page) {
  if (page !== "home") clearHeroTyping();
  if (page !== "contact") clearContactTyping();
  if (page !== "services") clearServicesTyping();
  if (page !== "about") clearAboutTyping();
}

function setPage(page) {
  const isContact = page === "contact";
  const isServices = page === "services";
  const isProjects = page === "projects";
  const isAbout = page === "about";

  document.body.classList.toggle("is-contact", isContact);
  document.body.classList.toggle("is-services", isServices);
  document.body.classList.toggle("is-projects", isProjects);
  document.body.classList.toggle("is-about", isAbout);

  document.querySelectorAll("[data-page-link]").forEach((link) => {
    link.classList.toggle("is-active", link.dataset.pageLink === page && page !== "home");
  });

  clearPageTypingExcept(page);

  if (isContact) {
    typeContactIntro();
    window.history.replaceState(null, "", "#contact");
  } else if (isServices) {
    typeServicesIntro();
    window.history.replaceState(null, "", "#services");
  } else if (isProjects) {
    window.history.replaceState(null, "", "#projects");
  } else if (isAbout) {
    typeAboutIntro();
    window.history.replaceState(null, "", "#about");
  } else {
    typeHeroText();
    typeBottomInfo(currentSide);
    window.history.replaceState(null, "", "index.html");
  }
}

pageLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    setPage(link.dataset.pageLink);
  });
});

/* Front / Back switch */

const sideButtons = document.querySelectorAll(".side-button");
const sideSwitch = document.querySelector(".side-switch");

function setSide(side) {
  currentSide = side;

  sideButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.side === side);
  });

  sideSwitch.dataset.currentSide = side;
  document.body.classList.toggle("is-back", side === "back");

  if (
    !document.body.classList.contains("is-contact") &&
    !document.body.classList.contains("is-services") &&
    !document.body.classList.contains("is-projects") &&
    !document.body.classList.contains("is-about")
  ) {
    typeBottomInfo(side);
  }
}

sideButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setSide(button.dataset.side);
  });
});

/* Scroll + relation interaction */

const contactPage = document.querySelector("#contactPage");
const servicesPage = document.querySelector("#servicesPage");
const projectsPage = document.querySelector("#projectsPage");
const aboutPage = document.querySelector("#aboutPage");
const contactInfo = document.querySelector("#contactInfo");
const contactAddress = document.querySelector("#contactAddress");
const contactPhone = document.querySelector("#contactPhone");
const contactEmail = document.querySelector("#contactEmail");
const warrantyPanel = document.querySelector("#warrantyPanel");
const warrantyTitle = document.querySelector("#warrantyTitle");

function getScrollTopForCenter(container, target, offset = 0) {
  if (!container || !target) return 0;

  const containerRect = container.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();

  return (
    container.scrollTop +
    targetRect.top -
    containerRect.top -
    (container.clientHeight - targetRect.height) / 2 +
    offset
  );
}

function centerTargetInContactPage(target, offset = 0) {
  if (!contactPage || !target) return;

  contactPage.scrollTo({
    top: Math.max(0, getScrollTopForCenter(contactPage, target, offset)),
    behavior: "smooth"
  });
}

function scrollPageTop(pageElement) {
  if (!pageElement) return;

  pageElement.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function clearRelated() {
  [contactPhone, contactEmail, contactAddress, warrantyPanel, warrantyTitle].forEach((element) => {
    if (element) element.classList.remove("is-related");
  });
}

function setRelated(action) {
  clearRelated();

  if (action === "contact") {
    [contactPhone, contactEmail].forEach((element) => {
      if (element) element.classList.add("is-related");
    });
  }

  if (action === "visit") {
    if (contactAddress) contactAddress.classList.add("is-related");
  }

  if (action === "warranty" || action === "warranty-contact") {
    if (warrantyPanel) warrantyPanel.classList.add("is-related");
    if (warrantyTitle) warrantyTitle.classList.add("is-related");
  }
}

function performIntroAction(action) {
  if (action === "contact") {
    centerTargetInContactPage(contactInfo);
  }

  if (action === "visit") {
    centerTargetInContactPage(contactAddress);
  }

  if (action === "warranty") {
    centerTargetInContactPage(warrantyPanel, -20);
  }
}

function goToContactInfo() {
  if (!document.body.classList.contains("is-contact")) {
    setPage("contact");

    window.setTimeout(() => {
      centerTargetInContactPage(contactInfo);
    }, 360);

    return;
  }

  centerTargetInContactPage(contactInfo);
}

function goToWarrantyService() {
  if (!document.body.classList.contains("is-contact")) {
    setPage("contact");

    window.setTimeout(() => {
      setRelated("warranty");
      centerTargetInContactPage(warrantyPanel, -20);
    }, 360);

    return;
  }

  setRelated("warranty");
  centerTargetInContactPage(warrantyPanel, -20);
}

function goToCurrentTop() {
  if (document.body.classList.contains("is-contact")) {
    scrollPageTop(contactPage);
    return;
  }

  if (document.body.classList.contains("is-services")) {
    scrollPageTop(servicesPage);
    return;
  }

  if (document.body.classList.contains("is-projects")) {
    scrollPageTop(projectsPage);
    return;
  }

  if (document.body.classList.contains("is-about")) {
    scrollPageTop(aboutPage);
  }
}

if (contactIntroElement) {
  contactIntroElement.addEventListener("mouseover", (event) => {
    const token = event.target.closest(".contact-token[data-action]");
    if (!token) return;

    setRelated(token.dataset.action);
  });

  contactIntroElement.addEventListener("mouseout", (event) => {
    const token = event.target.closest(".contact-token[data-action]");
    if (!token) return;

    const relatedTarget = event.relatedTarget;
    if (relatedTarget && contactIntroElement.contains(relatedTarget)) {
      const nextToken = relatedTarget.closest(".contact-token[data-action]");
      if (nextToken && nextToken.dataset.action === token.dataset.action) return;
    }

    clearRelated();
  });

  contactIntroElement.addEventListener("click", (event) => {
    const token = event.target.closest(".contact-token[data-action]");
    if (!token) return;

    performIntroAction(token.dataset.action);
  });
}

document.addEventListener("mouseover", (event) => {
  const link = event.target.closest(".inline-scroll-link[data-action]");
  if (!link) return;

  setRelated(link.dataset.action);
  link.classList.add("is-related");
});

document.addEventListener("mouseout", (event) => {
  const link = event.target.closest(".inline-scroll-link[data-action]");
  if (!link) return;

  const relatedTarget = event.relatedTarget;
  if (relatedTarget && link.contains(relatedTarget)) return;

  clearRelated();
  link.classList.remove("is-related");
});

document.addEventListener("click", (event) => {
  const link = event.target.closest(".inline-scroll-link[data-action]");
  if (!link) return;

  event.preventDefault();

  if (link.dataset.action === "warranty-contact") {
    goToWarrantyService();
    return;
  }

  if (link.dataset.action === "contact-page") {
    goToContactInfo();
    return;
  }

  performIntroAction(link.dataset.action);
});

document.querySelectorAll(".contact-us-button").forEach((button) => {
  button.addEventListener("click", () => {
    goToContactInfo();
  });
});

document.querySelectorAll(".top-button").forEach((button) => {
  button.addEventListener("click", () => {
    goToCurrentTop();
  });
});

/* Copy interaction */

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();

    const success = document.execCommand("copy");
    textarea.remove();

    return success;
  }
}

document.querySelectorAll(".copy-item").forEach((item) => {
  item.dataset.originalText = item.querySelector(".contact-main-text").textContent;
  item.dataset.copyTimer = "";

  item.addEventListener("click", async () => {
    const text = item.dataset.copy;
    const textSpan = item.querySelector(".contact-main-text");
    const originalText = item.dataset.originalText;

    const success = await copyText(text);

    if (!success) return;

    if (item.dataset.copyTimer) {
      clearTimeout(Number(item.dataset.copyTimer));
    }

    item.classList.add("is-copied");
    textSpan.textContent = "COPIED!";

    const timer = window.setTimeout(() => {
      textSpan.textContent = originalText;
      item.classList.remove("is-copied");
      item.dataset.copyTimer = "";
    }, 1800);

    item.dataset.copyTimer = String(timer);
  });
});

/* Stickers */

const stickerFiles = [
  {
    name: "absolute",
    src: "stickers/absolute_logo.webp",
    left: "18%",
    top: "28%",
    width: "210px",
    rotate: "-8deg"
  },
  {
    name: "lenovo",
    src: "stickers/LenovoLogo-POS-Red-1.png",
    left: "42%",
    top: "24%",
    width: "210px",
    rotate: "5deg"
  },
  {
    name: "lexmark",
    src: "stickers/Logo.png",
    left: "64%",
    top: "34%",
    width: "190px",
    rotate: "-4deg"
  },
  {
    name: "sentinelone",
    src: "stickers/SentinelOne.png",
    left: "28%",
    top: "58%",
    width: "250px",
    rotate: "7deg"
  },
  {
    name: "veeam",
    src: "stickers/Veeam_logo_2024_RGB_main_25.png",
    left: "58%",
    top: "62%",
    width: "210px",
    rotate: "-10deg"
  },
  {
    name: "pixel-sticker-01",
    src: "stickers/stickers-01.png",
    left: "8%",
    top: "48%",
    width: "178px",
    rotate: "-5deg",
    cutout: true
  },
  {
    name: "pixel-sticker-02",
    src: "stickers/stickers-02.png",
    left: "78%",
    top: "22%",
    width: "142px",
    rotate: "4deg",
    cutout: true
  },
  {
    name: "pixel-sticker-03",
    src: "stickers/stickers-03.png",
    left: "74%",
    top: "72%",
    width: "188px",
    rotate: "6deg",
    cutout: true
  }
];

const stickerBoard = document.querySelector("#stickerBoard");
let highestStickerZ = 20;

function createStickers() {
  if (!stickerBoard) return;

  stickerBoard.innerHTML = "";

  stickerFiles.forEach((file, index) => {
    const sticker = document.createElement("div");
    sticker.className = "sticker";

    if (file.cutout) {
      sticker.classList.add("is-cutout");
    }

    sticker.dataset.name = file.name;

    sticker.style.setProperty("--sticker-left", file.left);
    sticker.style.setProperty("--sticker-top", file.top);
    sticker.style.setProperty("--sticker-width", file.width);
    sticker.style.setProperty("--sticker-rotate", file.rotate);
    sticker.style.zIndex = index + 1;

    const inner = document.createElement("div");
    inner.className = "sticker-inner";

    const img = document.createElement("img");
    img.src = file.src;
    img.alt = file.name;

    inner.appendChild(img);
    sticker.appendChild(inner);
    stickerBoard.appendChild(sticker);

    makeStickerDraggable(sticker);
  });
}

function makeStickerDraggable(sticker) {
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let initialLeft = 0;
  let initialTop = 0;

  sticker.addEventListener("pointerdown", (event) => {
    isDragging = true;

    const rect = sticker.getBoundingClientRect();
    const boardRect = stickerBoard.getBoundingClientRect();

    startX = event.clientX;
    startY = event.clientY;
    initialLeft = rect.left - boardRect.left;
    initialTop = rect.top - boardRect.top;

    sticker.classList.add("is-dragging");
    sticker.style.zIndex = highestStickerZ++;

    sticker.setPointerCapture(event.pointerId);
    event.preventDefault();
  });

  sticker.addEventListener("pointermove", (event) => {
    if (!isDragging) return;

    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;

    sticker.style.left = `${initialLeft + deltaX}px`;
    sticker.style.top = `${initialTop + deltaY}px`;
  });

  sticker.addEventListener("pointerup", (event) => {
    isDragging = false;
    sticker.classList.remove("is-dragging");
    sticker.releasePointerCapture(event.pointerId);
  });

  sticker.addEventListener("pointercancel", () => {
    isDragging = false;
    sticker.classList.remove("is-dragging");
  });
}

createStickers();

if (window.location.hash === "#contact") {
  setPage("contact");
} else if (window.location.hash === "#services") {
  setPage("services");
} else if (window.location.hash === "#projects") {
  setPage("projects");
} else if (window.location.hash === "#about") {
  setPage("about");
} else {
  setPage("home");
}

setSide("front");