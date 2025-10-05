// Create floating particles
function createParticles() {
  const particlesContainer = document.getElementById('particles');
  const particlesCount = 30;
  
  for (let i = 0; i < particlesCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    const size = Math.random() * 20 + 5;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    
    particlesContainer.appendChild(particle);
  }
}

// Calculate age function
function calculateAge() {
  const dobInput = document.getElementById('dob').value;
  
  if (!dobInput) {
    alert('Please select your date of birth');
    return;
  }
  
  const dob = new Date(dobInput);
  const today = new Date();
  
  if (dob > today) {
    alert('Please select a date in the past');
    return;
  }
  
  let ageYears = today.getFullYear() - dob.getFullYear();
  let ageMonths = today.getMonth() - dob.getMonth();
  let ageDays = today.getDate() - dob.getDate();
  
  if (ageDays < 0) {
    ageMonths--;
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    ageDays += lastMonth.getDate();
  }
  
  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }
  
  animateValue('years-value', 0, ageYears, 1000);
  animateValue('months-value', 0, ageMonths, 1000);
  animateValue('days-value', 0, ageDays, 1000);
  
  calculateNextBirthday(dob);
  
  const resultsElement = document.getElementById('results');
  resultsElement.classList.remove('hidden');
  resultsElement.classList.add('fade-in');
}

// Animate counting up
function animateValue(id, start, end, duration) {
  const obj = document.getElementById(id);
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Calculate next birthday
function calculateNextBirthday(dob) {
  const today = new Date();
  const currentYear = today.getFullYear();
  
  let nextBirthday = new Date(currentYear, dob.getMonth(), dob.getDate());
  
  if (nextBirthday < today) {
    nextBirthday.setFullYear(currentYear + 1);
  }
  
  const diffTime = nextBirthday - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  animateValue('countdown-value', 0, diffDays, 1000);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  createParticles();
  
  document.getElementById('calculate-btn').addEventListener('click', calculateAge);
  
  document.getElementById('dob').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      calculateAge();
    }
  });
});