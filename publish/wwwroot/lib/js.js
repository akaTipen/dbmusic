var PAGE_SIZE = 15;
var SELECT = "--SELECT--";
var SAVING_SUCCESS = "Successfully saving data";
var SAVING_FAILED = "Saving data failed";
var SUBMIT_FAILED = "Submit data failed";
var UPDATING_SUCCESS = "Successfully updating data";
var UPDATING_FAILED = "Update data failed";
var DELETING_SUCCESS = "Successfully deleting data";
var DELETING_FAILED = "Delete data failed";
var FETCHING_FAILED = "Fetching data failed";
var VALIDATION_FAILED = "Validation data failed";
var SELECT_DATA = "Please select data first";
var DATA_ALREADY_EXIST = "Data already exist";
var FILE_UPLOAD_SIZE = "1.5";
var DISPLAY_LENGTH_DATA = "200";
var REQUEST_FAILED = "Approval data failed";
var DOM = "<'row'<'col-sm-12 col-md-6'l>><'row'<'col-sm-12'tr>><'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>";

var DRAFT_STATUS = 1;
var SUBMITTED_STATUS = 2;
var INPROGRESS_STATUS = 3;
var APPROVED_STATUS = 4;
var REJECTED_STATUS = 5;
var FINISHED_STATUS = 6;
var REVIEW_STATUS = 7;

function TrimString(x) {
    return x.replace(/^\s+|\s+$/gm, '');
}

function ConvertDateTimeFromJSON(pData) {
    if (pData == null) return '';
    try {
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var parsedDate = pData.substr(0, 10).split('-');
        var jsDate = new Date(parsedDate[0], parsedDate[1], parsedDate[2]); //Date object
        if (jsDate == null) return '';
        var curr_date = jsDate.getDate();
        var curr_month = monthNames[jsDate.getMonth()];
        var curr_year = jsDate.getFullYear();
        var curr_h = jsDate.getHours();
        var curr_m = jsDate.getMinutes();
        var result = curr_date + '-' + curr_month.toString() + '-' + curr_year + " " + curr_h + ':' + curr_m;
    } catch (e) {

    }
    return result;
}

function ConvertDateFromJSON(pData) {
    if (pData == null) return '';
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var parsedDate = pData.substr(0, 10).split('-');
    var jsDate = new Date(parsedDate[0], parsedDate[1], parsedDate[2]); //Date object
    if (jsDate == null) return '';
    var curr_date = jsDate.getDate();
    var curr_month = monthNames[jsDate.getMonth()];
    var curr_year = jsDate.getFullYear();
    var result = curr_date + ' ' + curr_month.toString() + ' ' + curr_year;
    return result;
}

function ConvertDate(pData) {
    if (pData == null) return '';
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var jsDate = new Date(pData); //Date object
    if (jsDate == null) return '';
    var curr_date = jsDate.getDate();
    var curr_month = monthNames[jsDate.getMonth()];
    var curr_year = jsDate.getFullYear();
    var result = curr_date + '-' + curr_month.toString() + '-' + curr_year;
    return result;
}

function ConvertDateFromJSONInput(pData) {
    if (pData == null) return '';
    var monthNames = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    var parsedDate = pData.substr(0, 10).split('-');
    var jsDate = new Date(parsedDate[0], parsedDate[1], parsedDate[2]); //Date object
    if (jsDate == null) return '';
    var curr_date = ("0" + jsDate.getDate()).slice(-2);
    var curr_month = monthNames[jsDate.getMonth()];
    var curr_year = jsDate.getFullYear();
    var result = curr_month.toString() + '/' + curr_date + '/' + curr_year;
    return result;
}

function ConvertDateTimeFromJSONInput(pData) {
    if (pData == null) return '';
    var monthNames = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    var parsedDate = new Date(parseInt(pData.substr(6)));
    var jsDate = new Date(parsedDate); //Date object
    if (jsDate == null) return '';
    var curr_date = ("0" + jsDate.getDate()).slice(-2);
    var curr_month = monthNames[jsDate.getMonth()];
    var curr_year = jsDate.getFullYear();
    var curr_h = jsDate.getHours();
    var curr_m = jsDate.getMinutes();
    var result = curr_month.toString() + '/' + curr_date + '/' + curr_year + " " + curr_h + ':' + curr_m;
    return result;
}

function ConvertDecimal(val) {
    return val.replace(/[,]/g, "");
}

function ConfirmationAlert(pMessage, pStatus, pCallback) {
    var theme;
    var title;
    if (pStatus == 0) {
        title = "Confirmation";
        theme = "red";
    }
    else if (pStatus == 1) {
        title = "Confirmation";
        theme = "green";
    }
    else {
        title = "Validate Data Confirmation";
        theme = "red";
    }

    $.fn.jAlert({
        'title': title,
        'content': pMessage,
        'theme': theme,
        'size': 'sm',
        'showAnimation': 'flipInX',
        'hideAnimation': 'flipOutX',
        'btns': [{ 'text': 'Close', 'theme': 'black' }],
        'onClose': pCallback
    });
}

function GenericDeleteData(pUrl, pId, pTable, pParams) {
    var confirmText = "Do you want to delete this data?";
    $.fn.jAlert({
        'title': 'Delete Confirmation Alert',
        'content': confirmText,
        'theme': 'red',
        'size': 'sm',
        'showAnimation': 'flipInX',
        'hideAnimation': 'flipOutX',
        'btns': [
          {
              'text': 'OK',
              'theme': 'black',
              'onClick': function () {
                  var params = {
                      ID: pId
                  };
                  if (!pParams != null)
                      params = pParams;

                  $.ajax({
                      type: "POST",
                      url: pUrl,
                      async: true,
                      cache: false,
                      data: JSON.stringify(params),
                      contentType: "application/json; charset=utf-8",
                      dataType: "json",
                      success: function (data) {
                          if (data == "" || data == true) {
                              ConfirmationAlert(DELETING_SUCCESS, 1);
                              pTable.draw();
                          }
                          else {
                              if (data != "")
                                  ConfirmationAlert(data, 0);
                              else
                                  ConfirmationAlert(DELETING_FAILED, 0);
                          }
                      },
                      error: function (response) {
                          ConfirmationAlert(DELETING_FAILED, 0);
                      }
                  });
              },
              'closeOnClick': true
          },
          { 'text': 'Close', 'theme': 'black' }
        ]
    });
    return false;
}

function ConfirmationDeleteData(pCallback) {
    var confirmText = "Do you want to delete this data?";
    $.fn.jAlert({
        'title': 'Delete Confirmation Alert',
        'content': confirmText,
        'theme': 'red',
        'size': 'sm',
        'showAnimation': 'flipInX',
        'hideAnimation': 'flipOutX',
        'btns': [
          {
              'text': 'OK',
              'theme': 'black',
              'onClick': pCallback,
              'closeOnClick': true
          },
          { 'text': 'Close', 'theme': 'black' }
        ]
    });
    return false;
}

function FormatNumber(v, prefix) {
    var nStr = document.getElementById(v).value.replace(/,/g, "");
    if (nStr >= 0 || nStr < 0) {
        var prefix = prefix || '';
        nStr += '';
        x = nStr.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1))
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        document.getElementById(v).value = prefix + x1 + x2;
    }
    else {
        document.getElementById(v).value = "";
    }
}

function FormatNumberInnerHTML(v, prefix) {
    var nStr = document.getElementById(v).innerHTML.replace(/,/g, "");
    if (nStr >= 0 || nStr < 0) {
        var prefix = prefix || '';
        nStr += '';
        x = nStr.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1))
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        document.getElementById(v).innerHTML = prefix + x1 + x2;
    }
    else {
        document.getElementById(v).innerHTML = "";
    }
}

function FormatNumberValue(v, prefix) {
    if (v == null || v == undefined)
        return "";

    var nStr = v;
    if (nStr >= 0 || nStr < 0) {
        var prefix = prefix || '';
        nStr += '';
        x = nStr.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1))
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        return prefix + x1 + x2;
    }
    else {
        return "";
    }
}

function IsDate(str) {
    var parms = str.split(/[\.\-\/]/);
    var yyyy = parseInt(parms[2], 10);
    var mm = parseInt(parms[0], 10);
    var dd = parseInt(parms[1], 10);
    var date = new Date(yyyy, mm - 1, dd, 0, 0, 0, 0);
    return mm === (date.getMonth() + 1) && dd === date.getDate() && yyyy === date.getFullYear();
}

function PrintReportViewer(pFormData, pUrl) {
    var width = $(window).width() - 365;
    var height = $(window).height();
    $.ajax({
        url: pUrl,
        type: 'POST',
        cache: false,
        contentType: false,
        processData: false,
        async: false,
        data: pFormData,
        success: function (response) {
            $.jAlert({
                'title': 'Report Viewer',
                'type': 'modal',
                'content': response,
                'theme': 'default',
                'size': { 'height': '' + height + 'px', 'width': '' + width + 'px' },
                'showAnimation': 'fadeInUp',
                'hideAnimation': 'fadeOutDown'
            });
        },
        error: function () {
            alert("error loading report viewer. please try again");
        }
    });
}

function DisableInputControl(pID, pDisable) {
    $("." + pID + " :input").prop("disabled", pDisable);

    if (pDisable)
        $(".btnSave").hide();
    else
        $(".btnSave").show();
}

function AddCustomCSSDataTable() {
    $('div.dataTables_length select').addClass("custom-select custom-select-sm");
}

function run_waitMe() {
    $('#page').waitMe({
        effect: 'facebook',
        text: 'Please wait...',
        bg: 'rgba(255,255,255,0.7)',
        color: '#000',
        sizeW: '',
        sizeH: '',
    });
}

function hide_waitMe() {
    $('#page').waitMe('hide');
}

function run_waitMeOnDialog(div) {
    $('#' + div).waitMe({
        effect: 'facebook',
        text: 'Please wait...',
        bg: 'rgba(255,255,255,0.7)',
        color: '#000',
        sizeW: '',
        sizeH: '',
    });
}

function hide_waitMeOnDialog(div) {
    $('#' + div).waitMe('hide');
}
