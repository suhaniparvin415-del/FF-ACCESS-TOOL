const input=document.getElementById('input');
const processBtn=document.getElementById('processBtn');
const output=document.getElementById('output');
const status=document.getElementById('status');
const copyBtn=document.getElementById('copyBtn');

processBtn.addEventListener('click',()=>{
  const value=input.value.trim();
  if(!value){ showStatus('Please enter a URL first.'); return; }
  try{
    const url=new URL(value);
    if(!['http:','https:'].includes(url.protocol)) throw new Error();
    showStatus('Processing your authorized URL…');
    processBtn.disabled=true;
    copyBtn.disabled=true;
    setTimeout(()=>{
      const safeResult={
        source:url.origin,
        path:url.pathname || '/',
        message:'Demo processed successfully.',
        note:'No authentication credentials or access tokens were collected.'
      };
      output.textContent=JSON.stringify(safeResult,null,2);
      copyBtn.disabled=false;
      showStatus('Done.');
      processBtn.disabled=false;
    },700);
  }catch{
    showStatus('Please enter a valid http:// or https:// URL.');
  }
});

function showStatus(message){
  status.textContent=message;
  status.classList.remove('hidden');
}

copyBtn.addEventListener('click',async()=>{
  try{
    await navigator.clipboard.writeText(output.textContent);
    showStatus('Result copied to clipboard.');
  }catch{
    showStatus('Copy failed. Please select and copy the result manually.');
  }
});
