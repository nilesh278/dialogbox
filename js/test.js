
function format ( d, owner, instanceId, projectId ) {
    // `d` is the original data object for the row
    var table = '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">';
    table = table + "<tr>";
    table = table + "<td>Snapshot ID:</td>";
    table = table + "<td><a href='#' onclick='loadSnapshotDetails("+ JSON.stringify(instanceId) +", "+ JSON.stringify(projectId) +", "+ JSON.stringify(d.id) +", "+ JSON.stringify(d.stream) +");'>" + d.id + "</td>";
    table = table + "</tr>";
    table = table + "<tr>";
    table = table + "<td>Component Owner/s:</td>";
    table = table + "<td>"+owner+"</td>";
    table = table + "</tr>";
    table = table + "</table>";
    return table;
}

function loadSnapshotDetails(instance, projectid, snapshotid, streamname) {
    instance = eval('(' + JSON.stringify(instance) + ')');
    projectId = eval('(' + JSON.stringify(projectid) + ')');
    snapshotId = eval('(' + JSON.stringify(snapshotid) + ')');
    streamname = eval('(' + JSON.stringify(streamname) + ')');

    $.ajax({
        method: "GET",
        url: "/issues/" + instance + "/" + projectid + "/" + snapshotid + "/" + streamname,
        success: function(response){
            scnData = response.scandata;
            console.log(scnData);
            console.log(scnData.detailed_table_data);
            
            var table1='<div id=\"myTable1\" class=\"table-responsive\"><table id="btab2" class=\"table table-hover table-striped table-bordered table-sm\">';
            table1=table1 +"<thead>";
            table1=table1 +"<tr>";
            table1=table1 +"<th class=\"text-light bg-dark\">Component/Stream</th>";
            table1=table1 +"<th class=\"text-light bg-dark\">Status: New</th>";
            table1=table1 +"<th class=\"text-light bg-dark\">Status: Dismissed</th>";
            table1=table1 +"<th class=\"text-light bg-dark\">Status: Triaged</th>";
            table1=table1 +"</tr>";
            table1=table1 +"</thead>";
            for (var row in scnData.table_data) {
                table1=table1 +"<tr>";
                table1=table1 +"<td>"+ scnData.table_data[row].component +"</td>";
                table1=table1 +"<td>"+ scnData.table_data[row].new_count +"</td>";
                table1=table1 +"<td>"+ scnData.table_data[row].dismissed_count +"</td>";
                table1=table1 +"<td>"+ scnData.table_data[row].triaged_count +"</td>";
                table1=table1 +"</tr>";
            }
            table1=table1 +"<tr>";
            table1=table1 +"<td>Sum of issues</td>";
            table1=table1 +"<td>"+ scnData.total_new +"</td>";
            table1=table1 +"<td>"+ scnData.total_dismissed +"</td>";
            table1=table1 +"<td>"+ scnData.total_triaged +"</td>";
            table1=table1 +"</tbody>";
            table1=table1+"</table></div>";

            var table='<div id=\"myTable\" class=\"table-responsive\"><table id="btab1" class=\"table table-hover table-striped table-bordered table-sm\">';
            table=table +"<thead>";
            table=table +"<tr>";
            table=table +"<th class=\"bg-warning\">CID</th>";
            table=table +"<th class=\"bg-warning\">Status</th>";
            table=table +"<th class=\"bg-warning\">Owner</th>";
            table=table +"<th class=\"bg-warning\">Classification</th>";
            table=table +"<th class=\"bg-warning\">Type</th>";
            table=table +"<th class=\"bg-warning\">Severity</th>";
            table=table +"<th class=\"bg-warning\">Action</th>";
            table=table +"<th class=\"bg-warning\">Component</th>";
            table=table +"<th class=\"bg-warning\">Category</th>";
            table=table +"<th class=\"bg-warning\">File</th>";
            table=table +"<th class=\"bg-warning\">Function</th>";
            table=table +"<th class=\"bg-warning\">Legacy</th>";
            table=table +"<th class=\"bg-warning\">Last Snapshot</th>";
            table=table +"<th class=\"bg-warning\">Last Detected</th>";
            table=table +"<th class=\"bg-warning\">Impact</th>";
            table=table +"</tr>";
            table=table +"</thead>";
            table=table +"<tbody>";
            for (var row in scnData.detailed_table_data){
                table=table +"<tr>";
                table=table +"<td>"+ scnData.detailed_table_data[row].cid  +"</td>";
                table=table +"<td>"+ scnData.detailed_table_data[row].status +"</td>";
                table=table +"<td>"+ scnData.detailed_table_data[row].owner +"</td>";
                table=table +"<td>"+ scnData.detailed_table_data[row].classification +"</td>";
                table=table +"<td>"+ scnData.detailed_table_data[row].type +"</td>";
                table=table +"<td>"+ scnData.detailed_table_data[row].severity +"</td>";
                table=table +"<td>"+ scnData.detailed_table_data[row].action +"</td>";
                table=table +"<td>"+ scnData.detailed_table_data[row].component +"</td>";
                table=table +"<td>"+ scnData.detailed_table_data[row].category +"</td>";
                table=table +"<td>"+ scnData.detailed_table_data[row].file +"</td>";
                table=table +"<td>"+ scnData.detailed_table_data[row].function +"</td>";
                table=table +"<td>"+ scnData.detailed_table_data[row].legacy +"</td>";
                table=table +"<td>"+ scnData.detailed_table_data[row].last_snapshot +"</td>";
                table=table +"<td>"+ scnData.detailed_table_data[row].last_detected +"</td>";
                table=table +"<td>"+ scnData.detailed_table_data[row].impact +"</td>";
                table=table +"</tr>";
            }
            table=table +"</tbody>";
            table=table+"</table></div>";
            $('div#myTable1').replaceWith(table1);
            $('div#myTable').replaceWith(table);
            $(document).ready(function() {
                $('#btab1').DataTable({
                    lengthMenu: [
                        [5, 10, 25, -1],
                        [5, 10, 25, 'All'],
                    ],
                });
            });

          console.log("Success");
        },
        error: function(error){
          console.log("failed");
        }
     });
}

