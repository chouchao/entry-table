# entry-table
数据录入用表格

使用方法
```javascript
    $(function(){
        $('#mainTable').entryTable({
          columns:[
            {title:'NO.', field:'NO', width:'40px'},
            {title:'D/C', field:'DC', control:'select', options:[{text:'DC0',value:0},{text:'DC1',value:1}], required:true},
            {title:'G/L Account', field:'GLAccount', required:true, maxlength:17},
            {title:'Amount', field:'Amount', required:true, maxlength:16},
            {title:'Tax Code', field:'TaxCode', required:true, maxlength:2},
            {title:'Cost Center', field:'CostCenter', control:'number', required:true},
            {title:'Assignment', field:'Assignment'},
            {title:'Text', field:'Text'}
          ],
          data:[
            {NO:1, DC: 0, GLAccount: 1000000001, Amount:101.20, TaxCode:'A1',CostCenter:90000001,Assignment:'aa', Text:'bb'},
            {NO:2, DC: 1, GLAccount: 1000000002, Amount:102.20, TaxCode:'A2',CostCenter:90000001,Assignment:'aa', Text:'bb'},
            {NO:3, DC: 1, GLAccount: 1000000003, Amount:103.20, TaxCode:'A3',CostCenter:90000001,Assignment:'aa', Text:'bb'},
            {NO:4, DC: 0, GLAccount: 1000000004, Amount:104.20, TaxCode:'A4',CostCenter:90000001,Assignment:'aa', Text:'bb'},
            {NO:5, DC: 0, GLAccount: 1000000005, Amount:105.20, TaxCode:'A5',CostCenter:90000001,Assignment:'aa', Text:'bb'}
          ],
          onSaveRow:function(data, row){
            console.log('onSaveRow' + data);
            row.setId('123');
          },
          onDeleteRow:function(data, row){
            console.log('onDeleteRow' + data);
            row.delete();
          }
        });
    });
```