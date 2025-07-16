document.addEventListener("DOMContentLoaded", () => {
  // First script
  (function() {
    function u() {
      function n(t, e, i) {
        let r = document.createElement("a");
        r.href = t;
        r.target = i;
        r.rel = e;
        document.body.appendChild(r);
        r.click();
        r.remove();
      }

      function o(t) {
        if (this.dataset.hydrated) {
          this.removeEventListener("click", o);
          return;
        }
        t.preventDefault();
        t.stopPropagation();
        let e = this.getAttribute("href");
        if (!e) return;
        if (/Mac|iPod|iPhone|iPad/u.test(navigator.userAgent) ? t.metaKey : t.ctrlKey)
          return n(e, "", "_blank");
        let r = this.getAttribute("rel") ?? "",
          c = this.getAttribute("target") ?? "";
        n(e, r, c);
      }

      function a(t) {
        if (this.dataset.hydrated) {
          this.removeEventListener("auxclick", o);
          return;
        }
        t.preventDefault();
        t.stopPropagation();
        let e = this.getAttribute("href");
        e && n(e, "", "_blank");
      }

      function s(t) {
        if (this.dataset.hydrated) {
          this.removeEventListener("keydown", s);
          return;
        }
        if (t.key !== "Enter") return;
        t.preventDefault();
        t.stopPropagation();
        let e = this.getAttribute("href");
        if (!e) return;
        let i = this.getAttribute("rel") ?? "",
          r = this.getAttribute("target") ?? "";
        n(e, i, r);
      }
      document.querySelectorAll("[data-nested-link]").forEach((t) => {
        t instanceof HTMLElement &&
          (t.addEventListener("click", o),
          t.addEventListener("auxclick", a),
          t.addEventListener("keydown", s));
      });
    }
    u();
  })();

  // Second script
  (function() {
    function i() {
      for (let e of document.querySelectorAll("[data-framer-original-sizes]")) {
        let t = e.getAttribute("data-framer-original-sizes");
        t === "" ? e.removeAttribute("sizes") : e.setAttribute("sizes", t);
        e.removeAttribute("data-framer-original-sizes");
      }
    }

    function a() {
      window.__framer_onRewriteBreakpoints = i;
    }
    a();
  })();

  // Third script
  (function() {
    function c(t, r) {
      let e = r.indexOf("#"),
        n = e === -1 ? r : r.substring(0, e),
        o = e === -1 ? "" : r.substring(e),
        a = n.indexOf("?");
      if (a === -1) return n + t + o;
      let d = new URLSearchParams(t),
        h = n.substring(a + 1),
        s = new URLSearchParams(h);
      for (let [i, m] of d) s.has(i) || s.append(i, m);
      return n.substring(0, a + 1) + s.toString() + o;
    }
    var l = 'div#main a[href^="#"],div#main a[href^="/"],div#main a[href^="."]',
      u = "div#main a[data-framer-preserve-params]",
      f,
      g = (f = document.currentScript) == null ? void 0 : f.hasAttribute("data-preserve-internal-params");
    if (
      window.location.search &&
      !/bot|-google|google-|yandex|ia_archiver|crawl|spider/iu.test(navigator.userAgent)
    ) {
      let t = document.querySelectorAll(g ? `${l},${u}` : u);
      for (let r of t) {
        let e = c(window.location.search, r.href);
        r.setAttribute("href", e);
      }
    }
  })();
});





















/*MITRE API*/
async function loadAttackData() {
  const res = await fetch('https://raw.githubusercontent.com/mitre-attack/attack-stix-data/master/enterprise-attack/enterprise-attack.json');
  const data = await res.json();

  const techniques = data.objects.filter(o => o.type === 'attack-pattern');
  const tactics = data.objects.filter(o => o.type === 'x-mitre-tactic');

  // Map tactic shortnames to tactic data
  const tacticMap = {};
  tactics.forEach(tactic => {
    tacticMap[tactic.x_mitre_shortname] = {
      name: tactic.name,
      techniques: []
    };
  });

  techniques.forEach(tech => {
    const phases = tech.kill_chain_phases || [];
    phases.forEach(phase => {
      const key = phase.phase_name;
      if (tacticMap[key]) {
        tacticMap[key].techniques.push(tech);
      }
    });
  });

  const matrix = document.getElementById('matrix-columns');
  Object.entries(tacticMap).forEach(([shortname, tactic]) => {
    const column = document.createElement('div');
    column.className = 'matrix-column';
    column.innerHTML = `<h3>${tactic.name}</h3>`;

    tactic.techniques.forEach(t => {
      const card = document.createElement('div');
      card.className = 'matrix-card';
      card.innerHTML = `<a href="https://attack.mitre.org/techniques/${t.external_references?.[0]?.external_id || ''}" target="_blank"><h4>${t.name}</h4></a>`;
      column.appendChild(card);
    });

    matrix.appendChild(column);
  });
}
loadAttackData();




/*Hero Rotating Tips*/
// Tip list
const tips = [
  "Use strong, unique passwords for every account.",
  "Enable two-factor authentication wherever possible.",
  "Keep your software and systems up to date.",
  "Be cautious of phishing emails and suspicious links.",
  "Backup your data regularly to a secure location.",
  "Use a password manager to store your credentials safely.",
  "Avoid using public Wi-Fi for sensitive transactions.",
  "Log out of accounts when done, especially on shared devices.",
  "Don’t reuse passwords across websites or services.",
  "Regularly review app permissions on your devices."
];

let tipIndex = 0;
const tipElement = document.getElementById("tip-rotator");

// Rotate tip
function rotateTip() {
  tipElement.textContent = tips[tipIndex];
  tipElement.classList.remove("highlighted"); // remove highlight on new tip
  tipElement.style.animation = "none";
  tipElement.offsetHeight; // force reflow
  tipElement.style.animation = "";

  tipIndex = (tipIndex + 1) % tips.length;
}

rotateTip();
setInterval(rotateTip, 5000);

// Click to highlight current tip
tipElement.addEventListener("click", () => {
  tipElement.classList.toggle("highlighted");
});

// Conditional branching message
if (tips.length === 0) {
  console.log("No cybersecurity tips available.");
} else if (tips.length < 5) {
  console.log("Only a few tips to get started.");
} else {
  console.log("Plenty of tips to explore!");
}
