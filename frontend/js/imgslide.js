const imges = [
    "https://www.chf.or.kr/jnrepo/namo/img/images/000007/20210412011338151_6PMX7DW9.jpg",
    "https://www.chf.or.kr/jnrepo/namo/img/images/000001/night_star_occasion07.jpg",
    "https://www.chf.or.kr/jnrepo/namo/img/images/000001/occasion_main_img2.jpg",
    "https://www.chf.or.kr/jnrepo/namo/img/images/000001/royal_kitchen_occasion02.jpg"
];
const sentence = [
    {
        title:"생과방",
        content:"경복궁 소주방 전각에 위치한 ‘생과방’은 궁중의 육처소(六處所) 가운데 하나이며, ‘국왕과 왕비’의 후식과 별식을 준비하던 곳으로 ‘생물방’ 혹은 ‘생것방’이라고도 불렸습니다. 경복궁 생과방 프로그램은 조선왕조실록의 내용을 토대로 실제 임금이 먹었던 궁중병과와 궁중약차를 오늘날에도 즐길 수 있도록 구성된 유료 체험 프로그램 입니다. 생과방 내부에 위치한 호궤소에서 궁중병과와 궁중약차 메뉴를 직접 선택한 후 안내에 따라 궁중다과를 시식·체험할 수 있습니다."
    },
    {
        title:"경복궁 별빛야행",
        content:"경복궁 소주방에서 전통국악공연을 즐기며 임금님의 수라상을 맛보고, 전문가의 해설을 들으며 경복궁 후원으로의 아름다운 야행을 시작합니다. 건천궁·향원정에 이르기까지 경복궁 별빛야행에서만 허락된 경복궁 후원으로의 발걸음은 고궁의 고즈넉함을 온전히 느끼며, 경복궁만이 지닌 새로운 아름다움을 경험하는 특별한 감동을 선사할 것입니다."
    },
    {
        title:"창덕궁 별빛야행",
        content:"창덕궁 달빛기행은 은은 달빛아래 녹음이 어우러진 창덕궁에서 전문해설사와 함께 궁궐의 곳곳을 관람하며, 각 전각에 대한 해설과 전통예술공연을 관람할 수 있는 프로그램입니다. 창덕궁 정문인 돈화문에서 출발해 진선문 · 인정전 · 낙선재 · 상량정 · 부용지 · 불로문 · 존덕정&관람지 · 연경당 · 후원 숲길을 이동하며 창덕궁 달빛기행에서만 경험할 수 있는 특별한 감동을 선사할 것입니다."
    },
    {
        title:"수라간 시식공감",
        content:"‘시식공감’은 궁중 문화를 보고 먹고 즐기고 감동한다는 視(공간), 食(음식), 公(공연), 感(감동)을 주제로 궁중음식문화를 직접 체험해보는 전통문화 복합체험 프로그램입니다.  시식공감은 ‘식도락x시식공감’과 ‘궁캉스’(궁에서 즐기는 슬기로운 여름, 가을나기) 프로그램으로 구성되어 있습니다."
    }
]
/* title content 초기값 지정*/ 
const title = document.querySelector(".third-section__slides--tilte");
const content = document.querySelector(".third-section__slides--sentence");
chosenSentence=sentence[0];
title.innerHTML = chosenSentence.title;
content.innerText = chosenSentence.content;
title.style.fontSize=3.5+"em"
content.style.fontSize=1.5+"em"
/* img 초기값 지정 */
const imgLength = imges.length;
let count = 0;
let chosenImage = imges[0];
let pgImage = document.createElement("img");
const slide=document.querySelector(".third-section__slides");
pgImage.src = `${chosenImage}`;
slide.appendChild(pgImage);

const prevClick = document.querySelector(".prev");
const nextClick = document.querySelector(".next");

prevClick.addEventListener("click",function(){changeImg(-1)});
nextClick.addEventListener("click",function(){changeImg(1)});

function changeImg(n){
    count += n;
    if(count>=imgLength){
        count=0;
    }
    else if(count<0){
        count=imgLength-1;
    }
    chosenImage = imges[count];
    pgImage.src = `${chosenImage}`;
    chosenSentence=sentence[count];
    title.innerHTML = chosenSentence.title;
    content.innerText = chosenSentence.content;
}