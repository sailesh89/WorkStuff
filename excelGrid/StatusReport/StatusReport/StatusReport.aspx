<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="StatusReport.aspx.vb" Inherits="StatusReport.StatusReport" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Status Report</title>
    <link rel="stylesheet" href="jqwidgets/styles/jqx.base.css" type="text/css" />
    <link rel="stylesheet" href="jqwidgets/styles/jqx.office.css" type="text/css" />
    
    <script type="text/javascript" src="scripts/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="scripts/jquery-ui.custom.min.js"></script>
   
    <script type="text/javascript" src="jqwidgets/jqxcore.js"></script>
    <script type="text/javascript" src="jqwidgets/jqxdata.js"></script>
    <script type="text/javascript" src="jqwidgets/jqxbuttons.js"></script>
    <script type="text/javascript" src="jqwidgets/jqxscrollbar.js"></script>
    <script type="text/javascript" src="jqwidgets/jqxmenu.js"></script>
    <script type="text/javascript" src="jqwidgets/jqxgrid.js"></script>
    <script type="text/javascript" src="jqwidgets/jqxgrid.edit.js"></script>
    <script type="text/javascript" src="jqwidgets/jqxgrid.selection.js"></script>
   
    
    <script type="text/javascript" src="jqwidgets/jqxcheckbox.js"></script>
    <script type="text/javascript" src="jqwidgets/jqxcalendar.js"></script>
    <script type="text/javascript" src="jqwidgets/jqxnumberinput.js"></script>    
    <script type="text/javascript" src="jqwidgets/globalization/globalize.js"></script>
    <script type="text/javascript" src="scripts/gettheme.js"></script>
    <!-- Date Range -->    
    <script type="text/javascript" src="jqwidgets/jqxdatetimeinput.js"></script>
    <script type="text/javascript" src="jqwidgets/jqxcalendar.js"></script>
    <script type="text/javascript" src="jqwidgets/jqxtooltip.js"></script>
    <!--Drop Down List-->
    <script type="text/javascript" src="jqwidgets/jqxlistbox.js"></script>
    <script type="text/javascript" src="jqwidgets/jqxdropdownlist.js"></script>

    <!--Grid-->
    <script type="text/javascript" src="scripts/generateGrid.js"></script>
    <script type="text/javascript" language="javascript">


        $(function () {

            var theme = "office";
            //Date Time
            //1.Reporting Period
            $("#jqxRepPeriod").jqxDateTimeInput({ width: 200, height: 25, theme: theme, selectionMode: 'range' });
            var date1 = new Date();
            date1.setDate(date1.getDate() - 7);

            var date2 = new Date();
            date2.setDate(date2.getDate() - 1);
            $("#jqxRepPeriod").jqxDateTimeInput('setRange', date1, date2);

            //2.Prepared On
            $("#jqxPrepOn").jqxDateTimeInput({ width: '200px', height: '25px', theme: theme });

            //Lists
            //1.Prepared by List
            var prepBySource = ["Kushal Baraskar", "Sailesh Kumar", "Jalaj Agrawal"];
            $("#jqxPrepBy").jqxDropDownList({ source: prepBySource, selectedIndex: 0, width: '200', height: '20', dropDownHeight: prepBySource.length * 25, theme: theme });

            //2.Project Phase
            var projPhaseSource = ["Red", "Green"];
            $("#jqxProjPhase").jqxDropDownList({ source: projPhaseSource, selectedIndex: 0, width: '200', height: '20', dropDownHeight: projPhaseSource.length * 25, theme: theme });

            //3.Project Manager
            var projManagerSource = ["Madhu"];
            $("#jqxManger").jqxDropDownList({ source: projManagerSource, selectedIndex: 0, width: '200', height: '20', dropDownHeight: projManagerSource.length * 25, theme: theme });



            RepPeriodGrid(theme);
            NextrepPeriod(theme);
            Issues(theme);
        });
    </script>
</head>
<body class="default">
    <div id='jqxWidget'>
    <form id="form1" runat="server">
    <div>
        <div style="float:left">

            <div style="height:30px">Reporting Period</div>    
            <div style="height:30px">Prepared By</div>
            <div style="height:30px">Prepared On</div>
            <div style="height:30px">Current Project Phase</div>
            <div style="height:30px">L&T Infotech Manger</div>  
                  
        </div>
        <div style="float:left;height:150px;width:5px"></div>
        <div>
            <div style="height:30px"><div id="jqxRepPeriod"></div></div>
            <div style="height:30px"><div id="jqxPrepBy"></div></div>
            <div style="height:30px"><div id="jqxPrepOn"></div></div>
            <div style="height:30px"><div id="jqxProjPhase"></div></div>
            <div style="height:30px"><div id="jqxManger"></div></div>
        </div>
    </div>
    <div style="clear:left">
        <div> <h3>1. Work Status in Reporting Period</h3></div>
        <div>
             <div>
                <!--<input type="button" value="Export to Excel" id='excelExport' />-->
                <input type="button" value="Add Row" id='addRowBtnRepPeriod' />
                <input type="button" value="Delete Row" id='delRowBtnRepPeriod' />
            </div>
            <br />
             <div id="jqxgridRepPeriod"></div>
        </div>
    </div>
    <br />
    <div style="clear:left">
        <div> <h3>2. Work Planned for next Reporting Period</h3></div>
        <div>
             <div>
                <!--<input type="button" value="Export to Excel" id='excelExport' />-->
                <input type="button" value="Add Row" id='addRowBtnNextPeriod' />
                <input type="button" value="Delete Row" id='delRowBtnNextPeriod' />
            </div>
            <br />
             <div id="jqxgridNextRepPeriod"></div>
        </div>
    </div>
     <br />
    <div style="clear:left">
        <div> <h3>3. Outstanding Issues/Concerns</h3></div>
        <div>
             <div>
                <!--<input type="button" value="Export to Excel" id='excelExport' />-->
                <input type="button" value="Add Row" id='addRowBtnIssues' />
                <input type="button" value="Delete Row" id='delRowBtnIssues' />
            </div>
            <br />
           <div id="jqxgridIssues"></div>
        </div>
    </div>
     <br />
    <div style="clear:left">
        <div> <h3>4. Miscelaneous Notes</h3></div>
        <div>
        <!--
             <div>
                
                <input type="button" value="Add Row" id='addRowBtnNotes' />
                <input type="button" value="Delete Row" id='delRowBtnNotes' />
            </div>
            grid
            -->
            <small>Please Update in the Document Directly.</small>
        </div>
    </div>
    </form>
    </div>
</body>
</html>
