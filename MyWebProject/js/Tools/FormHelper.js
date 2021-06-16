var ControlTypeEnum = {
    Text: 'Text',
    MuiltityText: 'MuiltityText',
    DateTime: 'DateTime',
    DEnum: 'Enum'
}
var emptyGuid = '00000000-0000-0000-0000-000000000000';
var formHelper = {
    field: null,
    formData: null,
    init: function (e) {
        if (e == null) {
            return;
        }
        if (utility.IsNullOrEmptyLenth(e.field)) {
            return;
        }
        this.field = e.field;
        if (utility.IsNullOrUndefined(e.data)) {
            return;
        }
        this.formData = e.data;
        $.each(e.field, function (idx, row) {
            var control = $("#" + row.fieldName);
            if (row.type == ControlTypeEnum.MuiltityText) {
                control.html(e.data[row.fieldName]);
            } else if (row.type == ControlTypeEnum.DateTime) {
                control.val(utility.formatDate(e.data[row.fieldName], 'yyyy-MM-dd'));
            } else if (row.type == ControlTypeEnum.DEnum) {
                control.val(row.format[e.data[row.fieldName]]);
            } else {
                if (row.isPrimaryKey == true && utility.IsNullOrUndefined(e.data[row.fieldName])) {
                    control.val(emptyGuid);
                } else {
                    control.val(e.data[row.fieldName]);
                }
            }
        });
    },
    validata: function () {
        var self = this;
        if (utility.IsNullOrEmptyLenth(self.field)) {
            return false;
        }
        var isError = false;
        $.each(self.field, function (i, row) {
            if (row.isRequired == true && utility.IsNullOrEmpty($("#" + row.fieldName).val())) {
                alert(row.displayName + "必填");
                isError = true;
                return false;
            }
        });
        return (!isError);
    },
    getSaveData: function () {
        var self = this;
        if (utility.IsNullOrEmptyLenth(self.field)) {
            return false;
        }
        var data = {};
        var primaryKey = emptyGuid;
        $.each(self.field, function (i, row) {
            if (row.isPrimaryKey == true) {
                data[row.fieldName] = $("#" + row.fieldName).val();
                if (utility.IsNullOrEmpty(data[row.fieldName])) {
                    data[row.fieldName] = emptyGuid;
                }
                primaryKey = data[row.fieldName];
            } else {
                data[row.fieldName] = $("#" + row.fieldName).val();
            }
        });
        return { "PrimaryKey": primaryKey, PostData: data };
    }
}