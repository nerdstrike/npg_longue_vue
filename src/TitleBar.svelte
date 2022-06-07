<script>
    import instituteLogo from "/static/sanger-logo.png";
    import qcLogo from "/static/placeholder-logo.png"
</script>

<div id="title" class="nav">
    <img src={instituteLogo} alt="Sanger logo"/>
    <img src={qcLogo} alt="LRQC logo"/>

    <div class="right">Login placeholder</div>
</div>

<style>
    .nav {
        width: 100%;
        height: 80px;
    }
    .right {
        position: absolute;
        top: 0%;
        right: 0%;
        padding: 15px;
    }
</style>