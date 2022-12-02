function exportFile() {
    url = "http://localhost:6080/export";
    $.ajax({
        url: url,
        type: "GET",
        success: function (data) {
            alert("File exported successfully!");
        },
        error: function (data) {
            alert("Error exporting file!");
        }
    });
}