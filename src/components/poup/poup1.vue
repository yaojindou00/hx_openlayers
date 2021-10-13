<template>

 <div  class="popup-content" v-if="$pValue">
    <span>{{$pValue.name}}</span>
     <span>{{$pValue.type}}</span>
 </div> 
  
</template>


<script>
export default {
  components: {
   
  },
  mounted(){
    console.log(this.$pValue)
  }
}
</script>
<style>
.popup-content{
  /* width: 1000px;
  height: 500px; */
}
</style>