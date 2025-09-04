// LOGIN
function checkLogin(){
  const user = document.getElementById('userid').value.trim();
  const pass = document.getElementById('password').value.trim();
  if(user === 'My Adhiiiii' && pass === 'Nikitha'){
    sessionStorage.setItem('isLoggedIn','1');
    window.location.href='home.html';
  }else{
    document.getElementById('error').textContent='Try again Sweetee 💖';
  }
}

// Hearts everywhere
(function hearts(){
  const c = document.getElementById('hearts'); if(!c) return;
  setInterval(()=>{
    const h=document.createElement('div');
    h.className='heart';
    h.style.left=Math.random()*100+'vw';
    h.style.animationDuration=(5+Math.random()*6)+'s';
    c.appendChild(h);
    setTimeout(()=>h.remove(),9000);
  },450);
})();

// Popup open/close
window.openLetter = function(id){ 
  const p = document.getElementById('letterPopup');
  if(p) p.style.display='block';
  // firebase.js will handle loading content and replies
}
window.closeLetter = function(){ 
  const p = document.getElementById('letterPopup');
  if(p) p.style.display='none';
}
