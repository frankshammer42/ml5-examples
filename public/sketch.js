
const s = ( sketch ) => {

  let x = 100;
  let y = 100;
  let canvas;

  sketch.setup = () => {
    canvas = sketch.createCanvas(sketch.displayWidth, sketch.displayHeight);
  };

  sketch.draw = () => {
    sketch.background(200);
    sketch.fill(255);
    sketch.rect(sketch.mouseX, sketch.mouseY,50,50);
  };
};

let data;
const $main = document.querySelector('.main');
const $search = document.querySelector('.header-search__input');

async function init(){

  data = await fetch('../examples.json');
  data = await data.json();

  // initialize with all sections
  createSections(data);

  // p5 sketch
  // let myp5 = new p5(s, 'myCanvas');
}

init();

function createExampleList(_example, _sectionDiv, _sectionTitle, _exampleKey){
  const weList = document.createElement("ul");
    weList.classList.add(`section-list`);

    if(_example[_exampleKey]){
      _example[_exampleKey].forEach( item => {
        const li = document.createElement('li');
        li.classList.add('section-list__item');
        li.innerHTML = `<a href="${item.url}">${item.name}</a>`;
        weList.appendChild(li);
      })

      const weHeader = document.createElement('h3');
      weHeader.classList.add('section-list__title');
      weHeader.textContent = _sectionTitle ;
      _sectionDiv.appendChild( weHeader )
      _sectionDiv.appendChild(weList);
    }
    
}

function createSections(data){
  $main.innerHTML = '';
  Object.keys(data).forEach(k => {
    const example = data[k];

    const sectionDiv = document.createElement('section');
    sectionDiv.classList.add(`section`);
    sectionDiv.classList.add(`section-${k.toLowerCase()}`);
    
    // add a header
    const header = document.createElement("h2");
    header.classList.add(`section-header`);
    header.textContent = k;
    sectionDiv.appendChild(header);

    createExampleList(example, sectionDiv, 'p5.js web editor', 'p5webeditor');
    createExampleList(example, sectionDiv, 'p5.js demo', 'p5js');
    createExampleList(example, sectionDiv, 'plain javascript demo', 'javascript');
    createExampleList(example, sectionDiv, 'd3', 'd3');
    
    $main.appendChild(sectionDiv)
  })
}

$search.addEventListener('keyup', (e) =>{
  const val = e.target.value;
  
  let dataCopy = Object.assign({}, data);
  if(val.trim() === ""){
    createSections(dataCopy);
  } else {
    
    Object.keys(dataCopy).forEach(k => {
      if(!k.toLowerCase().includes(val.toLowerCase())){
        delete dataCopy[k];
      }
    });
    createSections(dataCopy);
  }
})