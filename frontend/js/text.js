document.addEventListener("DOMContentLoaded", function () {
   new TypeIt(".page", {
      loop:true,
      speed:200,
      cursor: true,
      lifeLike: true,
      deleteSpeed: 150,
   }).pause(1000).go();
 });
