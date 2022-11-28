/**
 * It takes a JSON string, parses it into an array of objects, then returns an array of objects with
 * only the fields property.
 * @param dataset - The data you want to process.
 * @returns An array of objects.
 */
function processData(dataset) {
    var result = []
    dataset = JSON.parse(dataset);
    dataset.forEach(item => result.push(item.fields));
    return result;
}

/**
 * It takes an array of objects, and returns an array of the mean values of the properties of those
 * objects.
 * @param data - an array of objects, each object has 4 properties: download, upload, ping, latency
 * @returns An array of the mean values of the download, upload, ping, and latency properties of the
 * objects in the data array.
 */
function meanResult(data) {
    let result = [],
        download = 0,
        upload = 0,
        ping = 0,
        latency = 0;

    data.forEach(item => {
        download += parseFloat(item.download);
        upload += parseFloat(item.upload);
        ping += parseFloat(item.ping);
        latency += parseFloat(item.latency);
    });

    result.push((download / data.length).toFixed(2));
    result.push((upload / data.length).toFixed(2));
    result.push((ping / data.length).toFixed(2));
    result.push((latency / data.length).toFixed(2));
    return result;
}

function downloadChart(data) {
    const download_chart = $('#download_chart');
    let download_data = [], labels = [];
    data.forEach(item => download_data.push(parseFloat(item.download)));
    data.forEach(item => labels.push(item.date.replace('T', ' ').slice(0, 19)));

    new Chart(download_chart, {
        "type": "line",
        "data": {
            "labels": labels,
            "datasets": [
                {
                    "label": "Download Speed (Mbps)",
                    "fill": true,
                    "data": download_data,
                    "backgroundColor": "rgba(78, 115, 223, 0.05)",
                    "borderColor": "rgba(78, 115, 223, 1)"
                }
            ]
        },
        "options": {
            "maintainAspectRatio": false,
            "legend": {
                "display": false,
                "labels": {
                    "fontStyle": "normal"
                }
            },
            "title": {
                "fontStyle": "normal"
            },
            "scales": {
                "xAxes": [
                    {
                        "gridLines": {
                            "color": "rgb(234, 236, 244)",
                            "zeroLineColor": "rgb(234, 236, 244)",
                            "drawBorder": false,
                            "drawTicks": false,
                            "borderDash": [
                                2
                            ],
                            "zeroLineBorderDash": [
                                2
                            ],
                            "drawOnChartArea": false
                        },
                        "ticks": {
                            "fontColor": "#858796",
                            "fontStyle": "normal",
                            "padding": 20
                        }
                    }
                ],
                "yAxes":[
                    {
                        "gridLines": {
                            "color": "rgb(234, 236, 244)",
                            "zeroLineColor": "rgb(234, 236, 244)",
                            "drawBorder": false,
                            "drawTicks": false,
                            "borderDash": [
                                2
                            ],
                            "zeroLineBorderDash": [
                                2
                            ]
                        },
                        "ticks": {
                            "fontColor": "#858796",
                            "fontStyle": "normal",
                            "padding": 20
                        }
                    }
                ]
            }
        }
    });
}

function uploadChart(data) {
    const upload_chart = $('#upload_chart');
    let upload_data = [], labels = [];
    data.forEach(item => upload_data.push(parseFloat(item.upload)));
    data.forEach(item => labels.push(item.date.replace('T', ' ').slice(0, 19)));

    new Chart(upload_chart, {
        "type": "line",
        "data": {
            "labels": labels,
            "datasets": [
                {
                    "label": "Upload Speed (Mbps)",
                    "fill": true,
                    "data": upload_data,
                    "backgroundColor": "rgba(28, 200, 138, 0.05)",
                    "borderColor": "rgba(28, 200, 138, 1)"
                }
            ]
        },
        "options": {
            "maintainAspectRatio": false,
            "legend": {
                "display": false,
                "labels": {
                    "fontStyle": "normal"
                }
            },
            "title": {
                "fontStyle": "normal"
            },
            "scales": {
                "xAxes": [
                    {
                        "gridLines": {
                            "color": "rgb(234, 236, 244)",
                            "zeroLineColor": "rgb(234, 236, 244)",
                            "drawBorder": false,
                            "drawTicks": false,
                            "borderDash": [
                                2
                            ],
                            "zeroLineBorderDash": [
                                2
                            ],
                            "drawOnChartArea": false
                        },
                        "ticks": {
                            "fontColor": "#858796",
                            "fontStyle": "normal",
                            "padding": 20
                        }
                    }
                ],
                "yAxes":[
                    {
                        "gridLines": {
                            "color": "rgb(234, 236, 244)",
                            "zeroLineColor": "rgb(234, 236, 244)",
                            "drawBorder": false,
                            "drawTicks": false,
                            "borderDash": [
                                2
                            ],
                            "zeroLineBorderDash": [
                                2
                            ]
                        },
                        "ticks": {
                            "fontColor": "#858796",
                            "fontStyle": "normal",
                            "padding": 20
                        }
                    }
                ]
            }
        }
    });
}


$(document).ready (function () {
    url = 'http://127.0.0.1:8000/data';
    const download_mean = $('#download_mean'),
        upload_mean = $('#upload_mean'),
        ping_mean = $('#ping_mean'),
        latency_mean = $('#latency_mean');

    $.getJSON(url, function (data) {
        download_mean.text(meanResult(processData(data))[0] + ' Mbps');
        upload_mean.text(meanResult(processData(data))[1] + ' Mbps');
        ping_mean.text(meanResult(processData(data))[2] + ' ms');
        latency_mean.text(meanResult(processData(data))[3] + ' ms');

        downloadChart(processData(data));
        uploadChart(processData(data));
    });
});
