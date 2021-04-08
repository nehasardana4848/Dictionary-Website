let input=document.querySelector('#input');
let searchBtn=document.querySelector('#search');
let notFound=document.querySelector('.not__found');
let defBox=document.querySelector('.def');
let audioBox=document.querySelector('.audio');
let Loading=document.querySelector('.loading');
let apiKey='##';
searchBtn.addEventListener('click',function(e){
    e.preventDefault();
    //GET INPUT DATA
    audioBox.innerHTML='';
    notFound.innerText='';
    defBox.innerText='';
    let word=input.value;
    if(word==='')
    {
        alert('Word is required');
        return;
    }
    getData(word);
    //CALL Api get data

})
async function getData(word){
    Loading.style.display='block';
  const response=  await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`);
  const data= await response.json();
  if(!data.length){
    Loading.style.display='none';
      notFound.innerText='No result Found';
      return;
  }
  if(typeof data[0]=== 'string'){
    Loading.style.display='none';
      let heading=document.createElement('h3');
      heading.innerText=' Did you mean? '
      notFound.appendChild(heading);
      data.forEach(element => {
          let suggetion = document.createElement('span');
          suggetion.classList.add('suggested');
          suggetion.innerText=element;
          notFound.appendChild(suggetion);
      })
      return;
  }
  Loading.style.display='block';
  Loading.style.display='none';
  let defination =data[0].shortdef[0];
  defBox.innerText=defination;
  const soundName=data[0].hwi.prs[0].sound.audio;
  if(soundName){
      renderSound(soundName);
  }
  console.log(data);
}
function renderSound(soundName){
    let subfolder=soundName.charAt(0);
    let soundSrc=`https://media.merriam-webster.com/soundc11/${subfolder}/${soundName}.wav?key=${apiKey}`;
    let aud=document.createElement('audio');
    aud.src=soundSrc;
    aud.controls=true;
    audioBox.appendChild(aud);
}
