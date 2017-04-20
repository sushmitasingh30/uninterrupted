
<script>
var express     =    require('express'),
    multer      =    require('multer'),
    app         =    express(),
    exec        =    require('child_process').exec,
    fs          =    require('fs');

app.get('/',function(req,res){
      res.sendfile("test.html");
});

app.post('/wc',[
  multer({ dest: '/tmp/uploads/' }),
  function(req, res){
    child = exec("wc " + req.files.textfile.path +
                 "| awk {'print \"#lines: \"$1\" | #words: \"$2\" | #bytes: \"$3'}",
                 function(err, stdout) {
                   res.writeHead(200, {"Content-Type": "text/plain"});
                   res.end(stdout.trim() + " | " + req.files.textfile.originalname);
                   fs.unlink(req.files.textfile.path);
            });
}]);
</script>