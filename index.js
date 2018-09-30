var Service, Characteristic;

module.exports = function (homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;
    homebridge.registerAccessory('homebridge-demo-light', 'DemoLight', Light);
};

function Light(log, config) {
    this.log = log;
    this.switch = {
        powerOn: {},
        powerOff: {}
    };
    this.name = config.name;
    this.Brightness = 50;
}
Light.prototype.getServices = function () {
    var plugin = this;
    plugin.log('creating Switch');
    var lightService = new Service.Lightbulb(plugin.name);
    lightService.getCharacteristic(Characteristic.On)
        .on('set', function (value, callback) {
            plugin.log("Switch -> " + value);
            callback();
        });
    lightService.addCharacteristic(Characteristic.Brightness)
        .on('set', function(value, callback) {
          plugin.log("Brightness -> "+value);
          callback();
        })
        .on('get', function(callback) {
          callback(null, plugin.Brightness);
        });
    return [lightService];
}