var oTable;

function loadData() {
    if (typeof oTable == 'undefined') {
        var handlerUrl = $.rootDir + 'api/APIArtists';
        oTable = $('#tblArtist').DataTable({
            "order": [],
            "jQueryUI": true,
            "ajax": {
                type: "GET",
                url: handlerUrl,
                dataSrc: ''
            },
            "columns": [
                { "data": "artistId" },
                {
                    "data": "artistName", render: function (data, type, row) {
                        return row.imageUrl ? '<p style="display:flex;"><img src="' + row.imageUrl + '" width="100" height="100">&nbsp;' + data + '</p>' :
                            '<p style="display:flex;"><img src="" width="100" height="100">&nbsp;' + data + '</p>'
                    }
                },
                { "data": "albumName" },
                { "data": "releaseDate", "type": "date", render: function (data, type, row) { return ConvertDateFromJSON(data); } },
                {
                    "data": "sampleUrl", render: function (data, type, row, meta) {
                        return '<button onclick="preview(' + meta.row + ')"><span class="oi oi-media-play"></span></button>'
                    }
                },
                {
                    "data": "price", render: function (data, type, row) {
                        return 'IDR ' + data
                    }
                },
                {
                    "data": "artistId", render: function (data, type, row, meta) {
                        return '<button class="btn btn-primary btn-block" onclick="editData(' + meta.row + ')">Edit</button>' +
                            '<button class="btn btn-danger btn-block" onclick="deleteData(' + meta.row + ')">Delete</button>'
                    }
                }
            ],
        });
    }
    else {
        oTable.ajax.reload();
    }
}

$(function () {
    loadData();
    $("#txtReleaseDate").datepicker();

    $("#ArtistForm").submit(function () {
        saveData();
        return false;
    })
});

function addData() {
    $('#modalTitleArtist').html('Add Artist');

    viewAddEditData(-1);
}

function editData(pID) {
    $('#modalTitleArtist').html('Edit Artist');

    viewAddEditData(pID);
}

function viewAddEditData(pID) {
    $("input[id$='txtArtistName']").val("");
    $("input[id$='txtAlbumName']").val("");
    $("input[id$='txtImageUrl']").val("");
    $("input[id$='txtReleaseDate']").val("");
    $("input[id$='txtPrice']").val("");
    $("input[id$='txtSampleUrl']").val("");

    var hf = $("input[id$='hf']");

    if (pID < 0) {
        hf.val('');
    } else {
        var arr = oTable.row(pID).data();
        pID = arr.artistId;
        hf.val(pID);

        $("#txtArtistName").val(arr.artistName);
        $("#txtAlbumName").val(arr.albumName);
        $("#txtImageUrl").val(arr.imageUrl);
        $("#txtReleaseDate").val(ConvertDateFromJSONInput(arr.releaseDate));
        $("#txtPrice").val(arr.price);
        $("#txtSampleUrl").val(arr.sampleUrl);
    };

    $('#modalArtist').modal('show');
}

function deleteData(pID) {
    var a = confirm("Yakin hapus?");
    if (a) {
        var arr = oTable.row(pID).data();
        pID = arr.artistId;

        $.ajax({
            type: "DELETE",
            url: $.rootDir + "api/APIArtists/" + pID,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                oTable.ajax.reload();
                alert('Hapus berhasil');
            },
            error: function (data, status, xhr) {
                alert('Error')
            },
        });
    }
}

function saveData() {
    var hf = $("input[id$='hf']");
    var txtArtistName = $("input[id$='txtArtistName']");
    var txtAlbumName = $("input[id$='txtAlbumName']");
    var txtImageUrl = $("input[id$='txtImageUrl']");
    var txtReleaseDate = $("input[id$='txtReleaseDate']");
    var txtPrice = $("input[id$='txtPrice']");
    var txtSampleUrl = $("input[id$='txtSampleUrl']");

    var o = {};
    var Purl = '';
    var PType = '';
    var message = '';

    if (hf.val() == '') {
        o.ArtistId = 0;
        Purl = $.rootDir + "api/APIArtists";
        PType = "POST";
        message = 'Berhasil Submit';
    }
    else {
        o.ArtistId = hf.val();
        Purl = $.rootDir + "api/APIArtists/" + hf.val();
        PType = "PUT";
        message = 'Berhasil Update';
    }

    o.ArtistName = txtArtistName.val();
    o.AlbumName = txtAlbumName.val();
    o.ImageUrl = txtImageUrl.val();
    o.ReleaseDate = txtReleaseDate.val();
    o.SampleUrl = txtSampleUrl.val();
    o.Price = txtPrice.val();

    $.ajax({
        type: PType,
        url: Purl,
        data: JSON.stringify(o),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, status, xhr) {
            alert(message)
            closeDialog();
        },
        error: function (data, status, xhr) {
            alert('Error')
        },
    });
}

function GetDataError(xhr, status, error) {
    alert(FETCHING_FAILED)
}

function closeDialog() {
    $('#modalArtist').modal('hide');

    loadData();
}

function preview(pID) {
    var arr = oTable.row(pID).data();
    $("#source").attr("src", arr.sampleUrl);
    $("#audio").trigger('load');
    document.getElementById('audio').play();

    $('#labelArtistName').html(arr.artistName);
    $('#labelAlbum').html(arr.albumName);
    $("#labelImg").attr("src", arr.imageUrl);

    $('#modalPreview').modal('show');
};

function stop() {
    if ($('#source').attr('src')) {
        document.getElementById('audio').pause();
        document.getElementById('audio').currentTime = 0;
    }
}