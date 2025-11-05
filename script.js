// script.js
// Arabic comments explain how to edit (inside code) so you can change easily.

// Scary Intro Screen Functionality
document.addEventListener('DOMContentLoaded', function() {
  const scaryIntro = document.getElementById('scary-intro');
  const enterButton = document.getElementById('enter-site');
  
  // Play a scary sound when the page loads (optional)
  // const scarySound = new Audio('scary-sound.mp3');
  // scarySound.play().catch(e => console.log("Audio play prevented by browser policies"));
  
  enterButton.addEventListener('click', function() {
    // Add a dramatic pause before hiding
    setTimeout(function() {
      scaryIntro.classList.add('hidden');
      
      // Resume any paused animations or media
      const videos = document.querySelectorAll('video');
      videos.forEach(video => {
        if (video.paused) {
          video.play().catch(e => console.log("Video play prevented by browser policies"));
        }
      });
      
      // Resume audio if it exists
      const audio = document.querySelector('audio');
      if (audio) {
        audio.play().catch(e => console.log("Audio play prevented by browser policies"));
      }
    }, 500);
  });
});

// ========== Tubes Cursor 3D Effect ==========
import('https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js')
  .then(module => {
    const TubesCursor = module.default;
    const app = TubesCursor(document.getElementById('canvas'), {
      tubes: {
        colors: ["#f967fb", "#53bc28", "#6958d5"],
        lights: {
          intensity: 200,
          colors: ["#83f36e", "#fe8a2e", "#ff008a", "#60aed5"]
        }
      }
    });

    // Change colors on click
    document.body.addEventListener('click', () => {
      const colors = randomColors(3);
      const lightsColors = randomColors(4);
      console.log('New colors:', colors, lightsColors);
      app.tubes.setColors(colors);
      app.tubes.setLightsColors(lightsColors);
    });

    function randomColors(count) {
      return new Array(count)
        .fill(0)
        .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
    }
  })
  .catch(err => console.error('Tubes Cursor failed to load:', err));

// ========== Particles (RGB stars) ==========
particlesJS('particles-js', {
  particles: {
    number: { value: 120 },
    color: { value: '#ADD8E6' },
    shape: { type: 'circle' },
    opacity: { value: 0.8 },
    size: { value: 3 },
    line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.35, width: 1 },
    move: { enable: true, speed: 1.6, random: true, out_mode: 'out' }
  }
});

// Fetch Discord server icon automatically when hosted
(function(){
  const inviteEl = document.getElementById('invite-link');
  const serverImg = document.getElementById('server-icon');
  const serverName = document.getElementById('server-name');
  if(!inviteEl) return;
  const invite = inviteEl.getAttribute('href');
  if(!invite || invite.includes('yourcode')) return;
  const code = invite.replace(/^(https?:\/\/)?(www\.)?(discord\.gg|discord\.com)\/(invite\/)?/i,'').split(/[?#]/)[0];
  if(!code) return;
  fetch(`https://discord.com/api/v9/invites/${code}?with_counts=true`).then(r=>r.json()).then(data=>{
    if(data.guild && data.guild.icon){
      serverImg.src = `https://cdn.discordapp.com/icons/${data.guild.id}/${data.guild.icon}.png?size=128`;
      serverImg.style.display='block';
      serverName.textContent = data.guild.name || 'My Server';
    }
  }).catch(()=>{});
})();

// Set audio volume and autoplay handling
const bgAudio = document.querySelector('audio');
if(bgAudio){ 
  bgAudio.volume = 0.6; 
  
  // Attempt to autoplay audio on page load
  window.addEventListener('load', () => {
    // Try to play audio immediately
    const playPromise = bgAudio.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log('Audio autoplay successful');
        })
        .catch(error => {
          console.log('Autoplay prevented by browser policy, attempting workaround');
          
          // Workaround: Try to play after a small delay
          setTimeout(() => {
            bgAudio.play().then(() => {
              console.log('Audio autoplay successful after delay');
            }).catch(error => {
              console.log('Autoplay still blocked, waiting for user interaction');
              
              // Final fallback: Show a play button for user interaction
              showPlayButton();
            });
          }, 1000);
        });
    }
  });
  
  // Handle user interaction to unlock audio
  document.body.addEventListener('click', function initAudio() {
    bgAudio.play().then(() => {
      console.log('Audio unlocked and playing');
    }).catch(error => {
      console.log('Failed to play audio:', error);
    });
    
    // Remove the event listener after first interaction
    document.body.removeEventListener('click', initAudio);
  }, { once: true });
  
  bgAudio.addEventListener('play', ()=>console.log('Audio playing')); 
}

// Function to handle the L|S forums button click
document.addEventListener('DOMContentLoaded', function() {
  const forumButton = document.querySelector('.custom-button');
  if (forumButton) {
    forumButton.addEventListener('click', function() {
      // You can change this URL to your actual forums link
      window.open('https://example.com/forums', '_blank');
    });
  }
});

// Function to show a play button if autoplay fails
function showPlayButton() {
  // Create a floating play button
  const playButton = document.createElement('div');
  playButton.innerHTML = '▶️ Play Music';
  playButton.style.position = 'fixed';
  playButton.style.bottom = '20px';
  playButton.style.right = '20px';
  playButton.style.zIndex = '1000';
  playButton.style.backgroundColor = '#ff61a6';
  playButton.style.color = 'white';
  playButton.style.padding = '10px 20px';
  playButton.style.borderRadius = '30px';
  playButton.style.cursor = 'pointer';
  playButton.style.fontWeight = 'bold';
  playButton.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
  
  playButton.addEventListener('click', () => {
    bgAudio.play();
    playButton.remove();
  });
  
  document.body.appendChild(playButton);
  
  // Auto-hide the button after 10 seconds
  setTimeout(() => {
    if (playButton.parentNode) {
      playButton.remove();
    }
  }, 10000);
}