/* ============================================================
   FATHOM BLUE — main.js
   ============================================================ */

/* ---------- Supabase Config ---------- */
const SUPABASE_URL = 'https://jndfzjbixgxytbufqsgd.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpuZGZ6amJpeGd4eXRidWZxc2dkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2NDA3MzgsImV4cCI6MjA5MTIxNjczOH0.e1WKymgmWVk9XFyENZSJbRuremyVipigHzkKo1HSme0'

/* ---------- Waitlist Submit ---------- */
async function submitWaitlist(email) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify({ email, source: 'website' })
  })

  if (res.status === 409) {
    return { success: false, duplicate: true }
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    if (error.code === '23505' || (error.message && error.message.includes('duplicate'))) {
      return { success: false, duplicate: true }
    }
    return { success: false, duplicate: false }
  }

  return { success: true }
}

/* ---------- Waitlist Unsubscribe ---------- */
// Returns true if a row was deleted, false if no row matched the token
async function unsubscribeWaitlist(token) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/unsubscribe_waitlist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
    },
    body: JSON.stringify({ p_token: token })
  })

  if (!res.ok) {
    throw new Error(`Unsubscribe failed with status ${res.status}`)
  }

  return (await res.json()) === true
}

/* ---------- Show inline form message ---------- */
function showMessage(type, text) {
  const colours = { success: '#00C8D4', duplicate: '#FF6B35', error: '#FF4444' }
  let msg = document.getElementById('waitlistMessage')
  if (!msg) {
    msg = document.createElement('p')
    msg.id = 'waitlistMessage'
    msg.style.cssText = 'margin-top:12px; font-size:15px; font-weight:500; transition:color 0.2s;'
    const form = document.getElementById('waitlistForm')
    form.insertAdjacentElement('afterend', msg)
  }
  msg.style.color = colours[type] || colours.error
  msg.textContent = text
}

/* ============================================================
   DOM READY
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. Sticky nav + background on scroll ---------- */
  const nav = document.getElementById('nav')

  const updateNav = () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled')
    } else {
      nav.classList.remove('scrolled')
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true })
  updateNav()

  /* ---------- 2. Smooth scroll for anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const targetId = anchor.getAttribute('href')
      if (targetId === '#') return
      const target = document.querySelector(targetId)
      if (!target) return
      e.preventDefault()
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      // Close mobile menu if open
      closeMobileMenu()
    })
  })

  /* ---------- 3. Hamburger / Mobile menu ---------- */
  const hamburger = document.getElementById('hamburger')
  const mobileMenu = document.getElementById('mobileMenu')

  function openMobileMenu() {
    hamburger.classList.add('open')
    hamburger.setAttribute('aria-expanded', 'true')
    mobileMenu.classList.add('open')
    document.body.style.overflow = 'hidden'
  }

  function closeMobileMenu() {
    hamburger.classList.remove('open')
    hamburger.setAttribute('aria-expanded', 'false')
    mobileMenu.classList.remove('open')
    document.body.style.overflow = ''
  }

  hamburger.addEventListener('click', () => {
    if (mobileMenu.classList.contains('open')) {
      closeMobileMenu()
    } else {
      openMobileMenu()
    }
  })

  // Close on mobile link click
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', closeMobileMenu)
  })

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMobileMenu()
    }
  })

  /* ---------- 4. Intersection Observer — scroll fade-in ---------- */
  const fadeEls = document.querySelectorAll('.fade-in')

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        observer.unobserve(entry.target)
      }
    })
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  })

  fadeEls.forEach(el => observer.observe(el))

  /* ---------- 5. Hero particle canvas ---------- */
  initParticles()

  /* ---------- 6. Waitlist form ---------- */
  const waitlistForm = document.getElementById('waitlistForm')
  const waitlistSuccess = document.getElementById('waitlistSuccess')
  const emailInput = document.getElementById('waitlistEmail')

  if (waitlistForm) {
    waitlistForm.addEventListener('submit', async e => {
      e.preventDefault()

      const email = emailInput.value.trim()
      if (!email || !isValidEmail(email)) {
        emailInput.style.borderColor = 'var(--orange)'
        emailInput.focus()
        return
      }

      emailInput.style.borderColor = ''
      const submitBtn = waitlistForm.querySelector('button[type="submit"]')
      const originalText = submitBtn.textContent
      submitBtn.textContent = 'Joining…'
      submitBtn.disabled = true

      try {
        const result = await submitWaitlist(email)
        if (result.success) {
          waitlistForm.style.display = 'none'
          waitlistSuccess.classList.add('show')
          waitlistSuccess.classList.add('visible')
        } else if (result.duplicate) {
          showMessage('duplicate', "You're already on the list! We'll see you at launch 🌊")
          submitBtn.textContent = originalText
          submitBtn.disabled = false
        } else {
          showMessage('error', 'Something went wrong. Please try again or email hello@fathomblueco.com')
          submitBtn.textContent = originalText
          submitBtn.disabled = false
        }
      } catch {
        showMessage('error', 'Network error. Please check your connection and try again.')
        submitBtn.textContent = originalText
        submitBtn.disabled = false
      }
    })

    emailInput.addEventListener('input', () => {
      emailInput.style.borderColor = ''
    })
  }

  /* ---------- 7. Unsubscribe page ---------- */
  const unsubscribeBtn = document.getElementById('unsubscribeBtn')
  const unsubscribeMessage = document.getElementById('unsubscribeMessage')

  if (unsubscribeBtn) {
    const colours = { success: '#00C8D4', warning: '#FF6B35', error: '#FF4444' }

    const showUnsubscribeMessage = (type, text) => {
      unsubscribeMessage.style.color = colours[type]
      unsubscribeMessage.textContent = text
    }

    const token = new URLSearchParams(window.location.search).get('token') || ''

    // Supabase is only called on click — email link scanners open links automatically
    if (!isValidUuid(token)) {
      unsubscribeBtn.style.display = 'none'
      showUnsubscribeMessage('warning', "This unsubscribe link looks incomplete. Please use the link in your email, or contact hello@fathomblueco.com and we'll remove you manually.")
    } else {
      unsubscribeBtn.addEventListener('click', async () => {
        const originalText = unsubscribeBtn.textContent
        unsubscribeBtn.textContent = 'Unsubscribing…'
        unsubscribeBtn.disabled = true

        try {
          const removed = await unsubscribeWaitlist(token)
          unsubscribeBtn.style.display = 'none'
          if (removed) {
            showUnsubscribeMessage('success', "You've been unsubscribed. Sorry to see you go — the ocean's always here if you want to come back 🌊")
          } else {
            showUnsubscribeMessage('warning', "This email is already unsubscribed or the link has expired. If you're still receiving emails, contact hello@fathomblueco.com")
          }
        } catch {
          showUnsubscribeMessage('error', 'Network error. Please check your connection and try again.')
          unsubscribeBtn.textContent = originalText
          unsubscribeBtn.disabled = false
        }
      })
    }
  }

})

/* ============================================================
   Utility: email validation
   ============================================================ */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/* ============================================================
   Utility: UUID validation (unsubscribe tokens)
   ============================================================ */
function isValidUuid(value) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value)
}

/* ============================================================
   Hero Particle Canvas
   ============================================================ */
function initParticles() {
  const canvas = document.getElementById('hero-canvas')
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  let particles = []
  let animId

  function resize() {
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
  }

  window.addEventListener('resize', resize, { passive: true })
  resize()

  class Particle {
    constructor() {
      this.reset()
    }

    reset() {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.radius = Math.random() * 1.5 + 0.5
      this.opacity = Math.random() * 0.4 + 0.1
      this.speedX = (Math.random() - 0.5) * 0.3
      this.speedY = (Math.random() - 0.5) * 0.3
      this.life = 0
      this.maxLife = Math.random() * 300 + 100
    }

    update() {
      this.x += this.speedX
      this.y += this.speedY
      this.life++

      const progress = this.life / this.maxLife
      if (progress < 0.1) {
        this.currentOpacity = this.opacity * (progress / 0.1)
      } else if (progress > 0.8) {
        this.currentOpacity = this.opacity * (1 - (progress - 0.8) / 0.2)
      } else {
        this.currentOpacity = this.opacity
      }

      if (this.life >= this.maxLife) this.reset()
    }

    draw() {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(0, 200, 212, ${this.currentOpacity})`
      ctx.fill()
    }
  }

  const PARTICLE_COUNT = 60

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = new Particle()
    p.life = Math.floor(Math.random() * p.maxLife)
    particles.push(p)
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    particles.forEach(p => { p.update(); p.draw() })
    animId = requestAnimationFrame(animate)
  }

  animate()

  // Pause animation when hero is not visible (performance)
  const heroSection = document.getElementById('home')
  if (heroSection && 'IntersectionObserver' in window) {
    const visibilityObserver = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        if (!animId) animate()
      } else {
        cancelAnimationFrame(animId)
        animId = null
      }
    }, { threshold: 0 })
    visibilityObserver.observe(heroSection)
  }
}
