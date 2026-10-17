/**
 * Durgesh Giri Portfolio - Main Interaction Controller
 * Handles typing animations, project filters, modal dialogs, and navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navbar Scroll Effect & Active Link Spy
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // Scroll spy
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = sectionId;
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('text-cyan-400', 'font-semibold');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-cyan-400', 'font-semibold');
      }
    });
  });

  // 2. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close when clicking any nav item
    document.querySelectorAll('.mobile-nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // 3. Dynamic Typewriter Animation
  const typedTarget = document.getElementById('typed-text');
  if (typedTarget) {
    const phrases = [
      'AI/ML Engineer & Researcher',
      'Frontend Developer & Interface Architect',
      'Research Intern at IIT Mandi',
      'Deep Learning & Computer Vision (CNN, ResNet)',
      'Generative AI & RAG Pipeline Developer',
      'DSA Problem Solver (1,170+ Solved • 233d Streak 🔥 • Codeforces)'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 70;

    function typeLoop() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typedTarget.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 35;
      } else {
        typedTarget.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 65;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 1600; // Pause at end
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 400; // Pause before typing new phrase
      }

      setTimeout(typeLoop, typingSpeed);
    }

    typeLoop();
  }

  // 4. Project Filtering System
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => {
        b.classList.remove('active', 'border-cyan-400', 'bg-cyan-500/20', 'text-cyan-300');
        b.classList.add('border-white/10', 'text-slate-400');
      });

      btn.classList.add('active', 'border-cyan-400', 'bg-cyan-500/20', 'text-cyan-300');
      btn.classList.remove('border-white/10', 'text-slate-400');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // 5. Project Architecture Modal Database
  const projectDetails = {
    'deepfer': {
      title: '🎭 DeepFER: Facial Emotion Recognition',
      tagline: 'Real-Time Multi-Class Facial Emotion Classification Engine',
      tech: ['CNN', 'TensorFlow', 'OpenCV', 'Streamlit', 'Python'],
      repo: 'https://github.com/durg-giri123/DeepFER-Facial-Emotion-Recognition',
      architecture: [
        'Haar-Cascade classifier detects face bounding boxes from live video streams with under 15ms frame latency.',
        'Extracted facial bounding frames are normalized, converted to grayscale, and scaled to fixed (48x48) tensor inputs.',
        'Custom multi-layer Convolutional Neural Network with Batch Normalization, Dropout (0.25/0.5), and Softmax activation classifies across 7 discrete emotion classes.',
        'Interactive Streamlit UI renders frame overlays with real-time confidence probability distributions.'
      ],
      highlights: [
        'High real-time FPS on consumer webcam hardware without dedicated GPU acceleration.',
        'Zero-latency stream processing with OpenCV integration.',
        'Validated across diverse illumination angles and facial poses.'
      ]
    },
    'resnet-brain': {
      title: '🧠 Brain Tumor Classifier (ResNet)',
      tagline: 'Deep Residual Learning for Automated Multi-Class MRI Diagnosis',
      tech: ['ResNet', 'PyTorch', 'Medical Imaging', 'OpenCV', 'Python'],
      repo: 'https://github.com/durg-giri123/Brain-Tumor-Classifier-ResNet',
      architecture: [
        'End-to-end medical image pipeline applying bilateral filtering and contrast stretching to raw MRI scans.',
        'Deep Residual Network architecture leverages skip connections to eliminate vanishing gradient degradations in deep layers.',
        'Trained using cross-entropy loss with Adam optimizer and learning rate decay scheduling.',
        'Comprehensive evaluation outputting class-wise precision, recall, and ROC-AUC curves.'
      ],
      highlights: [
        'Mitigates false negatives in critical glioma vs meningioma distinction.',
        'High diagnostic confidence scores verified against public medical MRI datasets.',
        'Modular architecture ready for PACS/DICOM clinical integrations.'
      ]
    },
    'nexora': {
      title: '🤖 Nexora Electronics AI Customer Support',
      tagline: 'Autonomous Multimodal Support Ecosystem for Electronics Retail',
      tech: ['JavaScript', 'Node.js', 'Express', 'Python', 'HTML5', 'CSS3'],
      repo: 'https://github.com/durg-giri123/Nexora-Electronics-AI-Customer-Support',
      architecture: [
        'Multi-stage intent parser classifies customer queries into order tracking, device troubleshooting, and warranty claims.',
        'Contextual state machine maintains conversation history across multi-turn interactions.',
        'Lightweight knowledge ingestion engine parses PDF manuals and warranty documents for instant answers.',
        'Automated escalation protocol gracefully routes unresolved edge cases to human support tickets.'
      ],
      highlights: [
        'Reduced query resolution turnaround for common technical questions.',
        'Clean, responsive chat UI featuring instant typing indicators and markdown rendering.',
        'Decoupled Node.js backend architecture with RESTful endpoints.'
      ]
    },
    'traffic': {
      title: '🚦 Smart Traffic Intelligence System',
      tagline: 'Real-Time Vision-Based Vehicle Density and Congestion Tracking',
      tech: ['Python', 'OpenCV', 'Computer Vision', 'Data Analytics'],
      repo: 'https://github.com/durg-giri123/smart-traffic-intelligence',
      architecture: [
        'Background subtraction and optical flow algorithms isolate moving vehicles from surveillance video feeds.',
        'Centroid tracking assigns unique IDs to calculate per-lane vehicle counts and transit velocities.',
        'Density estimation algorithm correlates spatial occupancy with threshold saturation limits.',
        'Generates automated traffic anomaly alerts and visual heatmaps for municipal signal timing optimization.'
      ],
      highlights: [
        'Reliable tracking under varied lighting and weather conditions.',
        'Per-lane throughput analytics without invasive inductive road loops.',
        'Modular stream ingestion compatible with RTSP security camera feeds.'
      ]
    },
    'shl-rag': {
      title: '📚 SHL Assessment RAG Pipeline',
      tagline: 'Objective Evaluation Engine via Semantic Retrieval & Rubric Grounding',
      tech: ['Python', 'LangChain', 'RAG', 'Vector Search', 'Embeddings'],
      repo: 'https://github.com/durg-giri123/shl-assessment-rag',
      architecture: [
        'Chunks candidate assessment answers and official evaluation rubrics using recursive character splitters.',
        'Generates high-dimensional semantic vector embeddings stored in a local vector index.',
        'Top-k cosine similarity retrieval extracts the most relevant rubric criteria for each candidate response.',
        'Prompt-engineered LLM evaluator checks for conceptual grounding, assigns scores, and generates actionable candidate feedback.'
      ],
      highlights: [
        'Guarded against hallucinations by strictly constraining evaluations to retrieved rubric criteria.',
        'Produces transparent, explainable score cards detailing evidence for every mark.',
        'Scales to batch assessment processing with automated summary reporting.'
      ]
    },
    'gemini-chat': {
      title: '💬 Gemini AI Multi-Turn Chatbot',
      tagline: 'Context-Aware Conversational Assistant Powered by Google Gemini API',
      tech: ['Google Gemini API', 'Java', 'JavaScript', 'HTML5', 'CSS3'],
      repo: 'https://github.com/durg-giri123/ChatBot-System-Powered-By-Gemini-Api',
      architecture: [
        'Direct asynchronous integration with Google Gemini Pro API for fast streaming token delivery.',
        'Maintains sliding-window conversation memory session on clientside/serverside to preserve context.',
        'Custom client renderer highlights syntax for code blocks, LaTeX expressions, and markdown structures.',
        'Mobile-first responsive frontend optimized for low-latency touch interaction.'
      ],
      highlights: [
        'Clean, modern dark-mode chat interface with instant feedback.',
        'Resilient error handling and connection retry logic.',
        'Context preservation across extended multi-turn brainstorming sessions.'
      ]
    },
    'tourism': {
      title: '🌍 Tourism Recommendation System',
      tagline: 'Hybrid Personalized Travel Destination & Itinerary Optimizer',
      tech: ['Python', 'Scikit-Learn', 'Pandas', 'Streamlit'],
      repo: 'https://github.com/durg-giri123/tourism-recommendation-system',
      architecture: [
        'Hybrid recommendation algorithm merging collaborative user-similarity matrices with content-based destination features.',
        'Dynamic multi-variable filtering incorporating user budget, trip duration, group type, and personal interests.',
        'Computes destination affinity ranking with cosine distance scoring.',
        'Interactive Streamlit UI plots day-by-day itineraries and geospatial landmarks.'
      ],
      highlights: [
        'Overcomes cold-start user hurdles through interest-profile weighting.',
        'Instant multi-filter recalculations with vectorized Pandas operations.',
        'Clean interactive visualization of destinations and budget breakdowns.'
      ]
    },
    'customer-review': {
      title: '🔍 Customer Review Insight Engine',
      tagline: 'Aspect-Based Sentiment Polarity & Defect Detection System',
      tech: ['Python', 'NLP', 'Scikit-Learn', 'Pandas', 'Docker'],
      repo: 'https://github.com/durg-giri123/customer-review-insight-engine',
      architecture: [
        'NLP text preprocessing pipeline including tokenization, stopword pruning, and lemmatization.',
        'TF-IDF and sentiment classifiers isolate aspect-specific satisfaction ratings (e.g. battery life, build quality, UI).',
        'Unsupervised clustering detects emerging product defects and negative complaint spikes.',
        'Containerized in Docker for reproducible deployment across cloud environments.'
      ],
      highlights: [
        'Granular sentiment breakdown rather than generic overall star ratings.',
        'Early anomaly warning detection for product quality control teams.',
        'Visual distribution charts and automated topic synthesis.'
      ]
    },
    'cricket-analytics': {
      title: '🏏 Real-Time Cricket Analytics Platform',
      tagline: 'Ball-by-Ball Match Telemetry, Player Strike Rates & Probability Models',
      tech: ['Python', 'Streamlit', 'MySQL', 'Pandas', 'REST APIs'],
      repo: 'https://github.com/durg-giri123/realtime-cricket-analytics',
      architecture: [
        'Real-time ingestion pipeline pulls live ball-by-ball commentary and telemetry from sports APIs.',
        'Normalized relational MySQL database architecture with indexed tables for matches, deliveries, and players.',
        'Vectorized Pandas data transformations compute instant player strike rates, boundary percentages, and wagon wheels.',
        'Interactive Streamlit analytics dashboard visualizes match momentum shifts and predictive outcomes.'
      ],
      highlights: [
        'Sub-second query performance across extensive historical match archives.',
        'Dynamic comparison tools between players and head-to-head teams.',
        'Intuitive match dashboard designed for sports analysts and enthusiasts.'
      ]
    }
  };

  const modalOverlay = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalTagline = document.getElementById('modal-tagline');
  const modalTech = document.getElementById('modal-tech');
  const modalArch = document.getElementById('modal-architecture');
  const modalHighlights = document.getElementById('modal-highlights');
  const modalRepoLink = document.getElementById('modal-repo-link');

  function openModal(projectId) {
    const data = projectDetails[projectId];
    if (!data || !modalOverlay) return;

    if (modalTitle) modalTitle.textContent = data.title;
    if (modalTagline) modalTagline.textContent = data.tagline;
    if (modalRepoLink) modalRepoLink.setAttribute('href', data.repo);

    if (modalTech) {
      modalTech.innerHTML = data.tech
        .map(
          (t) =>
            `<span class="badge-tag border-cyan-500/30 bg-cyan-950/40 text-cyan-300 font-mono">${t}</span>`
        )
        .join('');
    }

    if (modalArch) {
      modalArch.innerHTML = data.architecture
        .map(
          (step) =>
            `<li class="flex items-start gap-2.5 text-slate-300 text-sm leading-relaxed"><span class="text-cyan-400 mt-1 font-bold">▸</span> <span>${step}</span></li>`
        )
        .join('');
    }

    if (modalHighlights) {
      modalHighlights.innerHTML = data.highlights
        .map(
          (hl) =>
            `<li class="flex items-start gap-2.5 text-slate-300 text-sm leading-relaxed"><span class="text-emerald-400 mt-1 font-bold">✓</span> <span>${hl}</span></li>`
        )
        .join('');
    }

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.open-modal-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-project');
      if (id) openModal(id);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // 6. 1-Click Copy Email
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const emailVal = 'dg0504445@gmail.com';

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(emailVal).then(() => {
        const originalText = copyEmailBtn.innerHTML;
        copyEmailBtn.innerHTML = `
          <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
          <span class="text-emerald-300 font-semibold">Copied to Clipboard!</span>
        `;
        copyEmailBtn.classList.add('border-emerald-500/50', 'bg-emerald-500/10');

        setTimeout(() => {
          copyEmailBtn.innerHTML = originalText;
          copyEmailBtn.classList.remove('border-emerald-500/50', 'bg-emerald-500/10');
        }, 2500);
      });
    });
  }

  // 6.5. 1-Click Copy Phone
  const copyPhoneBtn = document.getElementById('copy-phone-btn');
  const phoneVal = '+919415806240';

  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(phoneVal).then(() => {
        const originalText = copyPhoneBtn.innerHTML;
        copyPhoneBtn.innerHTML = `
          <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
          <span class="text-emerald-300 font-semibold">Number Copied!</span>
        `;
        copyPhoneBtn.classList.add('border-emerald-500/50', 'bg-emerald-500/10');

        setTimeout(() => {
          copyPhoneBtn.innerHTML = originalText;
          copyPhoneBtn.classList.remove('border-emerald-500/50', 'bg-emerald-500/10');
        }, 2500);
      });
    });
  }

  // 7. Contact Form Handling
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name')?.value || 'Inquirer';
      const email = document.getElementById('form-email')?.value || '';
      const subject = document.getElementById('form-subject')?.value || 'Portfolio Collaboration Inquiry';
      const message = document.getElementById('form-message')?.value || '';

      const mailtoUrl = `mailto:dg0504445@gmail.com?subject=${encodeURIComponent(
        `[Portfolio] ${subject} - from ${name}`
      )}&body=${encodeURIComponent(
        `Hi Durgesh,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`
      )}`;

      window.location.href = mailtoUrl;

      if (formSuccess) {
        formSuccess.classList.remove('hidden');
        setTimeout(() => {
          formSuccess.classList.add('hidden');
        }, 5000);
      }
      contactForm.reset();
    });
  }
});
