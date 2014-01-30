self.addEventListener('message', function(e) {
  var data = e.data;
  if (!data) return;
  var result = {};
  try {
      Module.FS_createDataFile("/", data.basename + "_init.xml", data.xmlstring, true, true)
      shouldRunNow = true;
      Module.run();
      result.csv = intArrayToString(FS.findObject(data.basename + "_res.csv").contents);
      result.status = "Simulation finished";
      FS.unlink("/" + data.basename + "_init.xml");    // delete the input file
  } catch(err) {
      result.status = "Simulation failed";
  };
  self.postMessage(result);
}, false);
