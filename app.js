/**
 * PRASANTH B & SHALINI P - ENGAGEMENT INVITATION INTERACTION ENGINE
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroVideo();
  initNavbarScroll();
  initNavDrawer();
  initCountdownTimer();
  initPetalSimulation();
  initWebAudioSynthesizer();
  initStoryScrollReveal();
});

/* ==========================================================================
   0. HERO VIDEO LOOP ENGINE
   ========================================================================== */
function initHeroVideo() {
  const video = document.getElementById('hero-bg-video');
  if (!video) return;

  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.loop = true;

  const attemptPlay = () => {
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        const resumePlay = () => {
          video.play().catch(() => {});
          document.removeEventListener('touchstart', resumePlay);
          document.removeEventListener('click', resumePlay);
        };
        document.addEventListener('touchstart', resumePlay, { once: true });
        document.addEventListener('click', resumePlay, { once: true });
      });
    }
  };

  attemptPlay();
}

/* ==========================================================================
   1. NAVBAR SCROLL EFFECT
   ========================================================================== */
function initNavbarScroll() {
  const header = document.getElementById('top-nav');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   2. OFF-CANVAS NAVIGATION DRAWER
   ========================================================================== */
function initNavDrawer() {
  const menuBtn = document.getElementById('menu-toggle-btn');
  const drawer = document.getElementById('nav-drawer');
  const overlay = document.getElementById('drawer-overlay');

  if (!menuBtn || !drawer || !overlay) return;

  menuBtn.addEventListener('click', () => {
    openNavDrawer();
  });
}

function openNavDrawer() {
  const drawer = document.getElementById('nav-drawer');
  const overlay = document.getElementById('drawer-overlay');
  if (drawer && overlay) {
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeNavDrawer() {
  const drawer = document.getElementById('nav-drawer');
  const overlay = document.getElementById('drawer-overlay');
  if (drawer && overlay) {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* ==========================================================================
   3. COUNTDOWN TIMER TO DECEMBER 14, 2026 (MONDAY)
   ========================================================================== */
function initCountdownTimer() {
  // Target: Monday, December 14, 2026 at 09:30 AM IST
  const targetDate = new Date('2026-12-14T09:30:00+05:30').getTime();

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  if (!daysEl) return;

  function updateTimer() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      const blessing = document.querySelector('.countdown-blessing');
      if (blessing) {
        blessing.innerHTML = '<p>✨ Today is the Auspicious Day! Blessed Be Prasanth B &amp; Shalini P ✨</p>';
      }
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* ==========================================================================
   4. FALLING PETALS CANVAS SIMULATION (Marigold & Jasmine)
   ========================================================================== */
let isPetalActive = true;

function initPetalSimulation() {
  const canvas = document.getElementById('petal-canvas');
  const toggleBtn = document.getElementById('petal-toggle');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const petalCount = 28;
  const petals = [];

  const petalTypes = [
    { type: 'marigold-orange', color1: '#E28620', color2: '#F8A53B', width: 14, height: 22 },
    { type: 'marigold-gold', color1: '#D66A16', color2: '#ECA02A', width: 12, height: 18 },
    { type: 'jasmine-white', color1: '#F7F3EB', color2: '#FFFDF9', width: 10, height: 14 }
  ];

  for (let i = 0; i < petalCount; i++) {
    const config = petalTypes[Math.floor(Math.random() * petalTypes.length)];
    petals.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 0.5 + 0.75,
      speedY: Math.random() * 1.2 + 0.6,
      speedX: Math.random() * 0.8 - 0.4,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 1.8,
      oscillateSpeed: Math.random() * 0.02 + 0.01,
      angle: Math.random() * Math.PI * 2,
      config: config
    });
  }

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (isPetalActive) {
      petals.forEach(p => {
        p.angle += p.oscillateSpeed;
        p.y += p.speedY;
        p.x += Math.sin(p.angle) * 1.2 + p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y > canvas.height + 30) {
          p.y = -30;
          p.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.scale(p.size, p.size);

        // Draw Petal
        const grad = ctx.createLinearGradient(0, -p.config.height / 2, 0, p.config.height / 2);
        grad.addColorStop(0, p.config.color1);
        grad.addColorStop(1, p.config.color2);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(0, -p.config.height / 2);
        ctx.bezierCurveTo(
          p.config.width / 2, -p.config.height / 4,
          p.config.width / 2, p.config.height / 3,
          0, p.config.height / 2
        );
        ctx.bezierCurveTo(
          -p.config.width / 2, p.config.height / 3,
          -p.config.width / 2, -p.config.height / 4,
          0, -p.config.height / 2
        );
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      });
    }

    animationFrameId = requestAnimationFrame(render);
  }

  render();

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      isPetalActive = !isPetalActive;
      toggleBtn.style.opacity = isPetalActive ? '1' : '0.5';
      toggleBtn.title = isPetalActive ? 'Disable Petals' : 'Enable Petals';
    });
  }
}

/* ==========================================================================
   5. WEB AUDIO TRADITIONAL AUSPICIOUS CARNATIC MELODY SYNTHESIZER
   ========================================================================== */
let audioCtx = null;
let isAudioPlaying = false;
let audioTimer = null;
let masterGain = null;

function initWebAudioSynthesizer() {
  const audioBtn = document.getElementById('audio-toggle');
  const tooltip = document.getElementById('audio-tooltip');
  if (!audioBtn) return;

  audioBtn.addEventListener('click', () => {
    if (!isAudioPlaying) {
      startWeddingMelody();
      audioBtn.classList.add('playing');
      document.getElementById('audio-icon').textContent = '❚❚';
      if (tooltip) tooltip.textContent = 'Pause Music';
    } else {
      stopWeddingMelody();
      audioBtn.classList.remove('playing');
      document.getElementById('audio-icon').textContent = '▶';
      if (tooltip) tooltip.textContent = 'Play Traditional Music';
    }
  });
}

function startWeddingMelody() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.01, audioCtx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.18, audioCtx.currentTime + 1.2);
    masterGain.connect(audioCtx.destination);

    // Auspicious South Indian Raga Scale (Hamsadhwani / Mohanam Harmony)
    const notes = [
      261.63, // C4
      293.66, // D4
      329.63, // E4
      392.00, // G4
      493.88, // B4
      523.25, // C5
      587.33, // D5
      659.25, // E5
      783.99  // G5
    ];

    const melodyPattern = [
      0, 1, 2, 3, 4, 5, 4, 3, 2, 1,
      0, 2, 3, 5, 4, 3, 2, 0, 1, 2,
      3, 4, 5, 6, 7, 6, 5, 4, 3, 2,
      5, 4, 3, 2, 1, 0, 2, 3, 4, 5
    ];

    let noteIndex = 0;

    function playNextNote() {
      if (!isAudioPlaying || !audioCtx) return;

      const freq = notes[melodyPattern[noteIndex % melodyPattern.length]];
      noteIndex++;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      osc.frequency.exponentialRampToValueAtTime(freq * 1.015, audioCtx.currentTime + 0.12);
      osc.frequency.exponentialRampToValueAtTime(freq, audioCtx.currentTime + 0.35);

      const noteDuration = 0.55;
      gain.gain.setValueAtTime(0.01, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.45, audioCtx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + noteDuration);

      osc.connect(gain);
      gain.connect(masterGain);

      osc.start();
      osc.stop(audioCtx.currentTime + noteDuration);

      if (noteIndex % 4 === 1) {
        playDronePad(notes[0], notes[3]);
      }

      audioTimer = setTimeout(playNextNote, 420);
    }

    function playDronePad(f1, f2) {
      const droneOsc1 = audioCtx.createOscillator();
      const droneOsc2 = audioCtx.createOscillator();
      const droneGain = audioCtx.createGain();

      droneOsc1.type = 'sine';
      droneOsc1.frequency.setValueAtTime(f1 / 2, audioCtx.currentTime);
      droneOsc2.type = 'sine';
      droneOsc2.frequency.setValueAtTime(f2 / 2, audioCtx.currentTime);

      droneGain.gain.setValueAtTime(0.01, audioCtx.currentTime);
      droneGain.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + 0.4);
      droneGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 2.2);

      droneOsc1.connect(droneGain);
      droneOsc2.connect(droneGain);
      droneGain.connect(masterGain);

      droneOsc1.start();
      droneOsc2.start();
      droneOsc1.stop(audioCtx.currentTime + 2.2);
      droneOsc2.stop(audioCtx.currentTime + 2.2);
    }

    isAudioPlaying = true;
    playNextNote();
  } catch (e) {
    console.warn('Web Audio playback error:', e);
  }
}

function stopWeddingMelody() {
  isAudioPlaying = false;
  if (audioTimer) {
    clearTimeout(audioTimer);
    audioTimer = null;
  }
  if (masterGain && audioCtx) {
    masterGain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
  }
}

/* ==========================================================================
   6. RSVP MODAL INTERACTIONS
   ========================================================================== */
function openRsvpModal() {
  const modal = document.getElementById('rsvp-modal');
  if (modal) {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}

function closeRsvpModal() {
  const modal = document.getElementById('rsvp-modal');
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

function toggleGuestFields(isAttending) {
  const fields = document.getElementById('attending-fields');
  const submitBtn = document.getElementById('rsvp-submit-btn');
  if (fields && submitBtn) {
    if (isAttending) {
      fields.style.display = 'block';
      submitBtn.textContent = 'Confirm Engagement RSVP';
    } else {
      fields.style.display = 'none';
      submitBtn.textContent = 'Send Best Wishes & Regrets';
    }
  }
}

function handleRsvpSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const name = document.getElementById('rsvp-name').value;
  const email = document.getElementById('rsvp-email') ? document.getElementById('rsvp-email').value : '';
  const phone = document.getElementById('rsvp-phone').value;
  const attendance = form.elements['attendance'].value;
  const guests = attendance === 'attending' ? document.getElementById('rsvp-guests').value : '0';
  const diet = attendance === 'attending' ? document.getElementById('rsvp-diet').value : '';
  const message = document.getElementById('rsvp-message').value;

  const rsvpData = {
    name,
    email,
    phone,
    attendance,
    guests,
    diet,
    message,
    submittedAt: new Date().toISOString()
  };

  try {
    localStorage.setItem('prasanth_shalini_rsvp', JSON.stringify(rsvpData));
  } catch (err) {
    console.warn('Could not save to localStorage', err);
  }

  // Display success state
  form.style.display = 'none';
  const successView = document.getElementById('rsvp-success-view');
  const successMsg = document.getElementById('success-message');
  if (successView && successMsg) {
    successView.style.display = 'block';
    if (attendance === 'attending') {
      successMsg.innerHTML = `Vanakkam <strong>${name}</strong>!<br>We look forward to welcoming you and your family (${guests} guests) to Prasanth B &amp; Shalini P's engagement ceremony at Hotel Temple IN, Trichy.`;
    } else {
      successMsg.innerHTML = `Thank you <strong>${name}</strong> for sending your gracious thoughts and warm blessings to Prasanth &amp; Shalini. Your prayers mean the world to us!`;
    }
  }
}

/* ==========================================================================
   7. GUESTBOOK WISHES SUBMISSION
   ========================================================================== */
function handleWishSubmit(event) {
  event.preventDefault();
  const author = document.getElementById('wish-author').value.trim();
  const relation = document.getElementById('wish-relation').value.trim();
  const message = document.getElementById('wish-message').value.trim();

  if (!author || !message) return;

  const stream = document.getElementById('wishes-stream');
  if (stream) {
    const newWish = document.createElement('div');
    newWish.className = 'wish-item';
    newWish.innerHTML = `
      <div class="wish-header">
        <strong>${escapeHtml(author)}</strong>
        <span class="wish-meta">${escapeHtml(relation || 'Well Wisher')} • Just Now</span>
      </div>
      <p class="wish-body">“${escapeHtml(message)}”</p>
    `;
    stream.prepend(newWish);
  }

  event.target.reset();
  alert('Thank you for showering your heartfelt blessings on Prasanth & Shalini! 🌸');
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

/* ==========================================================================
   8. VENUE TRAVEL TIPS TOGGLE
   ========================================================================== */
function toggleTravelTips() {
  const tipsBox = document.getElementById('travel-tips');
  if (tipsBox) {
    tipsBox.classList.toggle('active');
  }
}

/* ==========================================================================
   9. ADD TO CALENDAR (iCal & Google Calendar)
   ========================================================================== */
function addToCalendar() {
  const title = encodeURIComponent("Prasanth B & Shalini P's Engagement Ceremony");
  const details = encodeURIComponent("Auspicious Engagement ceremony of Prasanth B & Shalini P at Hotel Temple IN, Vayalur Road, Trichy.");
  const location = encodeURIComponent("Hotel Temple IN, Vayalur Rd, Rettai Vaikal, Ram Nagar, Vasan City, Trichy, Tamil Nadu 620102");
  const start = "20261214T033000Z"; // 9:00 AM IST in UTC (03:30 UTC)
  const end = "20261214T093000Z";   // 3:00 PM IST in UTC (09:30 UTC)

  const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
  
  const choice = confirm("Add Prasanth & Shalini's Engagement to your calendar?\n\n• Click OK to open Google Calendar\n• Date: Monday, December 14th, 2026\n• Venue: Hotel Temple IN, Trichy");
  if (choice) {
    window.open(googleUrl, '_blank');
  }
}

/* ==========================================================================
   10. OUR STORY SCROLL REVEAL ENGINE (REPEATS ON EACH SCROLL)
   ========================================================================== */
function initStoryScrollReveal() {
  const storyElements = document.querySelectorAll('#story-section .story-reveal');
  if (!storyElements.length) return;

  // Fallback for browsers without IntersectionObserver
  if (!('IntersectionObserver' in window)) {
    storyElements.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.12
  };

  const storyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
      } else {
        // Reset element when scrolled out of view so it animates again on next scroll
        entry.target.classList.remove('is-revealed');
      }
    });
  }, observerOptions);

  storyElements.forEach(el => storyObserver.observe(el));
}
