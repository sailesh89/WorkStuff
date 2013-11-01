function RepPeriodGrid(theme) {
    // renderer for grid cells.
    var numberrenderer = function (row, column, value) {
        return '<div style="text-align: center; margin-top: 5px;">' + (1 + value) + '</div>';
    }

    // create Grid datafields and columns arrays.
    var datafields = ['projtask', 'planUnplan', 'status', 'utpState', 'startDate', 'endDate'];
    var columns = [];


    var source =
            {
                unboundmode: true,
                totalrecords: 4,
                datafields: datafields,
                updaterow: function (rowid, rowdata) {
                    // synchronize with the server - send update command   
                }
            };

    var dataAdapter = new $.jqx.dataAdapter(source);
    var cssclass = 'jqx-widget-header';
    if (theme != '') cssclass += ' jqx-widget-header-' + theme;
    // initialize jqxGrid
    $("#jqxgridRepPeriod").jqxGrid(
            {
                width: 925,
                source: dataAdapter,
                editable: true,
                columnsresize: false,
                selectionmode: 'multiplecellsadvanced',
                theme: theme,
                autorowheight: true,
                autoheight: true,
                //columns: columns
                columns: [
                    {
                        pinned: true,
                        exportable: false,
                        text: "",
                        columntype: 'number',
                        cellclassname: cssclass,
                        cellsrenderer: numberrenderer
                    },
                    {
                        text: 'Project Task',
                        datafield: 'projtask',
                        align: 'center',
                        width: 400
                    },
                    {
                        text: 'Planned/Unplanned',
                        datafield: 'planUnplan',
                        width: 100,
                        align: 'center',
                        columnType: 'dropdownlist',
                        createeditor: function (row, cellvalue, editor, celltext, cellwidth, cellheight) {

                            editor.jqxDropDownList({ source: ['Planned', 'Unplanned'], dropDownHeight: 2 * 25 });
                        }
                    },
                    {
                        text: 'Status',
                        datafield: 'status',
                        width: 100,
                        align: 'center',
                        columnType: 'dropdownlist',
                        createeditor: function (row, cellvalue, editor, celltext, cellwidth, cellheight) {

                            editor.jqxDropDownList({ source: ['Completed', 'Postponed', 'Delivered', 'In Work'], dropDownHeight: 4 * 25 });
                        }
                    },
                    {
                        text: 'UTP State',
                        datafield: 'utpState',
                        width: 100,
                        align: 'center',
                        columnType: 'dropdownlist',
                        createeditor: function (row, cellvalue, editor, celltext, cellwidth, cellheight) {

                            editor.jqxDropDownList({ source: ['Validated', 'Investigated', 'Approved', 'In Work', 'Delivered', 'Tested'], dropDownHeight: 6 * 25 });
                        }
                    },
                    {
                        text: 'Start Date',
                        datafield: 'startDate',
                        width: 100,
                        align: 'center',
                        columnType: 'datetimeinput',
                        cellsformat: 'dd-MMM-yyyy'
                    },
                    {
                        text: 'End Date',
                        datafield: 'endDate',
                        width: 100,
                        align: 'center',
                        columnType: 'datetimeinput',
                        cellsformat: 'dd-MMM-yyyy',
                        validation: function (cell, value) {
                            if (value === null || value === "") {
                                return true;
                            }
                            else {
                                alert(cell.row);
                                this;
                                var stDtStr = $('#jqxgridRepPeriod').jqxGrid('getcelltextbyid', cell.row, "startDate");
                                var res = stDtStr.split("-");
                                var monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                                var stDate = new Date(parseInt(res[2]), monthArr.indexOf(res[1]), parseInt(res[0]));
                                var dueDate = new Date(value);
                                if (stDate > dueDate) {
                                    return { result: false, message: "Due date can't be less than Start Date" };
                                }
                                else
                                    return true;
                            }
                            //return true;
                        }

                    }
                ]
            });
   
    $("#addRowBtnRepPeriod").jqxButton({ theme: theme });
    $("#delRowBtnRepPeriod").jqxButton({ theme: theme });
    
    $("#addRowBtnRepPeriod").on('click', function () {
        var commit = $("#jqxgridRepPeriod").jqxGrid('addrow', null, {});
    });
    $("#delRowBtnRepPeriod").on('click', function () {
        var selectedrowindex = ($("#jqxgridRepPeriod").jqxGrid('getselectedcell')).rowindex;
        var rowscount = $("#jqxgridRepPeriod").jqxGrid('getdatainformation').rowscount;
        if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
            var id = $("#jqxgridRepPeriod").jqxGrid('getrowid', selectedrowindex);
            var commit = $("#jqxgridRepPeriod").jqxGrid('deleterow', id);
        }
    });
}

function NextrepPeriod(theme) {
    // renderer for grid cells.
    var numberrenderer = function (row, column, value) {
        return '<div style="text-align: center; margin-top: 5px;">' + (1 + value) + '</div>';
    }

    // create Grid datafields and columns arrays.
    var datafields = ['projtask', 'note'];
    var columns = [];


    var source =
            {
                unboundmode: true,
                totalrecords: 4,
                datafields: datafields,
                updaterow: function (rowid, rowdata) {
                    // synchronize with the server - send update command   
                }
            };

    var dataAdapter = new $.jqx.dataAdapter(source);
    var cssclass = 'jqx-widget-header';
    if (theme != '') cssclass += ' jqx-widget-header-' + theme;
    // initialize jqxGrid
    $("#jqxgridNextRepPeriod").jqxGrid(
            {
                width: 925,
                source: dataAdapter,
                editable: true,
                columnsresize: false,
                selectionmode: 'multiplecellsadvanced',
                theme: theme,
                autorowheight: true,
                autoheight: true,
                //columns: columns
                columns: [
                    {
                        pinned: true,
                        exportable: false,
                        text: "",
                        columntype: 'number',
                        cellclassname: cssclass,
                        cellsrenderer: numberrenderer
                    },
                    {
                        text: 'Project Task',
                        datafield: 'projtask',
                        align: 'center',
                        width: 700
                    },
                    {
                        text: 'Note',
                        datafield: 'note',
                        width: 200,
                        align: 'center',
                        columnType: 'dropdownlist',
                        createeditor: function (row, cellvalue, editor, celltext, cellwidth, cellheight) {

                            editor.jqxDropDownList({ source: ['In Work', 'To Be Started', 'On Hold'], dropDownHeight: 3 * 25 });
                        }
                    }

                ]
            });

    $("#addRowBtnNextPeriod").jqxButton({ theme: theme });
    $("#delRowBtnNextPeriod").jqxButton({ theme: theme });

    $("#addRowBtnNextPeriod").on('click', function () {
        var commit = $("#jqxgridNextRepPeriod").jqxGrid('addrow', null, {});
    });
    $("#delRowBtnNextPeriod").on('click', function () {
        var selectedrowindex = ($("#jqxgridNextRepPeriod").jqxGrid('getselectedcell')).rowindex;
        var rowscount = $("#jqxgridNextRepPeriod").jqxGrid('getdatainformation').rowscount;
        if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
            var id = $("#jqxgridNextRepPeriod").jqxGrid('getrowid', selectedrowindex);
            var commit = $("#jqxgridNextRepPeriod").jqxGrid('deleterow', id);
        }
    });
}
function Issues(theme) {
    // renderer for grid cells.
    var numberrenderer = function (row, column, value) {
        return '<div style="text-align: center; margin-top: 5px;">' + (1 + value) + '</div>';
    }

    // create Grid datafields and columns arrays.
    var datafields = ['issues', 'raisedOn','ref','resp'];
    var columns = [];


    var source =
            {
                unboundmode: true,
                totalrecords: 4,
                datafields: datafields,
                updaterow: function (rowid, rowdata) {
                    // synchronize with the server - send update command   
                }
            };

    var dataAdapter = new $.jqx.dataAdapter(source);
    var cssclass = 'jqx-widget-header';
    if (theme != '') cssclass += ' jqx-widget-header-' + theme;
    // initialize jqxGrid
    $("#jqxgridIssues").jqxGrid(
            {
                width: 925,
                source: dataAdapter,
                editable: true,
                columnsresize: false,
                selectionmode: 'multiplecellsadvanced',
                theme: theme,
                autorowheight: true,
                autoheight: true,
                //columns: columns
                columns: [
                    {
                        pinned: true,
                        exportable: false,
                        text: "",
                        columntype: 'number',
                        cellclassname: cssclass,
                        cellsrenderer: numberrenderer
                    },
                    {
                        text: 'Issues / Concerns',
                        datafield: 'issues',
                        align: 'center',
                        width: 500
                    },
                    {
                        text: 'Raised on',
                        datafield: 'raisedOn',
                        width: 100,
                        align: 'center',
                        columnType: 'datetimeinput',
						cellsformat: 'dd-MMM-yyyy'
                        
                    },
					{
                        text: 'References',
                        datafield: 'ref',
                        align: 'center',
                        width: 150
                       
                    },
					{
                        text: 'Responsible',
                        datafield: 'resp',
                        align: 'center',
                        width: 150
                       
                    }

                ]
            });

    $("#addRowBtnIssues").jqxButton({ theme: theme });
    $("#delRowBtnIssues").jqxButton({ theme: theme });

    $("#addRowBtnIssues").on('click', function () {
        var commit = $("#jqxgridIssues").jqxGrid('addrow', null, {});
    });
    $("#delRowBtnIssues").on('click', function () {
        var selectedrowindex = ($("#jqxgridIssues").jqxGrid('getselectedcell')).rowindex;
        var rowscount = $("#jqxgridIssues").jqxGrid('getdatainformation').rowscount;
        if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
            var id = $("#jqxgridIssues").jqxGrid('getrowid', selectedrowindex);
            var commit = $("#jqxgridIssues").jqxGrid('deleterow', id);
        }
    });
}