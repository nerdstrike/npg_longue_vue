<script>
    import QcView from './QcView.svelte';

    import { onMount } from 'svelte';
    import { runCollection, focusRun } from './stores/run_store';
    import LangQc from './langQc';

    export let host;

    let hideError = true;
    let errorMessage = null;
    let serviceClient = null;

    onMount(() => {
        serviceClient = new LangQc(host);
        try {
            let data = serviceClient.getInboxPromise(host);
            data.then(value => runCollection.set(value));
        } catch (error) {
            console.log("Stuff went wrong");
            errorMessage = error;
            hideError = false;
        }
    });

    function loadWell(event) {
        let run_name = event.target.parentElement.parentElement.id;
        let well = event.target.id;

        let response = serviceClient.getRunWellPromise(run_name, well);
        // handle errors, then:
        response.then(value => focusRun.set(value));
    }

    function claimWell(event) {
        let run_name = event.target.parentElement.parentElement.id;
        let well = event.target.id;
        serviceClient.claimWell(run_name, well);

        // turn on QC interface on successful claim
    }
</script>


<h2>Most Recent Runs</h2>

<table>
<tr>
    <th>Run name</th>
    <th>Wells</th>
    <th>Time started</th>
    <th>Time completed</th>
</tr>
    {#each $runCollection as run}
        <tr id={run.run_name}>
            <td>{run.run_name}</td>
            <td>
                {#each run.wells as {label, start, complete}}
                <button id={label} on:click={loadWell}>{label}</button>
                {/each}
            </td>
            <td>{run.time_start}</td>
            <td>{run.time_complete ? run.time_complete : ''}</td>
        </tr>
    {/each}
</table>
<div id="errorbox" class="badnews" hidden={hideError}>{errorMessage}</div>

<QcView run={$focusRun}/>

<style>
    table {
        border: 1px solid;
        border-radius: 5px;
    }
    tr:nth-child(even) {background-color: #a2a2a2;}
    tr:hover {background-color: #ddd;}
    th {
        font-weight: bold;
        background-color: #9292ff
    }

    .badnews {
        font-size: medium;
        font-weight: bold;
        background-color: darkred;
        border: 1px;
        border-color: black;
        position: relative;
        bottom: 10%;
    }
</style>