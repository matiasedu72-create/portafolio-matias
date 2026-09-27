if(!matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:0.08});document.querySelectorAll('.steps article,.service-grid article,.reel').forEach(el=>{el.classList.add('reveal');observer.observe(el)});}

const inquiryForm=document.querySelector('.inquiry-form');
inquiryForm.addEventListener('submit',async event=>{
  event.preventDefault();
  const button=inquiryForm.querySelector('.inquiry-submit'),status=document.getElementById('form-status');
  if(button.disabled)return;
  for(const field of inquiryForm.querySelectorAll('input[required],textarea[required]')){field.value=field.value.trim();}
  if(!inquiryForm.reportValidity())return;
  if(inquiryForm.elements._honey.value){status.textContent='No se pudo enviar la consulta.';return;}
  if(!/^https?:$/.test(location.protocol)){status.textContent='Para enviar la consulta, abre el sitio desde una dirección web. El envío no está disponible desde un archivo local.';return;}
  button.disabled=true;button.textContent='Enviando…';inquiryForm.setAttribute('aria-busy','true');status.textContent='';
  const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),25000);
  try{
    const payload=Object.fromEntries(new FormData(inquiryForm));
    const response=await fetch(inquiryForm.action,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(payload),signal:controller.signal});
    const result=await response.json();
    if(/activat|confirm.*email|check.*email/i.test(result.message||'')){status.textContent='El formulario está pendiente de activación. Aún no podemos confirmar la entrega de tu consulta.';return;}
    if(!response.ok||!(result.success===true||result.success==='true'))throw new Error('Rejected');
    status.textContent='¡Gracias por tu mensaje! Recibí tu consulta y te responderé lo antes posible.';inquiryForm.reset();
  }catch(error){status.textContent=error.name==='AbortError'?'No pudimos confirmar el envío a tiempo. Tus datos se mantienen en el formulario.':'No se pudo confirmar el envío. Tus datos se mantienen; inténtalo nuevamente más tarde.';}
  finally{clearTimeout(timeout);button.disabled=false;button.textContent='Enviar consulta ↗';inquiryForm.removeAttribute('aria-busy');}
});
