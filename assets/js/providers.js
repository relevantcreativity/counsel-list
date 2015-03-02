$(document).ready(function(){

});

function createMenus(fieldName, json, plugins){
    var options = [];
    var optGroups = [];

    $.each(json, function(key, data) {
        if(data.label.indexOf('-') === -1){
            optGroups.push({id: data.label, name: data.label, sort: data.label});
        }
        else{
            options.push({id: data.label, parent: data.label.substr(0, data.label.indexOf(" - ")), name: data.label.substr(data.label.indexOf(" - ") + 3), sort: data.label.substr(data.label.indexOf(" - ") + 3)});
        }
    });

    $.each(optGroups, function(key, data){
        options.push({id: data.id, parent: data.name, name: 'All ' + data.name, sort: 'AAA' + data.name});
    });

    optGroups.sort(function(a, b){
      return a.sort == b.sort ? 0 : +(a.sort > b.sort) || -1;
    });

    options.sort(function(a, b){
      return a.sort == b.sort ? 0 : +(a.sort > b.sort) || -1;
    });

    $('#field-'+ fieldName).selectize({
        options: options,
        optgroups: optGroups,
        labelField: 'name',
        valueField: 'id',
        optgroupField: 'parent',
        optgroupLabelField: 'name',
        optgroupValueField: 'id',
        searchField: ['model'],
        plugins: plugins
    });
}
