# 2022-1 한국외대 캡스톤 프로젝트


### '궁궐과 함께 인생 한 컷' 궁온 서비스
>이미지 처리 분야의 Deeplearning 기술을 이용하여 인물 사진과 궁궐 사진을 합성해주는 서비스  
<br/>

---

### 1. 프로젝트 소개


##### 추진배경

- 2022년 코로나19의 확산이 줄어들어 거리두기가 해제되었지만 여전히 바쁜 현대인들은 시간과 공간의 제약으로 인해 관광지 관람이 어렵다. 그래서 본 서비스는 사용자 사진과 궁궐 사진을 합성하여 추억으로 간직할 수 있게 기념사진을 만들어 사용자에게 제공해주는 서비스를 개발하게 되었다. 물론 포토샵으로 사진을 합성 할 수 있지만 본 서비스는 현재 유망한 딥러닝 기술을 이용하여 포토샵 보다 훨씬 정확한 인물사진 합성이 가능하다.

##### 프로젝트 목표

- 이미지에 있는 픽셀을 해당 클래스로 분류하는 Semantic Segmentation을 활용하여 인물 사진과 배경 사진을 합성한다.
- 다양한 Semantic Segmentation 모델을 사용하여 이미지 내부에 있는 객체를 분류하는 것을 목표로 한다.
- 인물과 배경을 합성하기 위해 사용자가 원하는 자리에 인물을 배치할 수 있도록 인터페이스를 설정한다.
- 각양각색의 궁궐 온라인 프로그램에 대해 소개하며 많은 사람에게 다양한 체험을 경험할 수 있게 한다.
- DB를 사용하여 로그인과 회원가입 기능을 이용해 회원 관리를 한다.

<br/>

---

### 2. 프로젝트 정보


##### 역할 분담

- 박태규(PM,FE) : 메인페이지, 궁궐과 인생 한 컷 페이지, 궁온 갤러리페이지 제작
- 김동현(FE) : 궁온 프로그램 소개, 로그인, 회원 가입페이지 제작
- 김영훈(BE) : 궁온 갤러리 서버 구축, 로그인 및 회원가입 서버 구축 
- 양재현(BE,DL) : 궁궐과 인생 한 컷 서버 구축, 이미지 합성 모델 제작(Sementic Segmantation)

##### 기술 스택

 - 프로그램 언어
 <br/> ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)  ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)  ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)  ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
 - 프레임 워크 
<br/> ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)  ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
 - DB
<br/>![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
- Hosting
<br/>![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)


##### 딥러닝

- Image Segmentation 모델 : DeepLabV3
- BackBone : Resnet-101

##### 흐름도
![image](https://user-images.githubusercontent.com/64758823/170308069-a946793c-1ace-4907-9bfd-c0b74276dbf0.png)


##### 화면 설계
![image](https://user-images.githubusercontent.com/64758823/170308013-f3a672b4-69c8-46a2-90fd-19333930ce8d.png)

<br/>

---

### 3. 프로젝트 결과물

1. 배경 선택 <br/> ![image](https://user-images.githubusercontent.com/64758823/170308142-039eacb6-531b-42c3-97f4-277a4cb18910.png)
2. 인물 사진 크기 및 위치 선택 <br/> ![image](https://user-images.githubusercontent.com/64758823/170308158-6075e95a-bf91-4622-b382-5883866534ee.png)
3. 인물 사진 업로드 <br/> ![image](https://user-images.githubusercontent.com/64758823/170308171-d41d2d84-7e33-4540-a054-04127748abfd.png)
4. 합성 결과물 다운로드 <br/> ![image](https://user-images.githubusercontent.com/64758823/170308188-bc5c8425-ecac-4d15-8590-09d10f87fdbc.png)
5. 궁온 갤러리 전시 <br/> ![image](https://user-images.githubusercontent.com/64758823/170308207-1bc2714f-57f3-48bd-8ce6-c219f7bc317d.png)
<br/>

---

### 4. 기대효과


- 시간과 공간의 제약을 받지 않고 궁궐 체험을 할 수 있 수 있다
- 비대면 온라인 서비스로 체험하고 나면 흥미를 높일 수 있어 직접 체험하기 위해 그곳으로 여행을 가는 사람들이 증가할 수 있다
- Semantic Segmentation을 활용해 배경과 인물을 합성하여 다양한 목적으로 사진을 남길 수 있다.
