var BtnClassEnum = {
    Primary: "Primary",
    Secondary: "Secondary",
    Success: "Success",
    Danger: "Danger",
    Warning: "Warning",
    Info: "Info",
    Light: "Light",
    Dark: "Dark",
    Link: "Link",
};
var BtnTypeEnum = {
    Default: "Default",
    Outline: "Outline"
}
var BtnOptionsEnum = {
    "Default": [{
        "Primary": "btn btn-primary",
        "Secondary": "btn btn-secondary",
        "Success": "btn btn-success",
        "Danger": "btn btn-danger",
        "Warning": "btn btn-warning",
        "Info": "btn btn-info",
        "Light": "btn btn-light",
        "Dark": "btn btn-dark",
        "Link": "btn btn-link",
    }],
    "Outline": [{
        "Primary": "btn btn-outline-primary",
        "Secondary": "btn btn-outline-secondary",
        "Success": "btn btn-outline-success",
        "Danger": "btn btn-outline-danger",
        "Warning": "btn btn-outline-warning",
        "Info": "btn btn-outline-info",
        "Light": "btn btn-outline-light",
        "Dark": "btn btn-outline-dark",
    }]
}
var DataType = {
    Int: "int",
    DateTime: "dateTime",
    String: "string",
    Decimal: "decimal",
    DEnum: "enum"
}
var gridData = null;
var primaryKey = "";
var dataGrid = {
    SetGridData: function (e) {
        if (e != null) {
            var grid = $("#" + e.gridId);
            var button = e.button;
            if (grid != null) {
                var hideStyle = "display:none;";
                var titleHtml = "";
                $.each(e.field, function (idx, row) {
                    titleHtml += CreateColunm("th",row.displayName, { isShow: row.isShow });
                });
                if (button && button.length > 0) {
                    titleHtml += "<th scope='col'>操作</th>";
                }
                var btnWidth = "150px";
                if (e.buttonWidth) {
                    btnWidth = e.buttonWidth + "px";
                }
                var bodyHtml = "";
                gridData = e.gridData;
                primaryKey = e.primaryKey;
                $.each(e.gridData, function (idx, row) {
                    bodyHtml += "<tr>"
                    $.each(e.field, function (fIdx, fd) {
                        bodyHtml += CreateColunm("td",TransferTxt(row[fd.fieldName], fd.type, fd.format), { isShow: fd.isShow, width: fd.width });
                    });
                    if (button && button.length > 0) {
                        bodyHtml += "<td style='width:" + btnWidth + ";'>"
                        $.each(button, function (bIdx, btn) {
                            bodyHtml += "<button type='button' class='" + BtnOptionsEnum[btn.btnType][0][btn.btnClass] + " " + btn.btnId + "'"
                                + " onclick=\"" + btn.calback + "('" + row[e.primaryKey] + "')\""
                                + ">" + btn.btnName + "</button > ";
                        });
                        bodyHtml += "</td>";
                    }
                    bodyHtml += "</tr>";
                });
                var tableHmtl = "<thead><tr>" + titleHtml + "</tr></thead >";
                tableHmtl += "<tbody>" + bodyHtml + "</tbody>";
                grid.html(tableHmtl);
            }
        }
    },
    /**
     * 根据主键GUID获取
     * @param {any} primaryKey
     */
    GetDataByPrimaryKey: function (data) {
        if (primaryKey && gridData) {
            for (var i = 0; i < gridData.length; i++) {
                if (gridData[i][primaryKey] === data) {
                    return gridData[i];
                }
            }
        }
        return null;
    }
};
/**
 * 创建列
 * @param {any} txt
 * @param {any} eStyle
 */
var CreateColunm = function (domName, txt, eStyle) {
    var style = "";
    if (eStyle.isShow == false) {
        style += "display:none;";
    }
    if (eStyle.width) {
        style += "width:" + eStyle.width + "px;";
    }
    return "<" + domName + " style='" + style + "'>" + txt + "</" + domName +">";
};
var TransferTxt = function (data, dType, format) {
    switch (dType) {
        case DataType.Int:
            return parseInt(data);
        case DataType.Decimal:
            return parseFloat(data);
        case DataType.DateTime:
            return utility.formatDate(data, format);
        case DataType.DEnum:
            return format[data];
        default:
            if (utility.IsNullOrEmpty(data)) {
                return "";
            }
            return data;
    }
}
