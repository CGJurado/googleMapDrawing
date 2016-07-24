
// Tests here
//-1291.5822596890494
QUnit.test('createBusiness', function (assert) {

    assert.deepEqual(App.createBusiness(18.4682315, -69.9353514), {
                    map: 'map',
                    animation: 'google.maps.Animation.DROP',
                    draggable: false,
                    position: {lat: 18.4682315, lng: -69.9353514},
                    label: 'businessName',
                    title: 'businessName',
                    clickable: true
               }, 'Created a business in a specific lat and lng position');
});

QUnit.test('createArea', function (assert) {
    
    var newArea1 = expectedArea(3); //triangle
    var newArea2 = expectedArea(5); //polygon
    
    assert.deepEqual(App.createArea(newArea1), {
                    paths: newArea1,
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 3,
                    fillColor: '#F0AD4E',
                    fillOpacity: 0.45,
                    indexID: 1
                }, 'created a triangle object');
    
    assert.deepEqual(App.createArea(newArea2), {
                    paths: newArea2,
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 3,
                    fillColor: '#F0AD4E',
                    fillOpacity: 0.45,
                    indexID: 1
                }, 'created a polygon of 5 sides');
});

QUnit.test('updateBusiness', function (assert) {
    
    var pos = expectedArea(1); //Get one random position
    var newPosMarker = marker('oldName', pos.lat, pos.lng);//the new position of the business
    
    assert.deepEqual(App.updateBusiness(newPosMarker, "newName"),{
                    map: 'map',
                    animation: 'google.maps.Animation.DROP',
                    draggable: false,
                    position: {lat: pos.lat, lng: pos.lng},
                    label: 'newName',
                    title: 'newName',
                    clickable: true
               },'Updated a business position and name');
    
});

QUnit.test('deleteBusiness', function (assert) {
    
    var areaPos = expectedArea(5);
    var areaPos1 = jQuery.extend(true,[], areaPos);
    
    assert.notDeepEqual(App.deleteBusiness(areaPos1, 3), {
                    paths: areaPos,
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 3,
                    fillColor: '#F0AD4E',
                    fillOpacity: 0.45,
                    indexID: 1
                }, 'The object has Changed');
    
    var deletePos3 = jQuery.extend(true,[], areaPos);
    deletePos3.splice(2, 1);

    assert.deepEqual(App.deleteBusiness(areaPos, 3), {
                    paths: deletePos3,
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 3,
                    fillColor: '#F0AD4E',
                    fillOpacity: 0.45,
                    indexID: 1
                }, 'Deleted polygon node in position 3, and recreated entire polygon because of google maps drawing conditions');

});

QUnit.test('deleteAll', function(assert){
   
    var entireMap = createPolygons();
    
    assert.ok(App.deleteAll(entireMap),'Everything was deleted')
});