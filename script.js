/**
 *@author Mahmoud Bekheet
 *@description this script is being run after build to create modified appdeliigate files in the xcode  project
*/

module.exports = function (ctx) {

    var fs = ctx.requireCordovaModule('fs');
    var path = ctx.requireCordovaModule('path');
    var rootdir = "";

    //get the project name

    var myfs = require('fs');

    var getValue = function (config, name) {
        var value = config.match(new RegExp('<' + name + '>(.*?)</' + name + '>', "i"))
        if (value && value[1]) {
            return value[1]
        } else {
            return null
        }
    }

    function directoryExists(path) {
        try {
            return myfs.statSync(path).isDirectory();
        }
        catch (e) {
            return false;
        }
    }

    var config = myfs.readFileSync("config.xml").toString()
    var name = getValue(config, "name")

    if ((directoryExists("platforms/ios"))) {

        try {
            if (ctx.opts.platforms.indexOf('ios') >= 0) {
                var srcFile_h = "platforms/ios/" + name + "/Plugins/cordova-apple-wallet/AppDelegateh.text";
                var destFile_h = path.join(rootdir, "platforms/ios/" + name + "/Classes/AppDelegate.h");

                setTimeout(function () {
                    console.log("copying delegate file h " + srcFile_h + " to " + destFile_h);
                    fs.createReadStream(srcFile_h).pipe(fs.createWriteStream(destFile_h));
                }, 0);
                var srcFile_m = "platforms/ios/" + name + "/Plugins/cordova-apple-wallet/AppDelegatem.text";
                var destFile_m = path.join(rootdir, "platforms/ios/" + name + "/Classes/AppDelegate.m");

                setTimeout(function () {
                    console.log("copying delegate file h " + srcFile_m + " to " + destFile_m);
                    fs.createReadStream(srcFile_m).pipe(fs.createWriteStream(destFile_m));
                }, 0);
            }
        } catch (e) {
            console.log(e);
        }

    } else throw new Error("the Apple Wallet plugin can not find the Directory" + destFile_h)

};
