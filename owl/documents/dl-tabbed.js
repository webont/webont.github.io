 /** Tabbed Definition List 
  *
  * Convert HTML definition lists in tabs.
  *
  * 2006 Stefan Born - http://home.arcor.de/xbo/trifles/dl-tabbed.html
  *
  * Free for use, no warranty given.
  *
  */
 
// Hide dd only in DOM-capable browsers.
if (document.getElementsByTagName)
  document.write("<style type='text/css'>dl.tabbed dd {display: none;}</style>");

var tabbedDL = {
 item : 0, // define the first displayed definition description
 position : "top", // tab position 'top' or 'bottom'
 event : "onclick", // onclick or onmouseover
 setup : function(){
  if (!document.getElementsByTagName) return;
  var el = document.getElementsByTagName("DL");
  for (var i = 0; i < el.length; i++) {
   if (el[i].className.indexOf("tabbed") == -1) continue;
   tabbedDL.makeLinks(el[i]);
   // show  'item' on load
   var getDT = el[i].getElementsByTagName("DT")[tabbedDL.item];
   getDT.innerHTML = getDT.getElementsByTagName("A")[0].innerHTML;
   getDT.className = "dltab-active";
   // create and fill content div
   var div = document.createElement("div");
   div.innerHTML = el[i].getElementsByTagName("DD")[tabbedDL.item].innerHTML;
   if (tabbedDL.position == "bottom") el[i].insertBefore(div, el[i].firstChild);
   else el[i].appendChild(div);		
   }	
 },
 makeLinks : function(dl){
  el = dl.getElementsByTagName("DT");
  for (var i = 0; i < el.length; i++) {
   if (!el[i].getElementsByTagName("A")[0]){
    el[i].innerHTML = "<a " + tabbedDL.event +
		           "='tabbedDL.showDD(this);' href='javascript:;'>"
			   + el[i].innerHTML + "</a>";
    el[i].className = "";
    }
   }
 },
 showDD : function(a){
  dt = a.parentNode; dl = dt.parentNode; dd = dt.nextSibling;
  if (dd.nodeType != 1) dd = dd.nextSibling;
  if (tabbedDL.position == "bottom") dl.firstChild.innerHTML = dd.innerHTML;
  else dl.lastChild.innerHTML = dd.innerHTML;
  tabbedDL.makeLinks(dl);
  dt.innerHTML = a.innerHTML;
  dt.className = "dltab-active";
 }
}
 /* End Tabbed Definition List */

//Onload Handling
var oldonload=window.onload;if(typeof window.onload!='function'){
window.onload=tabbedDL.setup;
}else{window.onload=function(){oldonload();
tabbedDL.setup();}}

  /* setup faster by deleting these lines and adding
         <script type="text/javascript">tabbedDL.setup();</script>
         before the closing body tag in your HTML */
