<template>
    <span class="logo-area" @click="$router.push('/')">
        <span>D</span>
        <span>E</span>
        <span>M</span>
        <span>O</span>
        <span>O</span>
        <span>O</span>
    </span>
</template>
<script>
    export default {
        name: 'demo-logo'
    }
</script>
<style scoped>
    .logo-area {
        font-family: "Dressedless Three", sans-serif;
        font-weight: 500;
        font-size: 3.5rem;
        font-size: 28px;
        cursor: pointer;
        white-space: nowrap;
        overflow: hidden;
    }

    .logo-area span:nth-child(1) {
        color: #4286f3;
    }

    .logo-area span:nth-child(2),
    span:nth-child(5),
    span:nth-child(6) {
        color: #eb4537;
    }

    .logo-area span:nth-child(3) {
        color: #fac230;
    }

    .logo-area span:nth-child(4) {
        color: #55af7b;
    }
</style>