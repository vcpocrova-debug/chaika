const burger = document.getElementById('burger');
const menu = document.getElementById('mobileMenu');
burger.addEventListener('click', () => menu.classList.toggle('open'));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));

const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// Carousel controls
const carousel = document.getElementById('teamCarousel');
const prevBtn = document.getElementById('teamPrevBtn');
const nextBtn = document.getElementById('teamNextBtn');

if (carousel && prevBtn && nextBtn) {
  const scrollAmount = 320;
  prevBtn.addEventListener('click', () => carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' }));
  nextBtn.addEventListener('click', () => carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' }));
}

// All players list toggle and hover logic
const toggleBtn = document.getElementById('toggleAllPlayersBtn');
const teamList = document.getElementById('teamList');
const hoverImg = document.getElementById('hoverPlayerImg');

if (toggleBtn && teamList) {
  let listPopulated = false;

  toggleBtn.addEventListener('click', () => {
    const isOpen = teamList.classList.toggle('open');
    toggleBtn.innerText = isOpen ? 'Сховати список' : 'Відкрити всіх гравців';
    
    const carouselWrap = document.querySelector('.team-carousel-wrap');
    if (carouselWrap) {
      carouselWrap.style.display = isOpen ? 'none' : 'block';
    }

    if (isOpen && !listPopulated) {
      const players = document.querySelectorAll('.team-carousel .player');
      players.forEach(p => {
        const name = p.querySelector('h3').textContent;
        const num = p.querySelector('.num').textContent;
        const pos = p.querySelector('.player-info span').textContent;
        const imgEl = p.querySelector('img');
        const imgSrc = imgEl ? imgEl.src : '';

        const row = document.createElement('div');
        row.className = 'player-row';

        const numSpan = document.createElement('span');
        numSpan.className = 'row-num';
        numSpan.textContent = num;
        row.appendChild(numSpan);

        if (imgSrc && !imgSrc.includes('000')) {
          const avatarImg = document.createElement('img');
          avatarImg.src = imgSrc;
          avatarImg.className = 'row-avatar';
          avatarImg.alt = '';
          row.appendChild(avatarImg);
        } else {
          const emptyDiv = document.createElement('div');
          emptyDiv.className = 'row-avatar empty-avatar';
          row.appendChild(emptyDiv);
        }

        const nameSpan = document.createElement('span');
        nameSpan.className = 'row-name';
        nameSpan.textContent = name;
        row.appendChild(nameSpan);

        const posSpan = document.createElement('span');
        posSpan.className = 'row-pos';
        posSpan.textContent = pos;
        row.appendChild(posSpan);

        if (imgSrc) {
          const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
          if (isDesktop) {
            row.addEventListener('mouseenter', () => {
              hoverImg.src = imgSrc;
              hoverImg.style.display = 'block';
            });
            row.addEventListener('mousemove', (e) => {
              hoverImg.style.left = e.clientX + 15 + 'px';
              hoverImg.style.top = e.clientY + 15 + 'px';
            });
            row.addEventListener('mouseleave', () => {
              hoverImg.style.display = 'none';
            });
          } else {
            row.style.flexWrap = 'wrap';
            const mobileImg = document.createElement('img');
            mobileImg.src = imgSrc;
            mobileImg.className = 'mobile-row-img';
            row.appendChild(mobileImg);
            
            row.addEventListener('click', () => {
              const isCurrentlyShow = mobileImg.classList.contains('show');
              document.querySelectorAll('.mobile-row-img.show').forEach(img => img.classList.remove('show'));
              if (!isCurrentlyShow) {
                mobileImg.classList.add('show');
              }
            });
          }
        }
        teamList.appendChild(row);
      });
      listPopulated = true;
    }
  });
}
