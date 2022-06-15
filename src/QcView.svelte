<script>
    export let run = null;
    // See https://github.com/wtsi-npg/npg_langqc/blob/devel/lang_qc/mlwh/models.py#PacBioRunResponse

    function sortedMetrics(metrics) {
        return Object.entries(metrics).sort((a, b) => (a[0] ?? 0).toString().localeCompare((b[0] ?? 0).toString()));
        // See https://stackoverflow.com/a/69712388/3829437 - my kingdom for a <=>
    }

    let pacBioPort = "8243";
    function generateSmrtLink(metrics) {
        return `https://${metrics.sl_hostname}:${pacBioPort}/sl/run-qc/${metrics.sl_run_uuid}`
    }
</script>

{#if run !== null}
<h2>Metrics View</h2>

<div id="Top tier attributes of run">
    <table class="summary">
        <tr>
            <td>Run</td><td>{run.run_info.pac_bio_run_name}</td>
        </tr>
        <tr>
            <td>Well</td><td>{run.run_info.well.label}</td>
        </tr>
        <tr>
            <td>Study</td><td>{run.study.id}</td>
        </tr>
        <tr>
            <td>Sample</td><td>{run.sample.id}</td>
        </tr>
        <tr>
            <td>Last updated</td><td>{run.run_info.last_updated}</td>
        </tr>
    </table>
</div>

<a href={generateSmrtLink(run.metrics)}>View in SMRT&reg; Link</a>

<div id="Metrics">
    <table>
        <tr>
            <th>QC property</th>
            <th>Value</th>
        </tr>
        {#each sortedMetrics(run.metrics) as [k, v]}
        <tr>
            <td>{k}</td>
            <td>{v}</td>
        </tr>
        {/each}
    </table>
</div>
{/if}

<style>
    table {
        border: 1px solid;
        border-radius: 5px;
    }
    th {
        font-weight: bold;
        background-color: #9292ff
    }
    table.summary {
        border: 0px;
        font-weight: bold;
    }
</style>