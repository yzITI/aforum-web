<template>
  <div class="home">
    <img class="bg" src="bg.jpg" style="position: fixed; z-index: 0;">
    <section class="banner full">
      <div id="bubble" style="background: white;" @click="login">
        <h2>江苏省扬州中学</h2>
        <h1>数学在线讨论</h1>
        <p>点击进入</p>
      </div>
    </section>
    <section style="height: 100vh;">
      <div @click="jump" style="position: absolute; z-index: 100" class="full"></div>
      <iframe style="border: none;" class="full" src="http://www.yzzx.org/"></iframe>
    </section>
  </div>
</template>

<script setup>

async function login () {
  await new Promise((resolve, reject) => setTimeout(resolve, 500))
  if (window.sessionStorage.token) this.$router.push('/main')
  else window.location.href = 'https://cn.aauth.link/#/launch/o0Y5hrvbMd'
}

</script>

<style scoped>
.home {
  background-color: #111;
}
.full {
  min-height: 100vh;
  width: 100%;
}
section {
  position: relative;
  z-index: 10;
}
.banner {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
}
#bubble {
  width: 500px;
  height: 500px;
  padding: 50px 0px;
  border-radius: 250px;
  max-width: 70vw;
  max-height: 70vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex-wrap: nowrap;
  align-items: center;
  align-content: center;
  -webkit-animation-name: breath;
  -webkit-animation-duration: 3s;
  -webkit-animation-timing-function: ease-in-out;
  -webkit-animation-iteration-count: infinite;
  opacity: 0.96;
}
@-webkit-keyframes breath {
  from { box-shadow: 0 0 100px 0 #fff; }
  50%  { box-shadow: 0 0 30px 0 #fff; }
  to   { box-shadow: 0 0 100px 0 #fff; }
}
.bg {
  pointer-events: none;
  opacity: 0.7;
  object-fit: cover;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 0;
}
h1 {
  text-align: center;
  font-size: 3.5rem;
}
h2 {
  font-size: 1.8rem;
  color: #757575;
}
p {
  color: #757575;
}
.show {
  background-color: white;
  padding: 5vh 8%;
}
.links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
@media (max-width: 600px) {
  h1 {
    font-size: 9vw;
  }
  h2 {
    font-size: 5vw;
  }
}
</style>