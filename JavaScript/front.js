document.addEventListener("DOMContentLoaded", function () {
  const togglePC = document.getElementById("toggleEffect-pc");
  const toggleMobil = document.getElementById("toggleEffect-mobil");
  const allToggles = [togglePC, toggleMobil].filter(Boolean);

  // Hent lagret dynamisk bakgrunnsinnstilling fra localStorage
  let dynamicBackground = localStorage.getItem("dynamicBackground") === "true";
  let savedColor = localStorage.getItem("savedColor") || "rgba(0, 0, 0, 0.4)";

  // Oppdater klasser og stil ved lasting
  if (dynamicBackground) {
    document.body.classList.add('dynamic-background');
    document.body.style.setProperty('--overlay-color', savedColor);
  } else {
    document.body.classList.remove('dynamic-background');
  }

  // Sett verdien i begge dropdowns
  allToggles.forEach(toggle => toggle.value = dynamicBackground ? "on" : "off");

  // Lytt etter endring på begge dropdowns
  allToggles.forEach(toggle => {
    toggle.addEventListener("change", function () {
      dynamicBackground = this.value === "on";
      localStorage.setItem("dynamicBackground", dynamicBackground);

      // Synkroniser begge
      allToggles.forEach(t => t.value = this.value);

      if (!dynamicBackground) {
        document.body.classList.remove('dynamic-background');
      } else {
        document.body.classList.add('dynamic-background');
        document.body.style.setProperty('--overlay-color', savedColor);
      }
    });
  });

  // Musbevegelse for dynamisk farge
  document.addEventListener("mousemove", function (e) {
    if (!dynamicBackground) return;

    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    const red = Math.floor(x * 220);
    const green = Math.floor(y * 220);
    const blue = Math.floor((1 - x) * 220);
    const newColor = `rgba(${red}, ${green}, ${blue}, 0.2)`;

    document.body.style.setProperty('--overlay-color', newColor);
    localStorage.setItem("savedColor", newColor);
  });

  // Navigasjonsaktiv lenke
  const topClass = document.querySelectorAll(".top-bar a");
  const currentPath = window.location.pathname.split("/").pop();
  topClass.forEach(link => {
    const linkPath = link.getAttribute("href");
    if (linkPath === currentPath) {
      link.classList.add("active");
    }
  });
});
