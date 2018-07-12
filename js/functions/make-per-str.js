// input要素作成
export default function makePerStr(type, num){
  num = String(num);
  var str = "<div class='per-" + type + "-" + num + "'>"
    + "<div class='row'>"
    + "<div class='form-group col-md-5'>"
    + "<input type='text' class='form-control' id='" + type + "-" + num + "-key" + "' placeholder='key'>"
    + "</div>"
    + "<div class='form-group col-md-5'>"
    + "<input type='text' class='form-control' id='" + type + "-" + num + "-value" + "' placeholder='value'>"
    + "</div>"
    + "</div>"
    + "</div>";
  return str;
}


