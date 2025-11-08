document.getElementById('regForm').addEventListener('submit', e=>{
  e.preventDefault();
  const name=document.getElementById('name').value.trim();
  const email=document.getElementById('email').value.trim();
  const phone=document.getElementById('phone').value.trim();
  const password=document.getElementById('password').value;
  // basic check
  if(!name||!email||!password){ toast('Fill required fields'); return; }
  const users = JSON.parse(localStorage.getItem('hms_users')||'[]');
  if(users.find(u=>u.email===email)){ toast('Email already registered'); return; }
  users.push({id: uid(), name, email, phone, password});
  localStorage.setItem('hms_users', JSON.stringify(users));
  toast('Account created — please login');
  setTimeout(()=> location.href='login.html', 1100);
});