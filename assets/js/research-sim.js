/**
 * Interactive Biosignal Waveform Simulator
 * Visualizes authentic EEG spectral bands and EmotiBit RR-interval tachograms
 * Designed specifically for Durgesh Giri's IIT Mandi Research Showcase
 */

(function () {
  const canvas = document.getElementById('biosignal-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = canvas.parentElement.clientWidth);
  let height = (canvas.height = 180);

  window.addEventListener('resize', () => {
    if (!canvas.parentElement) return;
    width = canvas.width = canvas.parentElement.clientWidth;
    height = canvas.height = 180;
  });

  // Current active mode
  let activeMode = 'alpha'; // 'delta', 'theta', 'alpha', 'beta', 'gamma', 'rri'
  let time = 0;

  const modeConfigs = {
    delta: {
      name: 'Delta Band (0.5 – 4 Hz)',
      channel: 'AF7 / AF8 Montage',
      color: '#a855f7',
      freq: 0.015,
      amp: 45,
      noise: 4,
      desc: 'Deep restorative neural oscillations (138 recordings baseline).'
    },
    theta: {
      name: 'Theta Band (4 – 8 Hz)',
      channel: 'AF7 / TP9 Montage',
      color: '#38bdf8',
      freq: 0.035,
      amp: 35,
      noise: 6,
      desc: 'Drowsiness, meditation & memory encoding signals.'
    },
    alpha: {
      name: 'Alpha Band (8 – 13 Hz)',
      channel: 'AF7, AF8, TP9, TP10',
      color: '#00f0ff',
      freq: 0.065,
      amp: 30,
      noise: 5,
      desc: 'Calm wakefulness & VR/Audio pre-session baseline normalized power.'
    },
    beta: {
      name: 'Beta Band (13 – 30 Hz)',
      channel: 'AF7 / AF8 Frontal Montage',
      color: '#10b981',
      freq: 0.12,
      amp: 20,
      noise: 7,
      desc: 'Active mental cognitive engagement & problem-solving alertness.'
    },
    gamma: {
      name: 'Gamma Band (> 30 Hz)',
      channel: 'Multi-Channel Composite',
      color: '#f59e0b',
      freq: 0.22,
      amp: 14,
      noise: 8,
      desc: 'High-frequency cross-modal sensory & informational binding.'
    },
    rri: {
      name: 'EmotiBit RR Tachogram',
      channel: 'PPG / Physiological Sensor',
      color: '#f43f5e',
      freq: 0.04,
      amp: 38,
      noise: 3,
      desc: 'Filtered 39,798 intervals (300-2000 ms biological filter, RMSSD & SDNN).'
    }
  };

  // Wire buttons
  const modeButtons = document.querySelectorAll('.signal-mode-btn');
  const signalNameEl = document.getElementById('signal-mode-name');
  const signalMetaEl = document.getElementById('signal-mode-meta');
  const signalDescEl = document.getElementById('signal-mode-desc');

  function updateModeInfo(mode) {
    const cfg = modeConfigs[mode];
    if (signalNameEl) signalNameEl.textContent = cfg.name;
    if (signalMetaEl) signalMetaEl.textContent = `Channel: ${cfg.channel}`;
    if (signalDescEl) signalDescEl.textContent = cfg.desc;
  }

  modeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      modeButtons.forEach((b) => b.classList.remove('active', 'border-cyan-400', 'bg-cyan-500/20', 'text-cyan-300'));
      btn.classList.add('active', 'border-cyan-400', 'bg-cyan-500/20', 'text-cyan-300');
      activeMode = btn.getAttribute('data-mode') || 'alpha';
      updateModeInfo(activeMode);
    });
  });

  // Initial info
  updateModeInfo('alpha');

  function drawGrid() {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;

    // Horizontal grid
    for (let y = 20; y < height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Vertical grid
    for (let x = 20; x < width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Center zero-voltage dashed line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  function renderWave() {
    ctx.clearRect(0, 0, width, height);
    drawGrid();

    const cfg = modeConfigs[activeMode] || modeConfigs.alpha;
    const centerY = height / 2;

    ctx.beginPath();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = cfg.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = cfg.color;

    for (let x = 0; x < width; x++) {
      let y = centerY;

      if (activeMode === 'rri') {
        // Heartbeat tachogram wave simulation (QRS spike + baseline variation)
        const period = 70;
        const phase = (x + time * 60) % period;
        let spike = 0;
        if (phase > 30 && phase < 34) {
          spike = -cfg.amp * 1.6; // R peak
        } else if (phase >= 34 && phase < 38) {
          spike = cfg.amp * 0.7; // S wave
        } else if (phase > 45 && phase < 55) {
          spike = -cfg.amp * 0.35; // T wave
        }
        const respiratoryDrift = Math.sin((x + time * 10) * 0.015) * 8;
        y += spike + respiratoryDrift;
      } else {
        // Continuous spectral band wave (fundamental + harmonics + minor biological noise)
        const fundamental = Math.sin(x * cfg.freq + time * 4) * cfg.amp;
        const harmonic = Math.sin(x * (cfg.freq * 2.1) + time * 3) * (cfg.amp * 0.25);
        const subHarmonic = Math.sin(x * (cfg.freq * 0.45) + time * 1.2) * (cfg.amp * 0.35);
        const randNoise = (Math.sin(x * 1.7 + time * 8) * cfg.noise) * 0.4;
        y += fundamental + harmonic + subHarmonic + randNoise;
      }

      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }

    ctx.stroke();
    ctx.shadowBlur = 0;

    // Glowing scan tracer bead
    const beadX = (time * 120) % width;
    let beadY = centerY;
    if (activeMode === 'rri') {
      const period = 70;
      const phase = (beadX + time * 60) % period;
      let spike = 0;
      if (phase > 30 && phase < 34) spike = -cfg.amp * 1.6;
      else if (phase >= 34 && phase < 38) spike = cfg.amp * 0.7;
      else if (phase > 45 && phase < 55) spike = -cfg.amp * 0.35;
      beadY += spike + Math.sin((beadX + time * 10) * 0.015) * 8;
    } else {
      beadY += Math.sin(beadX * cfg.freq + time * 4) * cfg.amp;
    }

    ctx.beginPath();
    ctx.arc(beadX, beadY, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.shadowBlur = 12;
    ctx.shadowColor = cfg.color;
    ctx.fill();
    ctx.shadowBlur = 0;

    time += 0.018;
    requestAnimationFrame(renderWave);
  }

  renderWave();
})();
