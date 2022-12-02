/**
 * The function is called when the user clicks on the button. The function then makes an AJAX call to
 * the server, which in turn calls the Python script
 */
function exportFile() {
    url = "http://localhost:6080/export";
    $.ajax({
        url: url,
        type: "GET",
    });
    alert("Success export file");
}